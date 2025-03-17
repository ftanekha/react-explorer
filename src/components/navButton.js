export default function NavButton({direction, navigate, className, title}){
    return <button className={`h-6 text-sm text-slate-300 font-semibold border-solid border-slate-500 cursor-pointer hover:text-lg hover:text-slate-100 ${className}`} title={title} onClick={navigate}>{direction}</button>
}