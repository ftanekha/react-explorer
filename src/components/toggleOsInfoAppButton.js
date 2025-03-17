export default function ToggleOsInfoAppButton ({buttonDisplay, toggleOsDisplay}){
    return (
        <div id='toggleOsInfoAppButton' style={{opacity: buttonDisplay}}
            className='rollingButton bg-slate-800 rounded-full border-8 border-gray-400 pt-1 text-gray-300 text-center  
                font-medium  hover:bg-slate-700 hover:text-slate-900 transition duration-500 cursor-pointer'
            onClick={()=> toggleOsDisplay()} title='Toggle filesystem display'
        >FS</div>
    )
}