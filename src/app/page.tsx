'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { HeroSlider } from '@/features/hero/components';
import { ProductCarousel, QuickViewModal } from '@/features/catalog/components';
import { PromoBanners, BrandShowcase, Testimonials, Newsletter } from '@/features/marketing/components';
import { WhatsAppFAB } from '@/features/whatsapp/components/WhatsAppFAB';
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
    specifications: { 'Screen Size': '55 Inch', 'Resolution': '4K UHD', 'Smart TV': 'Yes' },
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
    specifications: { 'Capacity': '420L', 'Type': 'Double Door', 'Inverter': 'Yes' },
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
    specifications: { 'Capacity': '8kg', 'Type': 'Front Load', 'Programs': '12' },
    meta_title: null,
    meta_description: null,
    is_featured: false,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Panasonic 1.5 Ton Inverter AC',
    slug: 'panasonic-1-5-ton-inverter-ac',
    description: 'Powerful cooling with energy saving inverter technology. Anti-bacterial filter included.',
    category_id: '4',
    base_price: 150000,
    cash_price: 120000,
    installment_months: 12,
    stock_status: 'in_stock',
    sku: 'AC-PAN-1.5-001',
    images: [],
    featured_image: '/products/panasonic-ac.jpg',
    specifications: { 'Capacity': '1.5 Ton', 'Type': 'Inverter', 'Refrigerant': 'R32' },
    meta_title: null,
    meta_description: null,
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Damro 3 Piece Sofa Set',
    slug: 'damro-3-piece-sofa-set',
    description: 'Modern 3-piece sofa set with premium fabric upholstery and solid wood frame.',
    category_id: '5',
    base_price: 125000,
    cash_price: 100000,
    installment_months: 12,
    stock_status: 'pre_order',
    sku: 'SOFA-DAM-001',
    images: [],
    featured_image: '/products/sofa-set.jpg',
    specifications: { 'Material': 'Fabric', 'Seating': '3+2+1', 'Color': 'Grey' },
    meta_title: null,
    meta_description: null,
    is_featured: false,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function HomePage() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const handleAddToWishlist = (productId: string) => {
    toast.success('Added to wishlist!');
  };

  return (
    <>
      <main>
        {/* Hero Slider */}
        <HeroSlider />



        {/* Promotional Banners */}
        <PromoBanners />

        {/* Featured Products Section (Carousel) */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <ProductCarousel
              products={sampleProducts}
              title="🌟 Featured Products"
              onQuickView={handleQuickView}
              onAddToWishlist={handleAddToWishlist}
            />

            {/* View All Link */}
            <div className="text-center mt-12">
              <a
                href="/products"
                className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-xl"
              >
                View All Products
                <span>→</span>
              </a>
            </div>
          </div>
        </section>

        {/* New Arrivals Section (Carousel) */}
        <section className="py-16 bg-white overflow-hidden">
          <div className="container mx-auto px-4">
            <ProductCarousel
              products={[...sampleProducts].reverse()}
              title="🚀 New Arrivals"
              onQuickView={handleQuickView}
              onAddToWishlist={handleAddToWishlist}
            />
          </div>
        </section>

        {/* Brand Showcase */}
        <BrandShowcase />

        {/* Why Choose Us Section */}
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
                Why Choose Nippon Lanka?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {/* Feature 1 */}
              <div className="group text-center space-y-4 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg group-hover:scale-110 transition-transform">
                  🚚
                </div>
                <h3 className="text-xl font-bold text-gray-900">Free Delivery</h3>
                <p className="text-gray-600">
                  100% free delivery across Western Province (Colombo, Gampaha, Kalutara)
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group text-center space-y-4 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-accent-gold to-amber-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg group-hover:scale-110 transition-transform">
                  💳
                </div>
                <h3 className="text-xl font-bold text-gray-900">Easy Installments</h3>
                <p className="text-gray-600">
                  In-house installment plans with no credit card required
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group text-center space-y-4 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-accent-green to-emerald-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg group-hover:scale-110 transition-transform">
                  🔒
                </div>
                <h3 className="text-xl font-bold text-gray-900">Secure Payment</h3>
                <p className="text-gray-600">
                  Safe and secure payment options for your peace of mind
                </p>
              </div>

              {/* Feature 4 */}
              <div className="group text-center space-y-4 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg group-hover:scale-110 transition-transform">
                  📞
                </div>
                <h3 className="text-xl font-bold text-gray-900">24/7 Support</h3>
                <p className="text-gray-600">
                  Always here to help with your questions and concerns
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <Testimonials />

        {/* Newsletter */}
        <Newsletter />
      </main>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* Floating WhatsApp Button */}
      <WhatsAppFAB />
    </>
  );
}
