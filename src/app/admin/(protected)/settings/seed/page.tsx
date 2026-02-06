'use client';

import { useState } from 'react';
import { seedDatabase } from '@/features/admin/actions/seed-data';
import { allProducts } from '@/shared/data/products';
import toast from 'react-hot-toast';

export default function SeedPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<string>('');

    const runMigration = async () => {
        setIsLoading(true);
        setStatus('Starting migration via Server Action...');

        try {
            const result = await seedDatabase();

            if (result.success) {
                setStatus(result.message);
                toast.success('Database seeded successfully!');
            } else {
                throw new Error(result.message);
            }
        } catch (error: any) {
            console.error('Migration failed:', error);
            setStatus(`Error: ${error.message}`);
            toast.error('Migration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-12">
            <h1 className="text-2xl font-bold mb-4">Database Seeding</h1>
            <p className="text-gray-600 mb-8">
                Migrate your mock data from <code>products.ts</code> to the live Supabase database.
            </p>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="mb-4">
                    <h3 className="font-semibold">Items to migrate:</h3>
                    <ul className="list-disc list-inside text-sm text-gray-500 mt-2">
                        <li>{allProducts.length} Products</li>
                        <li>Dynamic Categories</li>
                    </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-6 font-mono text-sm min-h-[100px]">
                    {status || 'Ready to start...'}
                </div>

                <button
                    onClick={runMigration}
                    disabled={isLoading}
                    className="w-full py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50 transition-colors"
                >
                    {isLoading ? 'Migrating...' : 'Start Migration'}
                </button>
            </div>
        </div>
    );
}
