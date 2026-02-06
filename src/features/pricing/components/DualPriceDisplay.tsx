import { cn } from '@/shared/lib/utils';

interface DualPriceDisplayProps {
    basePrice: number;
    installmentMonths?: number;
    variant?: 'card' | 'detail';
    className?: string;
}

export function DualPriceDisplay({
    basePrice,
    installmentMonths = 12,
    variant = 'card',
    className
}: DualPriceDisplayProps) {
    const cashPrice = basePrice * 0.8;
    const monthlyInstallment = basePrice / installmentMonths;

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-LK', {
            style: 'currency',
            currency: 'LKR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price).replace('LKR', 'Rs.');
    };

    if (variant === 'detail') {
        return (
            <div className={cn('space-y-4', className)}>
                {/* Cash Price - Highlighted */}
                <div className="bg-gradient-to-r from-primary-100 to-primary-50 border-2 border-primary-300 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-primary-700 mb-1">
                                💰 Cash Price (Save 20%)
                            </p>
                            <p className="text-4xl font-bold text-primary-900">
                                {formatPrice(cashPrice)}
                            </p>
                            <p className="text-sm text-primary-600 mt-1">
                                One-time payment
                            </p>
                        </div>
                        <div className="bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                            20% OFF
                        </div>
                    </div>
                </div>

                {/* Installment Price */}
                <div className="bg-gradient-to-r from-accent-lavender to-white border-2 border-primary-200 rounded-2xl p-6">
                    <div>
                        <p className="text-sm font-medium text-primary-700 mb-1">
                            📅 Installment Plan
                        </p>
                        <div className="flex items-baseline gap-2">
                            <p className="text-3xl font-bold text-primary-900">
                                {formatPrice(monthlyInstallment)}
                            </p>
                            <p className="text-lg text-primary-600">/month</p>
                        </div>
                        <p className="text-sm text-primary-600 mt-1">
                            {installmentMonths} months • Total: {formatPrice(basePrice)}
                        </p>
                        <p className="text-xs text-primary-500 mt-2">
                            ✨ No credit card required • In-house financing
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Card variant (compact)
    return (
        <div className={cn('space-y-2', className)}>
            {/* Cash Price Badge */}
            <div className="price-badge-cash flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-xs opacity-80">Cash Price</span>
                    <span className="text-lg font-bold">
                        {formatPrice(cashPrice)}
                    </span>
                </div>
                <span className="text-xs bg-primary-500 text-white px-2 py-1 rounded">
                    20% OFF
                </span>
            </div>

            {/* Installment Badge */}
            <div className="price-badge-installment">
                <div className="flex flex-col w-full">
                    <span className="text-xs opacity-80">Installment starting at</span>
                    <div className="flex items-baseline gap-1">
                        <span className="text-base font-semibold">
                            {formatPrice(monthlyInstallment)}
                        </span>
                        <span className="text-xs opacity-70">/mo ({installmentMonths} months)</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
