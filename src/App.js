import { useState, useEffect } from 'react'
import FsInfoApp from './components/userFileSystemInfo/FsInfoApp.js'
import OsInfoApp from './components/userOsInfo/OsInfoApp.js'
import './app.css'

function App() {
    const [userFsInfo, setUserFsInfo] = useState([])
    const [userOsInfo, setUserOsInfo] = useState([])
    const [osDisplay, setOsDisplay] = useState(false)
    const [buttonDisplay, setButtonDisplay] = useState(0)

    const userURI = 'http://127.0.0.1:3000/'

    const toggleOsDisplay = ()=> setOsDisplay(!osDisplay)
    const openDirectory = (fileType, fileName )=> {
        if(
            fileType === 'directory'
            &&//not a system folder
            fileName === fileName.toLowerCase()
            &&//not a hidden folder
            fileName.charAt(0) !== '.'
        ){
            fetch(
                userURI,
                {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ nextPath: fileName })
                }
            )
            .then(userData => userData.json())
            .then(userData => setUserFsInfo(userData[1]))
            .catch(err => console.warn(`${err.code}: ${err.message}`))
        }
    }

    useEffect(
        ()=> {
            fetch(userURI)
            .then(userData => userData.json())
            .then(userData => {
                setUserOsInfo(Object.entries(userData[0]))
                setUserFsInfo(userData[1])
            })
            .catch(err => console.warn(`${err.code}: ${err.message}`))
        }
        ,[userOsInfo, userFsInfo]
    )

    useEffect(()=> setOsDisplay(!osDisplay), [])
    useEffect(()=> setButtonDisplay(1), [])

    return (
        <div className='App' style={{position: 'relative'}}>
            <OsInfoApp osDisplay={osDisplay} userOsInfo={userOsInfo}/>
            <div id='toggleFsInfoAppButton' style={{opacity: buttonDisplay}}
                className='rollingButton bg-slate-800 rounded-full border-8 border-gray-400 text-gray-300 font-medium text-center pt-1'
                onClick={toggleOsDisplay} title='Toggle filesystem display'
            >FS</div>
            <FsInfoApp userFsInfo={userFsInfo} openDirectory={openDirectory}/>
        </div>
    )
}

export default App
