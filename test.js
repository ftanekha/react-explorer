const fetch = require('node-fetch');

const userURI = 'http://127.0.0.1:3000/'

fetch(userURI, {mode: "no-cors"})
.then(data => data.json())
.then(data => {
    const obj = Object.assign({}, data)

    for(let i in obj) console.log(i)
})
.catch(err => console.error(err.code))

