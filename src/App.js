import { useState, useEffect } from 'react'
import FsInfoApp from './components/userFileSystemInfo/FsInfoApp.js'
import OsInfoApp from './components/userOsInfo/OsInfoApp.js'
import ToggleOsInfoAppButton from './components/toggleOsInfoAppButton.js'
import NavButton from './components/navButton.js'
import './app.css'

export default function App() {
    const [userFsInfo, setUserFsInfo] = useState([])
    const [userOsInfo, setUserOsInfo] = useState([])
    const [osDisplay, setOsDisplay] = useState(true)
    const [buttonDisplay, setButtonDisplay] = useState(1)
    // const [prePathArray, setPrePathArray] = useState([])

    const userURI = 'http://127.0.0.1:3000/'

    const toggleOsDisplay = ()=> setOsDisplay(!osDisplay)
    const navigateBack = ()=> {
        fetch(
            userURI,
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ nextPath: '..' })
            }
        )
        .then(
            res => { 
                if(res.ok) console.log('navigated back')
            }
        )
        .catch(err => console.warn(`${err.code}: ${err.message}`))
    }
    const navigateForward = ()=> console.log('hi')
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

    useEffect(()=> setButtonDisplay(1), [])

    return (
        <div className='App' style={{position: 'relative'}}>
            <OsInfoApp osDisplay={osDisplay} userOsInfo={userOsInfo}/>
            <div id='navButtonsContainer' className='mx-auto flex'>
                <NavButton direction={'back'} navigate={navigateBack} className={'border-l-4 rounded-l-md pr-4 pl-1'} title='go back'/>
                    <ToggleOsInfoAppButton buttonDisplay={buttonDisplay} toggleOsDisplay={toggleOsDisplay}/>            
                <NavButton direction={'forward'} navigate={navigateForward} className={'border-r-4 rounded-r-md pl-4 pr-1'} title='go forward'/>
            </div>
            <FsInfoApp userFsInfo={userFsInfo} openDirectory={openDirectory}/>
        </div>
    )
}

