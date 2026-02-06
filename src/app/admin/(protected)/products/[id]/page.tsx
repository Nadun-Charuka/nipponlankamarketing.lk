'use client';

import { ProductForm } from '@/features/admin/components/ProductForm';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import { useParams } from 'next/navigation';
import { supabase } from '@/shared/lib/supabase';
import { useEffect, useState } from 'react';
import { Product } from '@/shared/types/database';

export default function EditProductPage() {
    const params = useParams();
    const [product, setProduct] = useState<Product | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!params.id) return;

            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', params.id)
                .single();

            if (error) {
                console.error(error);
            } else {
                setProduct(data);
            }
            setIsLoading(false);
        };

        fetchProduct();
    }, [params.id]);

    if (isLoading) return <div>Loading...</div>;

    if (!product) {
        return (
            <div className="text-center py-12">
                <h2 className="text-xl font-bold text-gray-900">Product not found</h2>
                <Link href="/admin/products" className="text-primary-600 hover:underline mt-2 inline-block">
                    Go back to products
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex items-center gap-4">
                <Link
                    href="/admin/products"
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
                >
                    <FiArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
                    <p className="text-sm text-gray-500">Update details for {product.name}</p>
                </div>
            </div>

            <ProductForm initialData={product} isEditing />
        </div>
    );
}
