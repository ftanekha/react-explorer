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
            .then(userData => userData.json())
            .then(
                userData => setUserFsInfo(userData[1]),
                err => console.warn(`${err.code}: ${err.message}`)
            )
        }, []
    )

    return (
        <div className='m-10 bg-gray-300 border-l-4 border-l-gray-500 border-t-2 border-t-gray-300 border-r-4 border-r-gray-300'>
            {
                userFsInfo.map(
                    (file , index)=> {
                        return (
                            <div key={`${file.title}_container`} className='icon_container flex flex-row pl-1 pt-1'>
                                <div key={`${file.title}_icon_container`}>
                                    <File key={file.title} title={file.title} type={file.type}/> <br/>
                                </div>
                                <div key={`${file.title}_title_container`} className='pt-4'>
                                    <span key={`entry_${index}`} className='file_title font-bold text-gray-800 hover:underline'>{file.title}</span>
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