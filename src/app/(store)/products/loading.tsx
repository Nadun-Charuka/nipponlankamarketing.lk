export default function ProductsLoading() {
    return (
        <div className="bg-white min-h-screen">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header Skeleton */}
                <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                    <div className="h-10 w-48 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
                </div>

                <div className="pb-24 pt-6">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                        {/* Sidebar Skeleton (Desktop) */}
                        <div className="hidden lg:block space-y-8">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="space-y-3">
                                    <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="space-y-2">
                                        {[1, 2, 3].map((j) => (
                                            <div key={j} className="h-5 w-full bg-gray-100 rounded animate-pulse"></div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Product Grid Skeleton */}
                        <div className="lg:col-span-3">
                            {/* Mobile Toolbar Skeleton */}
                            <div className="lg:hidden mb-6 flex gap-4">
                                <div className="h-10 flex-1 bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-10 flex-1 bg-gray-200 rounded animate-pulse"></div>
                            </div>

                            {/* Grid */}
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className="group relative animate-pulse">
                                        {/* Image Skeleton */}
                                        <div className="aspect-square w-full rounded-lg bg-gray-200 mb-4"></div>

                                        {/* Content Skeleton */}
                                        <div className="space-y-2">
                                            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                                            <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                                            <div className="h-6 w-1/3 bg-gray-200 rounded mt-2"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
