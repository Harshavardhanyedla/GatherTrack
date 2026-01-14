import { Outlet, Link, useNavigate } from 'react-router-dom';
import { LogOut, Home, UserPlus, PlusCircle, Shield } from 'lucide-react';

export default function Layout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            {/* Navbar */}
            <nav className="bg-blue-600 text-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/dashboard" className="text-xl font-bold tracking-tight">
                                ChurchDistribute
                            </Link>
                        </div>
                        <div className="flex space-x-4">
                            <Link to="/dashboard" className="p-2 hover:bg-blue-700 rounded-full" title="Dashboard">
                                <Home size={24} />
                            </Link>
                            <Link to="/create-gathering" className="p-2 hover:bg-blue-700 rounded-full" title="New Gathering">
                                <PlusCircle size={24} />
                            </Link>
                            <Link to="/register-person" className="p-2 hover:bg-blue-700 rounded-full" title="Register Person">
                                <UserPlus size={24} />
                            </Link>
                            <button onClick={handleLogout} className="p-2 hover:bg-blue-700 rounded-full" title="Logout">
                                <LogOut size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <Outlet />
            </main>
        </div>
    );
}
