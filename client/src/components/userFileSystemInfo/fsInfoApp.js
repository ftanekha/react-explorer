import File from './file.js'

export default function App({userFsInfo, openDirectory}){
    return (
        <div className='fsInfoApp m-10 text-xs'>
            {
                userFsInfo.map(
                    ({title, type} , index)=> {
                        return (
                            <div key={`${title}_container`} className={`icon_container flex flex-row flex-wrap pl-2 ${index === 0 ? 'pt-12' : 'pt-4'} bg-zinc-700`}>
                                <div key={`${title}_icon_container`}>
                                    <File key={title} title={title} type={type}/> <br/>
                                </div>
                                <div key={`${title}_title_container`} className='py-4'>
                                    <span key={`entry_${index}`} onClick={()=> openDirectory(type, title)}
                                        className={
                                            `file_title font-medium 
                                            ${
                                                type === 'directory' 
                                                && 
                                                (
                                                    title.charAt(0) !== '.' 
                                                    || 
                                                    title.charAt(0) === title.charAt(0).toLowerCase()
                                                )
                                                ? 'text-gray-500' : 'text-gray-950'} 
                                            ${
                                                type === 'directory'
                                                && title.charAt(0) !== '.' 
                                                && title.charAt(0) === title.charAt(0).toLowerCase()
                                                ? 'text-slate-300 hover:underline cursor-pointer' : 'cursor-none'
                                            }`
                                            .trim()
                                        }
                                    >
                                        {title}
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
