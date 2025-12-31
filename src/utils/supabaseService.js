import { supabase } from '../lib/supabase';

// Helper to map DB snake_case to app camelCase if needed, 
// but we tried to keep schema aligned.

export const supabaseService = {
    // --- Segments ---
    // --- Segments ---
    getSegments: async () => {
        const { data, error } = await supabase.from('segments').select('*').order('display_order', { ascending: true });
        if (error) console.error('Error fetching segments:', error);
        return data || [];
    },

    createSegment: async (segmentData) => {
        // If ID is empty string or null, remove it to let DB generate UUID
        const payload = { ...segmentData };
        if (!payload.id) delete payload.id;

        const { data, error } = await supabase.from('segments').insert([payload]).select().single();
        if (error) throw error;
        return data;
    },

    updateSegment: async (id, updates) => {
        const { data, error } = await supabase.from('segments').update(updates).eq('id', id).select().single();
        if (error) throw error;
        return data;
    },

    deleteSegment: async (id) => {
        const { error } = await supabase.from('segments').delete().eq('id', id);
        if (error) throw error;
        return true;
    },

    // --- Categories ---
    getCategories: async () => {
        const { data, error } = await supabase.from('categories').select('*').order('display_order', { ascending: true });
        if (error) console.error('Error fetching categories:', error);
        return data || [];
    },

    createCategory: async (categoryData) => {
        const payload = { ...categoryData };
        if (!payload.id) delete payload.id;
        const { data, error } = await supabase.from('categories').insert([payload]).select().single();
        if (error) throw error;
        return data;
    },

    updateCategory: async (id, updates) => {
        const { data, error } = await supabase.from('categories').update(updates).eq('id', id).select().single();
        if (error) throw error;
        return data;
    },

    deleteCategory: async (id) => {
        const { error } = await supabase.from('categories').delete().eq('id', id);
        if (error) throw error;
        return true;
    },

    // --- Products ---
    getProducts: async () => {
        // Fetch products with their related category name if possible
        const { data, error } = await supabase
            .from('products')
            .select('*, categories:category_id(name)')
            .eq('is_active', true);

        if (error) {
            console.error('Error fetching products:', error);
            return [];
        }

        // Flatten the category name for easier UI consumption
        return data.map(p => ({
            ...p,
            category: p.categories?.name || p.subCategory || ''
        }));
    },

    getProduct: async (id) => {
        const { data, error } = await supabase
            .from('products')
            .select('*, categories:category_id(name)')
            .eq('id', id)
            .single();

        if (error) return null;
        return {
            ...data,
            category: data.categories?.name || ''
        };
    },

    // --- Content & Certificates ---
    getPageContent: async (pageId) => {
        const { data, error } = await supabase
            .from('pages')
            .select('content')
            .eq('slug', pageId)
            .single();

        if (error || !data) return null;
        return data.content;
    },

    getCertificates: async () => {
        const { data, error } = await supabase
            .from('certificates')
            .select('*')
            .eq('is_active', true)
            .order('display_order', { ascending: true });

        if (error) {
            console.error('Error fetching certificates:', error);
            return [];
        }
        return data;
    }
};
