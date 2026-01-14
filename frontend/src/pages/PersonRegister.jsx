import { useState } from 'react';
import { User, Phone, Download } from 'lucide-react';
import api from '../api';

export default function PersonRegister() {
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [generatedPerson, setGeneratedPerson] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/people', { fullName, phone });
            setGeneratedPerson(res.data);
            setFullName('');
            setPhone('');
        } catch (error) {
            alert('Failed to register person');
        }
    };

    return (
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Registration Form */}
            <div className="bg-white p-8 rounded-lg shadow-md h-fit">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Register Person</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 text-gray-400" size={18} />
                            <input
                                type="text"
                                required
                                className="w-full pl-10 border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="John Doe"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Phone Number (Optional)</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
                            <input
                                type="tel"
                                className="w-full pl-10 border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="123-456-7890"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white font-bold py-3 rounded hover:bg-green-700 transition"
                    >
                        Register & Generate QR
                    </button>
                </form>
            </div>

            {/* Result Display */}
            <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center justify-center min-h-[300px]">
                {generatedPerson ? (
                    <div className="text-center w-full animate-fade-in">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{generatedPerson.fullName}</h3>
                        <p className="text-gray-500 mb-6">{generatedPerson.id}</p>

                        <div className="bg-white p-4 border-2 border-gray-200 rounded-lg inline-block mb-6">
                            <img src={generatedPerson.qrCodeData} alt="QR Code" className="w-48 h-48 mx-auto" />
                        </div>

                        <a
                            href={generatedPerson.qrCodeData}
                            download={`${generatedPerson.fullName.replace(/\s+/g, '_')}_QR.png`}
                            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
                        >
                            <Download size={18} />
                            Download QR Code
                        </a>
                    </div>
                ) : (
                    <div className="text-gray-400 text-center">
                        <User size={64} className="mx-auto mb-4 opacity-50" />
                        <p>Register a person to generate their QR code here.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
