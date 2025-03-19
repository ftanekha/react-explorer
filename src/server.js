const express = require('express')
const cors = require('cors')
const os = require('node:os')
const fs = require('node:fs')
const path = require('path')
const bodyParser = require('body-parser')

const getUserOsInfo = require('./components/userOsInfo/osInfo.js')
const homeDir = os.homedir()

const port = 8080

const app = express()
const jsonParser = bodyParser.json()

let currentPath = homeDir

app.use(cors())

app.get(
    '/',
    (req, res)=>{
        fs.readdir(
            currentPath, {withFileTypes: true},
            (err, files)=>{
                if(err) return console.error(err.message)

                const currentPathFiles = []
                files.forEach(
                    file => currentPathFiles.push(
                        {
                            title: file.name,
                            type: file.isDirectory() ? 'directory' : 'file'
                        }
                    )
                )

                res.send(
                    {
                        userOsInfo: Object.entries(getUserOsInfo(currentPath)), 
                        currentPathFiles,
                        canNavigateBack: currentPath === 'C:\\' ? false : true, 
                        currentPath
                    }
                )
            }
        )
    }
)

app.post(
    '/', 
    jsonParser,
    (req, res) => {
        const {nextPath, direction} = req.body
        if(direction === 'back'){
            currentPath = nextPath

            fs.readdir(
                currentPath, {withFileTypes: true},
                (err, files)=>{
                    if(err) return console.error(err.message)
    
                    const currentPathFiles = []
                    files.forEach(
                        file => currentPathFiles.push(
                            {
                                title: file.name,
                                type: file.isDirectory() ? 'directory' : 'file'
                            }
                        )
                    )
                    
                    res.send(
                        {
                            userOsInfo: Object.entries(getUserOsInfo(currentPath)), 
                            currentPathFiles,
                            canNavigateBack: currentPath === 'C:\\' ? false : true, 
                            currentPath
                        }
                    )
                }
            )
        }else if(direction === 'forward'){
            currentPath = nextPath

            fs.readdir(
                nextPath, {withFileTypes: true},
                (err, files)=>{
                    if(err) return console.error(err.message)
    
                    const currentPathFiles = []
                    files.forEach(
                        file => currentPathFiles.push(
                            {
                                title: file.name,
                                type: file.isDirectory() ? 'directory' : 'file'
                            }
                        )
                    )

                    res.send(
                        {
                            userOsInfo: Object.entries(getUserOsInfo(currentPath)), 
                            currentPathFiles,
                            canNavigateBack: currentPath === 'C:\\' ? false : true, 
                            currentPath
                        }
                    )
                }
            )
        }else{
            currentPath = path.join(currentPath, nextPath)
            fs.readdir(
                currentPath, {withFileTypes: true},
                (err, files)=>{
                    if(err) return console.error(err.message)
    
                    const currentPathFiles = []
                    files.forEach(
                        file => currentPathFiles.push(
                            {
                                title: file.name,
                                type: file.isDirectory() ? 'directory' : 'file'
                            }
                        )
                    )
    
                    res.send(
                        {
                            userOsInfo: Object.entries(getUserOsInfo(currentPath)), 
                            currentPathFiles,
                            canNavigateBack: currentPath === 'C:\\' ? false : true, 
                            currentPath
                        }
                    )
                }
            )
        }
    }
)

app.listen(
    port, 
    ()=> console.log(`Express app listening on port ${port}`)
)