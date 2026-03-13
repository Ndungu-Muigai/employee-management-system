const ConfirmDates = ({ leaveApplicationData, setLeaveApplicationData, setStep, select }) => 
{
    const updateLeaveDayType = (date, value) => 
    {
        setLeaveApplicationData(prev => 
        {
            const updatedDates = 
            {
                ...prev.leaveDates,
                [date]: value
            }

            const total = Object.values(updatedDates).reduce((acc, val) => acc + (val === 'Half' ? 0.5 : 1), 0)

            return {
                ...prev,
                leaveDates: updatedDates,
                totalDays: total
            }
        })
    }

    //Function to calculate the grid columns based on the length of the dates array
    const getGridColsClass = length => 
    {
        if (length <= 2) return "grid-cols-1 sm:grid-cols-2"
        if (length <= 4) return "grid-cols-2 sm:grid-cols-2 md:grid-cols-3"
        if (length <= 6) return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
        if (length <= 9) return "grid-cols-2 sm:grid-cols-3 md:grid-cols-5"
        return "grid-cols-2 sm:grid-cols-3 md:grid-cols-6"
    }

    return ( 
        <>
            <h1 className="text-xl font-bold mb-2">Select Leave Type for Each Date</h1>
            <p className="mb-4 text-lg text-center font-bold">Total number of days: {leaveApplicationData.totalDays}</p>
            <div className={`grid gap-4 ${getGridColsClass(Object.keys(leaveApplicationData.leaveDates).length)}`}>
                {
                    Object.entries(leaveApplicationData.leaveDates).map(([day, value]) => 
                    {
                        const isSaturday = new Date(day).getDay() === 6

                        return (
                            <div key={day} className="space-y-2 border p-2 rounded">
                                <span>{day}</span>
                                <select value={value} onChange={(e) => updateLeaveDayType(day, e.target.value)} className={`${select} disabled:text-black disabled:bg-gray-200`} disabled={isSaturday}>
                                    <option value="Full">Full Day</option>
                                    <option value="Half">Half Day</option>
                                </select>
                            </div>
                        )
                    })
                }
            </div>
            <div className="flex justify-between mt-6">
                <button type="button" className="btn btn-outline hover:text-white text-black" onClick={() => setStep(2)}>Previous</button>
                <button type="button" className="btn btn-success text-white" onClick={() => setStep(4)}>Next</button>
            </div>
        </>
    )
}
 
export default ConfirmDates