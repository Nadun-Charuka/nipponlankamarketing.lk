export default function ProductLoading() {
    return (
        <div className="bg-white min-h-screen pb-24 md:pb-16 animate-pulse">
            {/* Breadcrumb Skeleton */}
            <div className="container mx-auto px-4 py-3 border-b border-gray-100 mb-6">
                <div className="h-4 w-48 bg-gray-200 rounded"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
                    {/* Left Column: Gallery Skeleton */}
                    <div className="md:col-span-6 lg:col-span-7">
                        <div className="aspect-square md:aspect-auto md:h-[500px] bg-gray-200 rounded-2xl"></div>
                        <div className="hidden md:flex gap-4 mt-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-20 w-20 bg-gray-200 rounded-lg"></div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Info Skeleton */}
                    <div className="md:col-span-6 lg:col-span-5 space-y-6">
                        {/* Title & Brand */}
                        <div>
                            <div className="h-8 w-3/4 bg-gray-200 rounded mb-4"></div>
                            <div className="flex gap-4">
                                <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                                <div className="h-6 w-24 bg-gray-200 rounded"></div>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="h-16 w-full bg-gray-100 rounded-xl p-4"></div>

                        {/* Actions */}
                        <div className="py-6 border-t border-b border-gray-100 space-y-4">
                            <div className="flex gap-4">
                                <div className="h-12 w-32 bg-gray-200 rounded-lg"></div>
                                <div className="h-12 flex-1 bg-gray-200 rounded-lg"></div>
                            </div>
                            <div className="h-12 w-full bg-gray-200 rounded-lg"></div>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-2 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex gap-2">
                                    <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 w-full bg-gray-200 rounded"></div>
                                        <div className="h-3 w-2/3 bg-gray-200 rounded"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
