import { PaymentPlan } from '@/shared/types/database';

interface WhatsAppMessageParams {
  productName: string;
  plan: PaymentPlan;
  location?: string;
  productUrl?: string;
}

export function generateWhatsAppLink({
  productName,
  plan,
  location = '',
  productUrl = '',
}: WhatsAppMessageParams): string {
  const businessNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '94771234567';
  
  const planText = plan === 'cash' 
    ? 'Cash Payment (20% Discount)' 
    : '12-Month Installment Plan';
  
  const locationText = location || 'Western Province';
  
  const message = `
Hi! I'm interested in purchasing:

📦 Product: ${productName}
💳 Payment Plan: ${planText}
📍 Delivery Location: ${locationText}

${productUrl ? `🔗 Product Link: ${productUrl}` : ''}

Please provide more details about the purchase process.
  `.trim();
  
  return `https://wa.me/${businessNumber}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(params: WhatsAppMessageParams) {
  const link = generateWhatsAppLink(params);
  window.open(link, '_blank');
}
