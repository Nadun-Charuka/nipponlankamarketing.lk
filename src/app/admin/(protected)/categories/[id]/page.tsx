import { CategoryForm } from '@/features/admin/components/CategoryForm';

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Edit Category</h1>
                <p className="text-gray-600 mt-1">Update category information and icon</p>
            </div>

            <CategoryForm categoryId={id} />
        </div>
    );
}
