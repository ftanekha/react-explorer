const express = require('express')
const cors = require('cors')
const userOsInfo = require('./osInfo.js')

const path = '/'
const port = process.env.PORT || 3000

const app = express()
app.use(cors())

app.get(
    path,
    (req, res)=>
    {
        res.send(
            userOsInfo()
        )
    }
)

app.listen(
    port, 
    () => console.log(`Express app listening on port ${port}`)
)