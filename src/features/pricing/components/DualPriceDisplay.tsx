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
                <div className="bg-white border-2 border-accent-red rounded-lg p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-bold text-accent-red uppercase tracking-wider mb-1">
                                Cash Price (Save 20%)
                            </p>
                            <p className="text-4xl font-bold text-gray-900">
                                {formatPrice(cashPrice)}
                            </p>
                            <p className="text-sm text-gray-500 mt-1 line-through">
                                {formatPrice(basePrice)}
                            </p>
                        </div>
                        <div className="bg-accent-red text-white px-3 py-1 rounded text-sm font-bold shadow-sm">
                            -20%
                        </div>
                    </div>
                </div>

                {/* Installment Price */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                    <div>
                        <p className="text-sm font-bold text-primary-700 uppercase tracking-wider mb-1">
                            Easy Installment Plan
                        </p>
                        <div className="flex items-baseline gap-2">
                            <p className="text-3xl font-bold text-gray-900">
                                {formatPrice(monthlyInstallment)}
                            </p>
                            <p className="text-lg text-gray-600">/month</p>
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                            <span className="bg-primary-100 text-primary-700 px-2 py-0.5 rounded font-medium">
                                {installmentMonths} Months
                            </span>
                            <span>• Total: {formatPrice(basePrice)}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Card variant (Table Style)
    return (
        <div className={cn('w-full', className)}>
            <div className="grid grid-cols-2 text-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                {/* Cash Price Column */}
                <div className="p-2 border-r border-gray-200 flex flex-col justify-center">
                    <span className="text-[10px] uppercase font-bold text-accent-red tracking-tight mb-0.5">
                        Cash Price
                    </span>
                    <span className="text-base font-bold text-gray-900 leading-tight">
                        {formatPrice(cashPrice)}
                    </span>
                    <span className="text-[10px] text-gray-400 line-through">
                        {formatPrice(basePrice)}
                    </span>
                </div>

                {/* Installment Column */}
                <div className="p-2 bg-gray-50 flex flex-col justify-center">
                    <span className="text-[10px] uppercase font-bold text-primary-700 tracking-tight mb-0.5">
                        Monthly
                    </span>
                    <span className="text-base font-bold text-gray-900 leading-tight">
                        {formatPrice(monthlyInstallment)}
                    </span>
                    <span className="text-[10px] text-gray-500">
                        x {installmentMonths} Months
                    </span>
                </div>
            </div>
        </div>
    );
}
