import React from 'react'

function File ({title, extName}){
    let type = ''
    let src = ''
    //distinguish btwn regular files and folders
    if(extName  === '') {
        type = 'directory'
        src = `https://cdn.icon-icons.com/icons2/1379/PNG/512/folderblack_93099.png`
    }else if(title.charAt(0) === '.'){
        //not working for some reason??
        type = 'file'
        src = `https://cdn1.iconfinder.com/data/icons/file-types-29/1792/file-512.png`
    }else{
        type = 'file'
        src = `https://cdn1.iconfinder.com/data/icons/file-types-29/1792/file-512.png`
    }

    return  <img className={`${type} m-2 w-10 h-10 `} src={src} alt={title}/>
}

export default File