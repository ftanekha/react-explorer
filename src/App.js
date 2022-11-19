import FsInfoApp from './components/userFileSystemInfo/FsInfoApp.js'
import OsInfoApp from './components/userOsInfo/OsInfoApp.js'

function App() {
    return (
        <div className='App'>
            <OsInfoApp />
            <FsInfoApp />
        </div>
    )
}

export default App
