import { useState, useEffect } from 'react'
import FsInfoApp from './components/userFileSystemInfo/FsInfoApp.js'
import OsInfoApp from './components/userOsInfo/OsInfoApp.js'
import ToggleOsInfoAppButton from './components/toggleOsInfoAppButton.js'
import NavButton from './components/navButton.js'
import './App.css'

export default function App() {
    const [userFsInfo, setUserFsInfo] = useState([])
    const [userOsInfo, setUserOsInfo] = useState([])
    const [osDisplay, setOsDisplay] = useState(true)
    const [currentPath, setCurrentPath] = useState('')
    const [canNavigateBack, setCanNavigateBack] = useState(true)
    const [pathsVisited, setPathsVisited] = useState([''])

    const userURI = 'http://127.0.0.1:3000/'

    const toggleOsDisplay = ()=> setOsDisplay(!osDisplay)

    function navigateBack(){
        if(!canNavigateBack) return alert('Maximum backward navigation reached!')

        const currentPathPosition = pathsVisited.indexOf(currentPath)
        const targetPath = pathsVisited[currentPathPosition - 1]
        if(currentPath === 'C:\\Users') return
        
        fetch(
            userURI,
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ nextPath: targetPath, direction: 'back' })
            }
        )
        .then(res => res.json())
        .then(
            data => {
                //update UI
                setUserOsInfo(data.userOsInfo)
                setUserFsInfo(data.currentPathFiles)
                //
                setCurrentPath(data.currentPath)
                setCanNavigateBack(data.canNavigateBack)
                setPathsVisited([...pathsVisited, data.currentPath])
            }
        )
        .catch(err => console.warn(err.message))
    }

    function navigateForward(){
        if(!pathsVisited) return alert("No URLs in User's History to navigate to!")
        
        const currentPathPosition = pathsVisited.indexOf(currentPath)
        const targetPathPosition = currentPathPosition + 1

        if( targetPathPosition >= pathsVisited.length){
            return alert("You've reached the maximum nuber of forward navitagions!")
        }
        const targetPath = pathsVisited[targetPathPosition]

        fetch(
            userURI,
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ nextPath: targetPath, direction: 'forward' })
            }
        )
        .then(res => res.json())
        .then(
            data => {
                //update UI
                setUserOsInfo(data.userOsInfo)
                setUserFsInfo(data.currentPathFiles)
                //
                setCurrentPath(data.currentPath)
                setCanNavigateBack(data.canNavigateBack)
                setPathsVisited([...pathsVisited, data.currentPath])
            }
        )
        .catch(err => console.warn(err.message))
    }

    function openDirectory(fileType, fileName){
        
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
            .then(
                res => {
                    if(res.status === 200){
                        return res.json()
                    }
                    throw Error(res.status)
                }
            )
            .then(
                data => {
                    setUserOsInfo(data.userOsInfo)
                    setUserFsInfo(data.currentPathFiles)
                    setCanNavigateBack(true)
                    setCurrentPath(data.currentPath)
                    setPathsVisited([...pathsVisited, data.currentPath])
                }
            )
            .catch(err => console.warn(err.message))
        }
    }

    useEffect(
        ()=> {
            fetch(userURI)
            .then(res => res.json())
            .then(
                data => {
                    setUserOsInfo(data.userOsInfo)
                    setUserFsInfo(data.currentPathFiles)
                    setCurrentPath(data.currentPath)
                    setPathsVisited([data.currentPath])
                    setCanNavigateBack(false)
                }
            )
            .catch(err => console.warn(err.message))
        }
        ,[]
    )

    return (
        <div className='flex-column items-center'>
            <OsInfoApp osDisplay={osDisplay} userOsInfo={userOsInfo}/>
            <div id='navButtonsContainer' className='w-4/5 mx-auto flex'>
                <NavButton direction={'back'} navigate={navigateBack} className={'border-l-8 pr-4 pl-1'} title='go back'/>
                    <ToggleOsInfoAppButton toggleOsDisplay={toggleOsDisplay}/>            
                <NavButton direction={'forward'} navigate={navigateForward} className={'border-r-8 pl-4 pr-1'} title='go forward'/>
            </div>
            <FsInfoApp userFsInfo={userFsInfo} openDirectory={openDirectory}/>
        </div>
    )
}
