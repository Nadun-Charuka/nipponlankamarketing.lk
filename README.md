# 🏠 NipponLankaMarketing.lk

Premium home appliances & furniture e-commerce platform with **in-house installments**, **dual-pricing model**, and **WhatsApp-based checkout** for Western Province, Sri Lanka.

---

## 🎯 Business Model

### The "No-Card" Advantage
- **In-house Installments** - No credit card or Koko required
- **Dual-Pricing Model** - 20% discount on cash payments OR easy 12-month installments
- **Western Province Only** - 100% Free delivery in Colombo, Gampaha, and Kalutara
- **WhatsApp Checkout** - All orders processed through WhatsApp Business

---

## 🚀 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4 (Light Purple Theme)
- **UI Components:** Shadcn/UI (Customized)
- **Animations:** Framer Motion
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth (Google OAuth)
- **Storage:** Supabase Storage
- **Deployment:** Vercel (Recommended)

---

## 📁 Project Structure (Feature-Sliced Design)

```
nipponlanka/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout with fonts & SEO
│   │   ├── page.tsx            # Homepage
│   │   ├── products/           # Product pages
│   │   ├── category/           # Category pages
│   │   └── admin/              # Admin dashboard
│   ├── features/               # Feature modules
│   │   ├── catalog/            # Product catalog & grid
│   │   ├── pricing/            # Dual-pricing components
│   │   ├── whatsapp/           # WhatsApp integration
│   │   ├── search/             # Global search
│   │   └── admin/              # Admin components
│   ├── shared/                 # Shared utilities
│   │   ├── ui/                 # Shadcn components
│   │   ├── lib/                # Utilities & Supabase clients
│   │   └── types/              # TypeScript types
│   └── styles/
│       └── globals.css         # Global styles & glassmorphism
├── supabase-schema.sql         # Database schema
└── public/                     # Static assets
```

---

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the example file and fill in your credentials:

```bash
cp .env.local.example .env.local
```

Required variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_WHATSAPP_NUMBER=94771234567
```

### 3. Set Up Supabase Database

1. Create a new Supabase project at [app.supabase.com](https://app.supabase.com)
2. Go to **SQL Editor** in your Supabase dashboard
3. Copy the contents of `supabase-schema.sql`
4. Paste and run the SQL script
5. Verify tables are created: `products`, `categories`, `admin_users`

### 4. Add Admin User

In Supabase SQL Editor, add your email as an admin:

```sql
INSERT INTO admin_users (email, role) VALUES
  ('your-email@gmail.com', 'super_admin');
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## 🎨 Design System

### Color Palette (Light Purple Theme)

- **Primary:** `#A855F7` (Purple-500)
- **Accent Purple:** `#E0B0FF`
- **Accent Lavender:** `#E6E6FA`
- **Background:** `#FFFFFF`
- **Muted:** `#F1F5F9`

### Typography

- **Sans:** Inter (Body text)
- **Display:** Outfit (Headings)

### Glassmorphism Utilities

```css
.glass          /* Light glassmorphism */
.glass-strong   /* Stronger glassmorphism */
```

---

## 💰 Dual-Pricing Logic

The pricing model is implemented at the **database level** for consistency:

```sql
-- Base price is the installment price
base_price DECIMAL(10, 2) NOT NULL,

-- Cash price is automatically calculated (20% discount)
cash_price DECIMAL(10, 2) GENERATED ALWAYS AS (base_price * 0.80) STORED,
```

**Example:**
- Base Price (Installment): Rs. 100,000
- Cash Price (Auto-calculated): Rs. 80,000 (20% OFF)
- Monthly Installment: Rs. 8,333 (100,000 ÷ 12 months)

---

## 📱 WhatsApp Integration

### Message Template

When a user clicks "Order via WhatsApp", they get a pre-filled message:

```
Hi! I'm interested in purchasing:

📦 Product: Samsung 55" 4K Smart TV
💳 Payment Plan: 12-Month Installment Plan
📍 Delivery Location: Colombo 7

🔗 Product Link: https://nipponlankamarketing.lk/products/...

Please provide more details about the purchase process.
```

### Configuration

Set your WhatsApp Business number in `.env.local`:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=94771234567
```

---

## 🔍 Search Functionality

Full-text search powered by PostgreSQL's `tsvector`:

```typescript
const { data } = await supabase
  .from('products')
  .select('*')
  .textSearch('search_vector', query)
  .limit(10);
```

---

## 🔐 Admin Dashboard

### Access Control

1. **Authentication:** Google OAuth via Supabase Auth
2. **Authorization:** Email whitelist in `admin_users` table
3. **Route Protection:** Middleware checks on `/admin/*` routes

### Features

- ✅ Product CRUD operations
- ✅ Category management
- ✅ Image uploads (Supabase Storage)
- ✅ Stock status toggle
- ✅ Inventory dashboard

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Environment Variables for Production

```env
NEXT_PUBLIC_SUPABASE_URL=your-production-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_WHATSAPP_NUMBER=94771234567
NEXT_PUBLIC_SITE_URL=https://nipponlankamarketing.lk
```

---

## 📊 SEO Strategy

### Dynamic Metadata

Each product page generates SEO-optimized metadata:

```typescript
title: "Samsung 55\" 4K TV - Installments Colombo | Nippon Lanka"
description: "Buy Samsung 55\" 4K TV with easy installments starting at Rs. 8,333 per month. Cash price: Rs. 80,000. Free delivery in Western Province."
keywords: ["installments Sri Lanka", "no credit card", "free delivery Colombo"]
```

### Structured Data

Product schema markup for Google Rich Results:

```json
{
  "@type": "Product",
  "name": "Samsung 55\" 4K Smart TV",
  "offers": {
    "price": "80000",
    "priceCurrency": "LKR"
  }
}
```

---

## 🧪 Testing

### Build Check

```bash
npm run build
```

### Type Check

```bash
npm run type-check
```

### Lint

```bash
npm run lint
```

---

## 📝 Development Phases

- ✅ **Phase 1:** Foundation & Setup
- ⏳ **Phase 2:** Design System & Core Components
- ⏳ **Phase 3:** Product Catalog & Search
- ⏳ **Phase 4:** Product Detail Pages
- ⏳ **Phase 5:** WhatsApp Integration
- ⏳ **Phase 6:** Admin Dashboard
- ⏳ **Phase 7:** SEO & Performance
- ⏳ **Phase 8:** Testing & Deployment

---

## 🤝 Contributing

This is a private commercial project for Nippon Lanka Marketing (Pvt) Ltd.

---

## 📄 License

Proprietary - All rights reserved by Nippon Lanka Marketing (Pvt) Ltd.

---

## 📞 Support

For technical support or questions:
- **Email:** admin@nipponlanka.lk
- **WhatsApp:** +94 77 123 4567

---

**Built with ❤️ using Next.js 15 & Supabase**
