const IntroText = () => 
{
    return ( 
        <div className="w-full md:w-1/2 bg-linear-to-br from-blue-600 to-indigo-700 text-white hidden md:flex items-center justify-center px-8 py-16">
            <div className="max-w-2xl text-center md:text-left space-y-6">
                <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">Employee Management System</h1>
                <p className="text-base md:text-lg opacity-90">
                    A centralized platform built to simplify workplace processes 
                    and improve collaboration across your organization.
                </p>
                <div className="pt-4 space-y-3 text-sm md:text-base opacity-90">
                    <div className="flex items-center justify-center md:justify-start gap-3">
                        <span className="w-2 h-2 bg-white rounded-full"></span>
                        <span>Manage employee profiles</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-3">
                        <span className="w-2 h-2 bg-white rounded-full"></span>
                        <span>Submit and track leave requests</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-3">
                        <span className="w-2 h-2 bg-white rounded-full"></span>
                        <span>Assign and manage company assets</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-3">
                        <span className="w-2 h-2 bg-white rounded-full"></span>
                        <span>Monitor performance and appraisals</span>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default IntroText;