
const Dashboard = ({ user }) => 
{
    const hour = new Date().getHours()
    const greeting = hour <= 12 
        ? "Good morning" 
        : hour > 12 && hour <= 17 
            ? "Good afternoon" 
            : "Good evening"

    return ( 
        <div className="px-2 py-3">
            <h1 className="font-bold text-lg md:text-2xl xl:text-4xl text-center">{greeting}, {user}</h1>
        </div>
    );
}
 
export default Dashboard;