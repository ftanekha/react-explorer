export default function File ({title, type}){
    let src = ''
    //handle files and folders
    if(type  === 'directory') {
        src = './directory.png'
    }else{
        src = '/file.png'
    }

    return  <img className={`${type} m-2 w-10 h-10`} src={src} alt={title}/>
}
