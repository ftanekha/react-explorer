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
                            <div key={`${file.title}_container`} className='icon_container flex flex-row' style={{width: '50%', backgroundColor: 'dimgrey', margin: 'auto'}}>
                                <div key={`${file.title}_icon_container`}>
                                    <File key={file.title} title={file.title} extName={file.extName}/> <br/>
                                </div>
                                <div key={`${file.title}_title_container`} style={{ paddingTop: '15px'}}>
                                    <span key={`entry ${index}`} className='file_title font-bold'>{file.title}</span>
                                </div>
                            </div>
                        )
                    }
                )
            }
        </div>
    )
}

export default App