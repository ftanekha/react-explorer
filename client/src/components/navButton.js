export default function NavButton({direction, navigate, className, title}){
    return <button className={`h-8 w-full bg-zinc-800 text-sm text-slate-400 font-semibold border-solid border-zinc-800 cursor-pointer hover:text-md hover:text-slate-100 ${className}`} title={title} onClick={navigate}>{direction}</button>
}