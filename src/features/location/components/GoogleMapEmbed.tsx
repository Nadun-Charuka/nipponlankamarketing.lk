'use client';

import { useState, useEffect } from 'react';
import { FiAlertCircle, FiRefreshCw } from 'react-icons/fi';

interface GoogleMapEmbedProps {
    className?: string;
}

export function GoogleMapEmbed({ className = '' }: GoogleMapEmbedProps) {
    const [mapLoaded, setMapLoaded] = useState(false);
    const [mapError, setMapError] = useState(false);
    const [retryCount, setRetryCount] = useState(0);
    const MAX_RETRIES = 2;

    // Nippon Lanka Marketing actual location
    const coordinates = {
        lat: 6.866823852953636,
        lng: 79.97346212354978
    };

    const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.0!2d${coordinates.lng}!3d${coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTInMDAuNiJOIDc5wrA1OCcyNC41IkU!5e0!3m2!1sen!2slk!4v${Date.now()}!5m2!1sen!2slk`;

    // Handle iframe load
    const handleMapLoad = () => {
        setMapLoaded(true);
        setMapError(false);
    };

    // Handle iframe error
    const handleMapError = () => {
        if (retryCount < MAX_RETRIES) {
            // Retry loading
            setTimeout(() => {
                setRetryCount(prev => prev + 1);
                setMapError(false);
                setMapLoaded(false);
            }, 1000);
        } else {
            setMapError(true);
            setMapLoaded(true);
        }
    };

    // Set a timeout for map loading (10 seconds)
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!mapLoaded && !mapError) {
                handleMapError();
            }
        }, 10000);

        return () => clearTimeout(timeout);
    }, [mapLoaded, mapError, retryCount]);

    const handleRetry = () => {
        setRetryCount(0);
        setMapError(false);
        setMapLoaded(false);
    };

    return (
        <div className={`bg-white rounded-2xl shadow-lg overflow-hidden h-full relative min-h-[400px] ${className}`}>
            {/* Loading State */}
            {!mapLoaded && !mapError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-600 font-medium">Loading map...</p>
                        {retryCount > 0 && (
                            <p className="text-sm text-gray-500 mt-2">Retry attempt {retryCount}/{MAX_RETRIES}</p>
                        )}
                    </div>
                </div>
            )}

            {/* Error State */}
            {mapError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10 p-8">
                    <div className="text-center max-w-md">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FiAlertCircle className="w-8 h-8 text-red-600" />
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 mb-2">Map Unavailable</h4>
                        <p className="text-gray-600 mb-4">
                            Unable to load the interactive map. Please try again later.
                        </p>
                        <button
                            onClick={handleRetry}
                            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
                        >
                            <FiRefreshCw className="w-4 h-4" />
                            Try Again
                        </button>
                    </div>
                </div>
            )}

            {/* Map Iframe */}
            <iframe
                key={retryCount} // Force re-render on retry
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="eager"
                referrerPolicy="no-referrer-when-downgrade"
                title="Nippon Lanka Marketing Location"
                className="w-full h-full"
                onLoad={handleMapLoad}
                onError={handleMapError}
            />
        </div>
    );
}
