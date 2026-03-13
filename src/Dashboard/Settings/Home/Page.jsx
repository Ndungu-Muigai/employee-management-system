const Home = () => 
{
    const settingsActions = [
        {
            text: (
                <>
                    Add, edit, and remove <strong>countries</strong> used by your organization.
                </>
            ),
        },
        {
            text: (
                <>
                    Create and manage <strong>branches</strong> and assign them to countries.
                </>
            ),
        },
        {
            text: (
                <>
                    Set up and organize <strong>departments</strong> across different branches.
                </>
            ),
        },
        {
            text: (
                <>
                    Create and manage <strong>roles</strong> and define <strong>permissions</strong> for each role.
                </>
            ),
        },
    ]

    return (
        <div className="max-w-6xl w-full mx-auto bg-white p-4 sm:p-6 md:p-8">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center">Settings Overview</h1>

            <p className="text-gray-600 leading-relaxed text-center text-sm sm:text-base px-2 sm:px-0">
                Manage the core configuration data that powers the entire system.  
                Use the tabs above to navigate between the available settings sections.
            </p>

            <div className="mt-1">
                <h2 className="text-lg sm:text-xl font-medium text-gray-800 mb-1.5 text-center sm:text-left">What you can do:</h2>

                <ul className="space-y-2 text-gray-700 bg-gray-50 p-4 sm:p-5 rounded-lg border border-gray-200">
                    {
                        settingsActions.map((item, index) => 
                        {
                            return(
                                <li key={index} className="flex items-center gap-2">
                                    <span className="text-blue-600 font-bold text-xl">•</span>
                                    <span className="text-sm sm:text-base">{item.text}</span>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>

            <p className="text-gray-600 mt-4 md:text-center text-sm sm:text-base px-2 sm:px-0">
                Select a tab above to begin configuring your system settings.
            </p>
        </div>
    )
}

export default Home