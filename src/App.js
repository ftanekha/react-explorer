import { useState, useEffect } from 'react'
import FsInfoApp from './components/userFileSystemInfo/FsInfoApp.js'
import OsInfoApp from './components/userOsInfo/OsInfoApp.js'
import './app.css'

function App() {
    const [osDisplay, setOsDisplay] = useState(true)
    const [buttonDisplay, setButtonDisplay] = useState(0)

    const toggleOsDisplay = ()=> setOsDisplay(!osDisplay)
    
    useEffect(
        ()=>
        {
            const toggleDisplay = setTimeout
            (
                ()=> setOsDisplay(!osDisplay),
                3e4
            )

            return ()=> clearTimeout(toggleDisplay)
            // eslint-disable-next-line react-hooks/exhaustive-deps
        },[]
    )
    useEffect(
        ()=>{
            const toggleButtonDisplay = setTimeout
            (
                ()=> setButtonDisplay(1),
                3e4
            )

            return ()=> clearTimeout(toggleButtonDisplay)
            // eslint-disable-next-line react-hooks/exhaustive-deps
        },[]
    )

    return (
        <div className='App' style={{position: 'relative'}}>
            <OsInfoApp osDisplay={osDisplay}/>
            <div id='toggleFsInfoAppButton' style={{opacity: buttonDisplay}}
                className='rollingButton bg-slate-800 rounded-full border-8 border-gray-400 text-gray-300 font-medium text-center pt-1'
                onClick={toggleOsDisplay}
            >FS</div>
            <FsInfoApp />
        </div>
    )
}

export default App
