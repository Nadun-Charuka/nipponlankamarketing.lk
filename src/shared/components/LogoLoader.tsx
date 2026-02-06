'use client';

export function LogoLoader({ className = '', textClassName = '' }: { className?: string; textClassName?: string }) {
    return (
        <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
            <div className="relative">
                {/* Logo Icon (Optional, matching Login page N) */}
                <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center transform rotate-3 shadow-lg mx-auto animate-bounce">
                    <span className="text-white font-display font-bold text-2xl transform -rotate-3">N</span>
                </div>
            </div>
            <h3 className={`font-display font-bold text-gray-900 text-lg animate-pulse ${textClassName}`}>
                Nippon Lanka Marketing
            </h3>
        </div>
    );
}
