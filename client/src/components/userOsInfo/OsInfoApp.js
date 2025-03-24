export default function OsInfoApp ({osDisplay, userOsInfo}){
    return (
        <div className={`osInfoApp w-full md:w-1/4 pt-4 mx-auto text-gray-300 justify-center flex ${osDisplay ? 'os-in-view' : 'os-hidden'}`}>
            <table className='table-auto'>
                <thead>
                    <tr className='text-center'>
                        <th className={`text-gray-600 text-xs md:text-base pb-6`} colSpan={2}>Operation System Information</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userOsInfo.map
                        (
                            (entry, index)=> {
                                return (
                                    <tr key={entry[0]} className='text-center text-xs md:text-base'>
                                        <td key={entry[0]} className='p-2 uppercase text-gray-600 font-semibold'>{entry[0]}</td>
                                        <td key={`${entry[0]}_value`} className={index === userOsInfo.length - 1 ? 'text-gray-600 text-sm0' : 'text-xs md:text-base'}>{entry[1]}</td>
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
