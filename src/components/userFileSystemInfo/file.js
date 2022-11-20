import React from 'react'

function File ({title, type}){
    let src = ''
    //distinguish btwn regular files and folders
    if(type  === 'directory') {
        src = `https://cdn.icon-icons.com/icons2/1379/PNG/512/folderblack_93099.png`
    }else{
        src = `https://cdn1.iconfinder.com/data/icons/file-types-29/1792/file-512.png`
    }

    return  <img className={`${type} m-2 w-10 h-10 `} src={src} alt={title}/>
}

export default File