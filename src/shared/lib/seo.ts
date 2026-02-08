import { Product } from '@/shared/types/database';

/**
 * Generate Product Schema (JSON-LD) for rich snippets in Google Search
 */
export function generateProductSchema(product: Product, baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description || `${product.name} available at Nippon Lanka Marketing with easy installment plans`,
    image: product.featured_image ? `${baseUrl}${product.featured_image}` : undefined,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'Various Brands',
    },
    offers: {
      '@type': 'Offer',
      url: `${baseUrl}/products/${product.slug}`,
      priceCurrency: 'LKR',
      price: product.cash_price,
      priceValidUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 90 days from now
      availability: product.stock_status === 'in_stock' 
        ? 'https://schema.org/InStock' 
        : product.stock_status === 'pre_order'
        ? 'https://schema.org/PreOrder'
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'Nippon Lanka Marketing',
      },
    },
    sku: product.sku || product.id,
  };
}

/**
 * Generate Breadcrumb Schema (JSON-LD)
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[], baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };
}

/**
 * Generate Local Business Schema (JSON-LD) for homepage
 */
export function generateLocalBusinessSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nipponlanka.vercel.app';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': baseUrl,
    name: 'Nippon Lanka Marketing',
    description: 'Premium home appliances and furniture with easy in-house installment plans. No credit card required.',
    url: baseUrl,
    telephone: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ? `+${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}` : undefined,
    priceRange: 'LKR',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'LK',
      addressRegion: 'Western Province',
      addressLocality: 'Colombo',
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Colombo',
      },
      {
        '@type': 'City',
        name: 'Gampaha',
      },
      {
        '@type': 'City',
        name: 'Kalutara',
      },
    ],
    paymentAccepted: ['Cash', 'Installment'],
    openingHours: 'Mo-Su',
    image: `${baseUrl}/logo.png`,
  };
}

/**
 * Generate SEO-friendly product title
 */
export function generateProductTitle(product: Product): string {
  const brand = product.brand ? `${product.brand} ` : '';
  return `${brand}${product.name} - Price LKR ${product.cash_price.toLocaleString()} | Installments Available`;
}

/**
 * Generate SEO-friendly product description
 */
export function generateProductDescription(product: Product): string {
  const brand = product.brand ? `${product.brand} ` : '';
  const description = product.description || product.name;
  
  return `Buy ${brand}${product.name} at LKR ${product.cash_price.toLocaleString()} with easy ${product.installment_months}-month installment plans. ${description}. Free delivery in Western Province. No credit card required.`;
}

/**
 * Generate category page title
 */
export function generateCategoryTitle(categoryName: string): string {
  return `${categoryName} - Best Prices & Easy Installments in Sri Lanka`;
}

/**
 * Generate category page description
 */
export function generateCategoryDescription(categoryName: string): string {
  return `Shop ${categoryName.toLowerCase()} with easy installment plans in Sri Lanka. No credit card required. Free delivery in Colombo, Gampaha & Kalutara. Best prices guaranteed.`;
}
