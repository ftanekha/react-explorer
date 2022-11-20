const {readdir} = require('node:fs')
const {homedir} = require('node:os')

// readdir(
//     homedir(), {withFileTypes: true},
//     (err, data)=>
//     {
//         if(err) return console.error('fuuuuuck!')
//         data.forEach(
//             entry => {
//                 if(entry.isDirectory()) console.log(entry.name, 'directory')
//                 console.log(entry.name, 'file')
//             }
//         )
//     }
// )

readdir(
    homedir(), {withFileTypes: true},
    (err, files)=> 
    {
        if(err) return console.error(`${err.code}: ${err.message}`)

        const homeDirFiles = []
        files.forEach(
            file => console.log(
             file.isDirectory()? 1: 0
            )
        )

        console.log()
    }
)