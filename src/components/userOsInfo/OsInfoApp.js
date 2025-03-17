export default function OsInfoApp ({osDisplay, userOsInfo}){
    return (
        <div className={`osInfoApp w-1/4 pt-4 mx-auto text-gray-300 ${osDisplay ? 'block' : 'hidden'}`}>
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
                            entry => {
                                return (
                                    <tr key={entry[0]} className='text-center'>
                                        <td key={entry[0]} className='p-2 uppercase text-gray-600 text-md font-semibold'>{entry[0]}</td>
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
