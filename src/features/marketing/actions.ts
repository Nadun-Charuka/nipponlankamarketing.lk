'use server';

import { supabase } from '@/shared/lib/supabase';
import { Review } from '@/shared/types/database';
import { revalidatePath } from 'next/cache';

export interface ReviewFormData {
  name: string;
  location: string;
  rating: number;
  text: string;
  product_name?: string;
}

export async function submitReview(data: ReviewFormData) {
  try {
    const { error } = await supabase.from('reviews').insert([
      {
        ...data,
        is_approved: true, // Auto-approve for now as requested
      },
    ]);

    if (error) {
      console.error('Error submitting review:', error);
      return { success: false, message: 'Failed to submit review. Please try again.' };
    }

    revalidatePath('/');
    return { success: true, message: 'Thank you! Your review has been submitted.' };
  } catch (err) {
    console.error('Unexpected error:', err);
    return { success: false, message: 'An unexpected error occurred.' };
  }
}

export async function getApprovedReviews(): Promise<Review[]> {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('is_approved', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }

  return data as Review[];
}
