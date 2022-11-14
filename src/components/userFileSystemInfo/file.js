import React from 'react'
import './file.css'

function File ({title, extName}){
    let type = ''
    let src = ''

    if(extName  === '') {
        //distinguish btwn regular files and folders
        type = 'directory'
        src = `https://cdn.icon-icons.com/icons2/1379/PNG/512/folderblack_93099.png`
    }else{
        type = 'file'
        src = `https://cdn1.iconfinder.com/data/icons/file-types-29/1792/file-512.png`
    }

    return  <img className={type} src={src} alt={title} />
}

export default File