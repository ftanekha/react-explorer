const express = require('express')
const cors = require('cors')
const os = require('node:os')
const fs = require('node:fs')
const path = require('path')
const bodyParser = require('body-parser')

const getUserOsInfo = require('./components/userOsInfo/osInfo.js')
const homeDir = os.homedir()

const port = process.env.PORT || 8080

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
                if(err) return console.error(`${err.code}: ${err.message}`)

                const currentPathFiles = []
                files.forEach(
                    file => currentPathFiles.push(
                        {
                            title: file.name,
                            type: file.isDirectory() ? 'directory' : 'file'
                        }
                    )
                )

                res.send([getUserOsInfo(currentPath), currentPathFiles])
            }
        )
    }
)

app.post(
    '/', 
    jsonParser,
    (req, res) => {
        if(!req.body) return res.send('no request body received')
        
        const {nextPath} = req.body
        currentPath = path.join(currentPath, nextPath)
        //handle backward navigation
        if(nextPath === '..'){
            const indexOfLastSlash = currentPath.lastIndexOf('/')
            const prevPath = currentPath.slice(0, indexOfLastSlash)
            //handle maximum backward navigation
            if(currentPath === 'C:\\'){
                return res.status(400).send({
                    message: 'Maximum backward navigation reached!'
                })
            }//

            fs.readdir(
                prevPath, {withFileTypes: true},
                (err, files)=>{
                    if(err) return console.error(`${err.code}: ${err.message}`)
    
                    const currentPathFiles = []
                    files.forEach(
                        file => currentPathFiles.push(
                            {
                                title: file.name,
                                type: file.isDirectory() ? 'directory' : 'file'
                            }
                        )
                    )
    
                    res.send([getUserOsInfo(currentPath), currentPathFiles])
                }
            )//
        }else{
            fs.readdir(
                currentPath, {withFileTypes: true},
                (err, files)=>{
                    if(err) return console.error(`${err.code}: ${err.message}`)
    
                    const currentPathFiles = []
                    files.forEach(
                        file => currentPathFiles.push(
                            {
                                title: file.name,
                                type: file.isDirectory() ? 'directory' : 'file'
                            }
                        )
                    )
    
                    res.send([getUserOsInfo(currentPath), currentPathFiles])
                }
            )
        }
    }
)

app.listen(
    port, 
    ()=> console.log(`Express app listening on port ${port}`)
)