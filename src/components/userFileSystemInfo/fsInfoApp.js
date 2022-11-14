import React, {useState, useEffect} from 'react'
import File from './file.js'
const fetch = require('node-fetch')
const userURI = 'http://127.0.0.1:3000/'


function App(){
    const [userFsInfo, setUserFsInfo] = useState([])

    useEffect(
        ()=> 
        {
            fetch(userURI)
            .then(userFsData => userFsData.json())
            .then(
                userFsData => setUserFsInfo(userFsData),
                err => console.warn(`${err.code}: ${err.message}`)
            )
        }, []
    )

    return (
        <div>
            {
                userFsInfo.map(
                    (file , index)=> {
                        return (
                            <div key={`${file.title}_container`} className='icon_container'>
                                <File key={file.title} title={file.title} extName={file.extName}/> <br/>
                                <span key={`entry ${index}`}>{file.title}</span>
                            </div>
                        )
                    }
                )
            }
        </div>
    )
}

export default App