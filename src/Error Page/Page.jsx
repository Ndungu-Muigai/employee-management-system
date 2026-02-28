import { useNavigate } from "react-router-dom"

const ErrorPage = () => 
{
    const navigate = useNavigate()

    return (
        <div className="flex items-center justify-center w-full h-[80vh]">
            <div className="text-center">
                <h1 className="text-9xl font-extrabold text-gray-800 mb-4">404</h1>
                <p className="text-2xl font-semibold text-gray-600 mb-2">Page Not Found</p>
                <p className="text-gray-500 mb-6">Oops! The page you’re looking for doesn’t exist or has been moved.</p>
                <button onClick={() => navigate(-1)} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">Back</button>
            </div>
        </div>
    )
}

export default ErrorPage