const express = require('express')
const cors = require('cors')
const os = require('node:os')
const {readdir} = require('node:fs')
const path = require('node:path')

const homeDir = os.homedir()

const pathName = '/'
const port = process.env.PORT || 3000

const app = express()
app.use(cors())

app.get(
    pathName,
    (req, res)=>
    {

        readdir(
            homeDir,
            (err, files)=> 
            {
                if(err) return console.error(`${err.code}: ${err.message}`)

                const homeDirFiles = []
                files.forEach(
                    file => homeDirFiles.push(
                        {
                            title: file,
                            type: file.isDirectory()? 'directory': 'file'
                        }
                    )
                )

                res.send(homeDirFiles)
            }
        )
    }
)

app.listen(
    port, 
    () => console.log(`Express app listening on port ${port}`)
)