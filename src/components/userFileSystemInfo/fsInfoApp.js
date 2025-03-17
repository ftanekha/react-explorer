import File from './file.js'

export default function App({userFsInfo, openDirectory}){
    return (
        <div className='m-10 transition duration-3000 delay-3000'>
            {
                userFsInfo.map(
                    ({title, type} , index)=> {
                        return (
                            <div key={`${title}_container`} className='icon_container flex flex-row pl-2 pt-4 bg-gray-600 rounded-l-2xl'>
                                <div key={`${title}_icon_container`}>
                                    <File key={title} title={title} type={type}/> <br/>
                                </div>
                                <div key={`${title}_title_container`} className='pt-4'>
                                    <span key={`entry_${index}`} onClick={()=> openDirectory(type, title)}
                                        className={`file_title font-medium ${type === 'directory' ? 'text-slate-300 hover:underline' : 'text-gray-950'}`}>{title}
                                    </span>
                                </div>
                            </div>
                        )
                    }
                )
            }
        </div>
    )
}
