import { supabase } from '../lib/supabase';

// Helper to map DB snake_case to app camelCase if needed, 
// but we tried to keep schema aligned.

export const supabaseService = {
    // --- Segments ---
    getSegments: async () => {
        const { data, error } = await supabase.from('segments').select('*').order('display_order', { ascending: true });
        if (error) console.error('Error fetching segments:', error);
        return data || [];
    },

    // --- Categories ---
    getCategories: async () => {
        const { data, error } = await supabase.from('categories').select('*').order('display_order', { ascending: true });
        if (error) console.error('Error fetching categories:', error);
        return data || [];
    },

    // --- Products ---
    getProducts: async () => {
        const { data, error } = await supabase.from('products').select('*').eq('is_active', true);
        if (error) console.error('Error fetching products:', error);
        return data || [];
    },

    getProduct: async (id) => {
        // ID could be UUID or old ID (code)
        // Try UUID first
        let { data, error } = await supabase.from('products').select('*').eq('id', id).single();
        if (!data) {
            // Try by code
            ({ data, error } = await supabase.from('products').select('*').eq('code', id).single());
        }
        return data || null;
    }
};
