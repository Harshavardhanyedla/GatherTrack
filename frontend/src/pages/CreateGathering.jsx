import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function CreateGathering() {
    const [name, setName] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/gatherings', { name, date });
            navigate('/dashboard');
        } catch (error) {
            alert('Failed to create gathering');
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Gathering</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Gathering Name</label>
                    <input
                        type="text"
                        required
                        className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Sunday Service"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Date</label>
                    <input
                        type="date"
                        required
                        className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 transition"
                >
                    Create Gathering
                </button>
            </form>
        </div>
    );
}
