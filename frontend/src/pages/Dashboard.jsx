import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, QrCode } from 'lucide-react';
import api from '../api';

export default function Dashboard() {
    const [gatherings, setGatherings] = useState([]);

    useEffect(() => {
        fetchGatherings();
    }, []);

    const fetchGatherings = async () => {
        try {
            const res = await api.get('/gatherings');
            setGatherings(res.data);
        } catch (error) {
            console.error("Failed to fetch gatherings", error);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Gatherings</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gatherings.map((gathering) => (
                    <div key={gathering.id} className="bg-white rounded-lg shadow hover:shadow-lg transition p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-2">{gathering.name}</h2>
                        <div className="flex items-center text-gray-600 mb-4">
                            <Calendar size={18} className="mr-2" />
                            <span>{gathering.date}</span>
                        </div>
                        <Link
                            to={`/scan/${gathering.id}`}
                            className="block w-full text-center bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition flex items-center justify-center gap-2"
                        >
                            <QrCode size={18} />
                            Start Scanning
                        </Link>
                    </div>
                ))}

                {gatherings.length === 0 && (
                    <div className="col-span-1 md:col-span-3 text-center py-10 text-gray-500">
                        No gatherings found. Create one to get started.
                    </div>
                )}
            </div>
        </div>
    );
}
