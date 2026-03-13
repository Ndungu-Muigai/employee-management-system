const DateRange = () => 
{
    // Convert date to YYYY-MM-DD string
    const formatDate = date => 
    {
        const y = date.getFullYear()
        const m = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-indexed
        const d = String(date.getDate()).padStart(2, '0')
        return `${y}-${m}-${d}`
    }

    //Calculating the min and max dates
    const today = new Date()
    const currentYear = today.getFullYear()
    const currentMonth = today.getMonth() + 1

    //Setting the min date to today
    const minDateRange = formatDate(today)

    // Max date logic
    let maxDateRange
    if (currentMonth === 12) 
    {
        // If December, max date = Feb 28/29 of next year
        const nextYear = currentYear + 1
        maxDateRange = new Date(nextYear, 1, 28) // February 28 (handle leap year separately if needed)
    } 
    else 
    {
        // Otherwise, max date = Dec 31 current year
        maxDateRange = new Date(currentYear, 11, 31)
    }

    maxDateRange = formatDate(maxDateRange)

  return { minDateRange, maxDateRange };
};

export default DateRange;
