const Table = ({ headers, data, renderRow, emptyMessage, idKey = "id", loading }) => 
{
    const thStyling = "border border-gray-200 p-3"
    const tdStyling = "border border-gray-200 p-3"

    return (
        <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm max-h-[60vh]">
            <table className="table table-pin-rows w-full">
                <thead className="text-sm uppercase">
                    <tr>
                        {
                            headers?.map((header, idx) => 
                                <th key={idx} className={`${thStyling} ${header.center ? "text-center" : "text-left"}`} colSpan={header.colSpan || 1}>{header.label}</th>
                            )
                        }
                    </tr>
                </thead>
                <tbody>
                {
                    loading
                    ?
                        <tr>
                            <td className={`${tdStyling} text-center py-6`} colSpan={headers.length}>
                                <span className="loading loading-spinner loading-xl text-primary"></span>
                            </td>
                        </tr>
                    :
                        data?.length === 0 
                        ? 
                            <tr>
                                <td className={`${tdStyling} text-center font-semibold`} colSpan={headers.length}>
                                    {typeof emptyMessage === 'string' ? emptyMessage : <div>{emptyMessage}</div>}
                                </td>
                            </tr> 
                        : 
                            data?.map((row, idx) =>
                                <tr key={row[idKey] || idx} className="hover:bg-gray-200">
                                    {renderRow(row, idx, tdStyling)}
                                </tr>
                            )
                }
                </tbody>
            </table>
        </div>
    )
}

export default Table