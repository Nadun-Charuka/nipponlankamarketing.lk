import { FiCreditCard, FiTruck, FiShield } from 'react-icons/fi';

const banners = [
    {
        id: 1,
        title: '20% C A S H__D I S C O U N T',
        subtitle: 'ON_ALL_ITEMS',
        icon: <FiCreditCard className="w-8 h-8 md:w-10 md:h-10 text-white" />,
        color: 'from-accent-red to-orange-600',
        description: 'Get flat 20% off when you pay with cash on delivery or bank transfer.',
    },
    {
        id: 2,
        title: 'F R E E__D E L I V E R Y',
        subtitle: 'W E S T E R N__P R O V I N C E',
        icon: <FiTruck className="w-8 h-8 md:w-10 md:h-10 text-white" />,
        color: 'from-primary-600 to-indigo-600',
        description: 'Free doorstep delivery for all orders within Colombo, Gampaha & Kalutara.',
    },
    {
        id: 3,
        title: '1 Y E A R__W A R R A N T Y',
        subtitle: 'O F F I C I A L__A G E N T',
        icon: <FiShield className="w-8 h-8 md:w-10 md:h-10 text-white" />,
        color: 'from-accent-green to-emerald-600',
        description: 'Comprehensive warranty coverage on all electronics and appliances.',
    },
];

export function PromoBanners() {
    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {banners.map((banner) => (
                        <div
                            key={banner.id}
                            className={`relative overflow-hidden rounded-2xl p-6 md:p-8 bg-gradient-to-br ${banner.color} shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group`}
                        >
                            {/* Abstract Background Shapes */}
                            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white opacity-10 blur-xl group-hover:scale-150 transition-transform duration-700" />
                            <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 rounded-full bg-black opacity-5 blur-xl group-hover:scale-150 transition-transform duration-700" />

                            <div className="relative z-10 flex flex-col items-start h-full">
                                <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm mb-4">
                                    {banner.icon}
                                </div>

                                <h3 className="text-xl md:text-2xl font-bold text-white mb-1 uppercase tracking-wide">
                                    {banner.title.replace(/__/g, ' ')}
                                </h3>
                                <p className="text-white/80 font-medium text-sm md:text-base mb-4 uppercase tracking-widest">
                                    {banner.subtitle.replace(/__/g, ' ')}
                                </p>

                                <p className="text-white/90 text-sm leading-relaxed mt-auto">
                                    {banner.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
