import { CategoryForm } from '@/features/admin/components/CategoryForm';

export default function NewCategoryPage() {
    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Add New Category</h1>
                <p className="text-gray-600 mt-1">Create a new product category with icon</p>
            </div>

            <CategoryForm />
        </div>
    );
}
