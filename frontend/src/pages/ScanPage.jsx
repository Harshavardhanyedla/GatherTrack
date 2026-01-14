import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { CheckCircle, XCircle, ArrowLeft, RotateCcw } from 'lucide-react';
import api from '../api';

export default function ScanPage() {
    const { gatheringId } = useParams();
    const [scanResult, setScanResult] = useState(null); // { success: boolean, message: string, personName: string }
    const [isScanning, setIsScanning] = useState(true);
    const scannerRef = useRef(null);

    useEffect(() => {
        // If we have a result, stop scanning (UI hides the scanner anyway, but good to be safe)
        if (scanResult) return;

        // Initialize scanner
        const scanner = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
        );

        scanner.render(onScanSuccess, onScanFailure);
        scannerRef.current = scanner;

        return () => {
            scanner.clear().catch(error => {
                console.error("Failed to clear scanner", error);
            });
        };
    }, [scanResult]); // Re-run if scanResult is cleared (to restart scanner)

    const onScanSuccess = async (decodedText, decodedResult) => {
        if (!decodedText) return;

        // Pause scanning to prevent double triggers
        if (scannerRef.current) {
            scannerRef.current.clear();
        }

        try {
            let personId;
            try {
                const data = JSON.parse(decodedText);
                personId = data.id;
            } catch (e) {
                // Check if it's raw UUID string or invalid
                personId = decodedText;
            }

            const res = await api.post('/scan', { personId, gatheringId });

            setScanResult({
                success: true,
                message: res.data.message,
                personName: res.data.personName
            });

        } catch (error) {
            const errorData = error.response?.data;
            setScanResult({
                success: false,
                message: errorData?.message || 'SCAN ERROR',
                personName: errorData?.personName || 'Unknown'
            });
        }
    };

    const onScanFailure = (error) => {
        // console.warn(`Code scan error = ${error}`);
    };

    const wrapUp = () => {
        setScanResult(null); // Will trigger useEffect to restart scanner
    };

    // --- RENDERING ---

    // 1. RESULT VIEW (Green/Red Screen)
    if (scanResult) {
        return (
            <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-4 ${scanResult.success ? 'bg-green-600' : 'bg-red-600'} text-white`}>
                <div className="bg-white/10 p-8 rounded-full mb-6 backdrop-blur-sm animate-bounce">
                    {scanResult.success ? (
                        <CheckCircle size={120} strokeWidth={3} />
                    ) : (
                        <XCircle size={120} strokeWidth={3} />
                    )}
                </div>

                <h1 className="text-5xl font-black text-center mb-2 uppercase tracking-wide">
                    {scanResult.success ? 'RECEIVED' : scanResult.message}
                </h1>

                <p className="text-3xl font-semibold opacity-90 mb-12 text-center">
                    {scanResult.personName}
                </p>

                <button
                    onClick={wrapUp}
                    className="flex items-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-full text-xl font-bold hover:bg-gray-100 shadow-xl transition transform hover:scale-105 active:scale-95"
                >
                    <RotateCcw size={24} />
                    Scan Next Person
                </button>
            </div>
        );
    }

    // 2. SCANNER VIEW
    return (
        <div className="max-w-md mx-auto">
            <div className="mb-4">
                <Link to="/dashboard" className="flex items-center text-gray-600 hover:text-blue-600">
                    <ArrowLeft size={20} className="mr-1" /> Back to Dashboard
                </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Scan QR Code</h2>
                <div id="reader" className="w-full h-auto overflow-hidden rounded-lg border-2 border-gray-200"></div>
                <p className="text-center text-sm text-gray-500 mt-4">
                    Point camera at the QR code on the person's phone.
                </p>
            </div>
        </div>
    );
}
