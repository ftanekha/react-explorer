import React, { useEffect, useState } from 'react'
import './osInfoApp.css'

const fetch = require('node-fetch');
const userURI = 'http://127.0.0.1:3000/'


const OsInfoApp = ({osDisplay}) => {
    const [userOsInfo, setUserOsInfo] = useState([])
    // get userOsInfo on first render
    useEffect(
        ()=> {
            fetch(userURI)
            .then(userData => userData.json())
            .then(
                userData => setUserOsInfo(Object.entries(userData[0])),
                err => console.warn(`${err.code}: ${err.message}`)
            )
        }
        ,[]
    )


    return (
        <div className={`osInfoApp w-1/4 mt-10 mx-auto text-gray-300 ${osDisplay? 'block': 'hidden'}`}>
            <table className='table-auto'>
                <thead>
                    <tr className='text-center'>
                        <th className='text-xl pb-6' colSpan={2}>Operation System Information</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userOsInfo.map
                        (
                            entry => 
                            {
                                return (
                                    <tr key={entry[0]} className='text-center'>
                                        <td key={entry[0]} className='p-2 uppercase text-gray-500 font-bold'>{entry[0]}</td>
                                        <td key={`${entry[0]}_value`}>{entry[1]}</td>
                                    </tr>
                                )
                            }
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default OsInfoApp