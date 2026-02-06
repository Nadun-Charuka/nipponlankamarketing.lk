export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category_id: string | null;
  
  // Pricing
  base_price: number;
  cash_price: number;
  installment_months: number;
  
  // Inventory
  stock_status: 'in_stock' | 'out_of_stock' | 'pre_order';
  sku: string | null;
  
  // Media
  images: string[];
  featured_image: string | null;
  
  // Specifications
  specifications: Record<string, string>;
  
  // SEO
  meta_title: string | null;
  meta_description: string | null;
  
  // Flags
  is_featured: boolean;
  is_active: boolean;
  
  // Timestamps
  created_at: string;
  updated_at: string;
  
  // Relations
  category?: Category;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
  description: string | null;
  image_url: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
  
  // Relations
  parent?: Category;
  children?: Category[];
}

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'super_admin';
  created_at: string;
}

export type StockStatus = 'in_stock' | 'out_of_stock' | 'pre_order';
export type PaymentPlan = 'cash' | 'installment';
