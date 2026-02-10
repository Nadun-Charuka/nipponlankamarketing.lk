import { Metadata } from 'next';
import { AboutHero, CompanyStats, OrderingGuide, BusinessServices } from '@/features/marketing/components';

export const metadata: Metadata = {
    title: 'About Us | Nippon Lanka',
    description: 'Learn more about Nippon Lanka Marketing Pvt Ltd, our history, and our commitment to providing the best electronics and home appliances in Sri Lanka.',
};

export default function AboutPage() {
    return (
        <main>
            <AboutHero />
            <CompanyStats />
            <OrderingGuide />
            <BusinessServices />
        </main>
    );
}
