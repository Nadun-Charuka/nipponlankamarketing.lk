'use client';

import { FiAlertTriangle } from 'react-icons/fi';

interface SessionTimeoutWarningProps {
    show: boolean;
    onExtend: () => void;
    onLogout: () => void;
}

export function SessionTimeoutWarning({ show, onExtend, onLogout }: SessionTimeoutWarningProps) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                            <FiAlertTriangle className="w-6 h-6 text-yellow-600" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Session Expiring Soon
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Your session will expire in 5 minutes due to inactivity. Would you like to stay logged in?
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={onExtend}
                                className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium text-sm"
                            >
                                Stay Logged In
                            </button>
                            <button
                                onClick={onLogout}
                                className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
                            >
                                Logout Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
