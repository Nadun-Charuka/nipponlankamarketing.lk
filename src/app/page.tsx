import { DualPriceDisplay } from '@/features/pricing/components/DualPriceDisplay';
import { WhatsAppCTA } from '@/features/whatsapp/components/WhatsAppCTA';
import { WhatsAppFAB } from '@/features/whatsapp/components/WhatsAppFAB';
import { ProductCard } from '@/features/catalog/components/ProductCard';
import { Product } from '@/shared/types/database';

// Sample products for demonstration
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Samsung 55" 4K Smart TV',
    slug: 'samsung-55-4k-smart-tv',
    description: 'Experience stunning 4K resolution with HDR support and smart features. Perfect for your living room entertainment.',
    category_id: '1',
    base_price: 250000,
    cash_price: 200000,
    installment_months: 12,
    stock_status: 'in_stock',
    sku: 'TV-SAM-55-001',
    images: [],
    featured_image: '/products/samsung-tv.jpg',
    specifications: {},
    meta_title: null,
    meta_description: null,
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'LG 420L Double Door Refrigerator',
    slug: 'lg-420l-double-door-refrigerator',
    description: 'Spacious double door refrigerator with inverter compressor for energy efficiency and silent operation.',
    category_id: '2',
    base_price: 180000,
    cash_price: 144000,
    installment_months: 12,
    stock_status: 'in_stock',
    sku: 'FRIDGE-LG-420-001',
    images: [],
    featured_image: '/products/lg-fridge.jpg',
    specifications: {},
    meta_title: null,
    meta_description: null,
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Abans 8kg Front Load Washing Machine',
    slug: 'abans-8kg-front-load-washing-machine',
    description: 'Efficient front load washing machine with multiple wash programs and quick wash feature.',
    category_id: '3',
    base_price: 95000,
    cash_price: 76000,
    installment_months: 12,
    stock_status: 'in_stock',
    sku: 'WASH-ABN-8KG-001',
    images: [],
    featured_image: '/products/abans-washer.jpg',
    specifications: {},
    meta_title: null,
    meta_description: null,
    is_featured: false,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function HomePage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-lavender">
        <div className="container mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center space-y-6 mb-16">
            <h1 className="text-5xl md:text-6xl font-display font-bold text-primary-700">
              Nippon Lanka Marketing
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
              Premium Home Appliances & Furniture on{" "}
              <span className="text-primary-600 font-semibold">Easy Installments</span>
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
              <div className="glass px-6 py-3 rounded-full">
                ✨ No Credit Card Required
              </div>
              <div className="glass px-6 py-3 rounded-full">
                🚚 Free Delivery (Western Province)
              </div>
              <div className="glass px-6 py-3 rounded-full">
                💳 In-House Installments
              </div>
            </div>
          </div>

          {/* Pricing Demo Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-center text-primary-700 mb-8">
              💰 Our Dual-Pricing Model
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Card Variant */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Card View (Product Grid)
                </h3>
                <DualPriceDisplay
                  basePrice={250000}
                  variant="card"
                />
              </div>

              {/* Detail Variant */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Detail View (Product Page)
                </h3>
                <DualPriceDisplay
                  basePrice={250000}
                  variant="detail"
                />
              </div>
            </div>
          </div>

          {/* Sample Products */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-primary-700 mb-8">
              🛍️ Featured Products
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {sampleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* WhatsApp CTA Demo */}
          <div className="max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-center text-primary-700 mb-8">
              📱 WhatsApp Ordering
            </h2>
            <WhatsAppCTA
              productName='Samsung 55" 4K Smart TV'
              productUrl="http://localhost:3000/products/samsung-55-4k-smart-tv"
            />
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            <div className="card-glass p-8 text-center space-y-4">
              <div className="text-4xl">💰</div>
              <h3 className="text-xl font-bold text-primary-700">Dual Pricing</h3>
              <p className="text-gray-600">
                Get <span className="font-semibold text-primary-600">20% OFF</span> on cash payments
                or choose easy installments
              </p>
            </div>

            <div className="card-glass p-8 text-center space-y-4">
              <div className="text-4xl">📱</div>
              <h3 className="text-xl font-bold text-primary-700">WhatsApp Ordering</h3>
              <p className="text-gray-600">
                Simple and fast ordering through WhatsApp Business
              </p>
            </div>

            <div className="card-glass p-8 text-center space-y-4">
              <div className="text-4xl">🎯</div>
              <h3 className="text-xl font-bold text-primary-700">Western Province</h3>
              <p className="text-gray-600">
                100% Free delivery in Colombo, Gampaha & Kalutara
              </p>
            </div>
          </div>

          {/* Status */}
          <div className="text-center">
            <div className="inline-block glass-strong px-8 py-4 rounded-2xl">
              <p className="text-sm text-gray-600 mb-2">🚀 Development Status</p>
              <p className="text-lg font-semibold text-primary-700">
                Phase 2: Core Components Complete ✅
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Dual Pricing • WhatsApp Integration • Product Cards
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button (Mobile Only) */}
      <WhatsAppFAB />
    </>
  );
}
