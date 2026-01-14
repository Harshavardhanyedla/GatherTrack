import { useState, useEffect } from 'react';
import { Shield, UserPlus, Trash2 } from 'lucide-react';
import api from '../api';

export default function ManageAdmins() {
    const [admins, setAdmins] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        try {
            const res = await api.get('/admins');
            setAdmins(res.data);
        } catch (e) {
            console.error(e);
        }
    };

    const handleAddAdmin = async (e) => {
        e.preventDefault();
        try {
            await api.post('/admins', { username, password });
            setMessage({ type: 'success', text: 'Admin added successfully' });
            setUsername('');
            setPassword('');
            fetchAdmins();
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data?.error || 'Failed to add admin' });
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                <Shield className="text-blue-600" /> Manage Administrators
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Form */}
                <div className="bg-white p-6 rounded-lg shadow-md h-fit">
                    <h2 className="text-xl font-bold mb-4">Add New Admin</h2>
                    {message && (
                        <div className={`p-3 rounded mb-4 ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {message.text}
                        </div>
                    )}
                    <form onSubmit={handleAddAdmin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 cursor-auto">Username</label>
                            <input
                                type="text"
                                className="mt-1 block w-full border rounded-md px-3 py-2 shadow-sm focus:ring-blue-500 border-gray-300"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 cursor-auto">Password</label>
                            <input
                                type="password"
                                className="mt-1 block w-full border rounded-md px-3 py-2 shadow-sm focus:ring-blue-500 border-gray-300"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2 font-bold"
                        >
                            <UserPlus size={18} /> Add Admin Account
                        </button>
                    </form>
                </div>

                {/* List */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Current Admins</h2>
                    <div className="divide-y">
                        {admins.map((admin) => (
                            <div key={admin.id} className="py-3 flex justify-between items-center">
                                <div>
                                    <p className="font-medium text-gray-800">{admin.username}</p>
                                    <p className="text-xs text-gray-500 italic">Created: {new Date(admin.createdAt).toLocaleDateString()}</p>
                                </div>
                                {admin.username === 'admin' && (
                                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">System Default</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
