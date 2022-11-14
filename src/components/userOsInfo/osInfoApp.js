import React, { useEffect, useState } from 'react'

const fetch = require('node-fetch');
const userURI = 'http://127.0.0.1:3000/'


const OsInfoApp = () => {
    const [userOsInfo, setUserOsInfo] = useState([])
    //get userOsInfo on first render
    useEffect(
        ()=> {
            fetch(userURI)
            .then(userOsData => userOsData.json())
            .then(
                userOsData => setUserOsInfo(Object.entries(userOsData)),
                err => console.warn(`${err.code}: ${err.message}`)
            )
        }
        ,[]
    )

    return (
        <div>
            <table className='table-auto'>
                <thead>
                    <tr>
                        <th>Operation System Information</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userOsInfo.map
                        (
                            entry => 
                            {
                                return (
                                    <tr key={entry[0]}>
                                        <td key={entry[0]}>{entry[0]}</td>
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