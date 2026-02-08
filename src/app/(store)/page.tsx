'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { HeroSlider } from '@/features/hero/components';
import { ProductCarousel, QuickViewModal } from '@/features/catalog/components';
import { PromoBanners, BrandShowcase, Testimonials } from '@/features/marketing/components';
import { CompanyStories } from '@/features/stories/components';
import { WhatsAppFAB } from '@/features/whatsapp/components/WhatsAppFAB';
import { LocationMap } from '@/features/location/components';
import { Product } from '@/shared/types/database';
import { supabase } from '@/shared/lib/supabase';
import { generateLocalBusinessSchema } from '@/shared/lib/seo';

export default function HomePage() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(10); // get top 10 newest

      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    }

    fetchProducts();
  }, []);

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const handleAddToWishlist = (productId: string) => {
    toast.success('Added to wishlist!');
  };

  return (
    <>
      {/* Local Business Schema for SEO */}
      <script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateLocalBusinessSchema()),
        }}
      />

      <main>
        {/* Hero Slider */}
        <HeroSlider />



        {/* Promotional Banners */}
        <PromoBanners />

        {/* Featured Products Section (Carousel) */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <ProductCarousel
              products={products}
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
              products={[...products].reverse()}
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

        {/* Location Map */}
        <LocationMap />

        {/* Company Stories */}
        <CompanyStories />
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
