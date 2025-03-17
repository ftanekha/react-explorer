export default function NavButton({direction, navigate, className}){
    return <button className={`h-8 text-slate-300 font-semibold border-solid border-slate-500 cursor-pointer hover:text-lg hover:text-slate-100 ${className}`} onClick={navigate}>{direction}</button>
}