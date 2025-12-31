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
            .select('*, categories:category_id(name), segments:segment_id(name)')
            .eq('id', id)
            .single();

        if (error) return null;
        return {
            ...data,
            category: data.categories?.name || '',
            segment: data.segments?.name || ''
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
    },
    submitEnquiry: async (enquiryData) => {
        const payload = { ...enquiryData, status: 'New' };
        if (!payload.created_at) delete payload.created_at;
        const { data, error } = await supabase.from('enquiries').insert([payload]).select().single();
        if (error) throw error;
        return data;
    },

    // --- Enquiries ---
    getEnquiries: async () => {
        const { data, error } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false });
        if (error) return [];
        return data;
    },

    updateEnquiryStatus: async (id, status) => {
        const { error } = await supabase.from('enquiries').update({ status }).eq('id', id);
        if (error) throw error;
        return true;
    },

    deleteEnquiry: async (id) => {
        const { error } = await supabase.from('enquiries').delete().eq('id', id);
        if (error) throw error;
        return true;
    },

    // --- Certificates ---
    // getCertificates already exists (public read)
    getCertificates: async () => {
        const { data, error } = await supabase.from('certificates').select('*');
        if (error) return [];
        return data;
    },

    getCertificate: async (id) => {
        const { data, error } = await supabase.from('certificates').select('*').eq('id', id).single();
        if (error) return null;
        return data;
    },

    createCertificate: async (certData) => {
        const payload = { ...certData };
        if (!payload.id) delete payload.id;
        const { data, error } = await supabase.from('certificates').insert([payload]).select().single();
        if (error) throw error;
        return data;
    },

    updateCertificate: async (id, updates) => {
        const { data, error } = await supabase.from('certificates').update(updates).eq('id', id).select().single();
        if (error) throw error;
        return data;
    },

    deleteCertificate: async (id) => {
        const { error } = await supabase.from('certificates').delete().eq('id', id);
        if (error) throw error;
        return true;
    },

    // --- Settings & Pages ---
    getSettings: async () => {
        const { data, error } = await supabase.from('settings').select('data').eq('id', 1).single();
        if (error) return {};
        return data?.data || {};
    },

    saveSettings: async (settingsData) => {
        const { error } = await supabase.from('settings').upsert({ id: 1, data: settingsData });
        if (error) throw error;
        return true;
    },

    savePageContent: async (pageSlug, content) => {
        const { error } = await supabase.from('pages').upsert({ slug: pageSlug, content });
        if (error) throw error;
        return true;
    },

    // --- Stats ---
    getStats: async () => {
        const { count: products } = await supabase.from('products').select('*', { count: 'exact', head: true });
        const { count: categories } = await supabase.from('categories').select('*', { count: 'exact', head: true });
        const { count: certificates } = await supabase.from('certificates').select('*', { count: 'exact', head: true });
        const { count: enquiries } = await supabase.from('enquiries').select('*', { count: 'exact', head: true });

        return {
            products: products || 0,
            categories: categories || 0,
            certificates: certificates || 0,
            enquiries: enquiries || 0,
            visits: 1250, // Mock visits
            sales: 0 // No sales yet
        };
    },

    // --- Admin Product CRUD ---
    saveProduct: async (productData) => {
        const payload = { ...productData };
        // Remove UI-only fields or derived fields
        delete payload.category;
        delete payload.segment;
        delete payload.subCategory; // Legacy

        // Clean ID
        if (!payload.id) delete payload.id;

        const { data, error } = await supabase
            .from('products')
            .upsert(payload)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    deleteProduct: async (id) => {
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (error) throw error;
        return true;
    },

    // --- Variants ---
    getVariants: async (product_id) => {
        const { data, error } = await supabase
            .from('variants')
            .select('*')
            .eq('product_id', product_id);

        if (error) {
            console.error('Error fetching variants:', error);
            return [];
        }
        return data;
    },

    saveVariant: async (variantData) => {
        const payload = { ...variantData };
        // Check for temp IDs (integers from Date.now())
        if (typeof payload.id === 'number' || !payload.id) delete payload.id;

        const { data, error } = await supabase
            .from('variants')
            .upsert(payload)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    deleteVariant: async (id) => {
        const { error } = await supabase.from('variants').delete().eq('id', id);
        if (error) throw error;
        return true;
    },

    // --- Activity Log ---
    logActivity: async (user, action, target, details) => {
        /*
          Params:
          user: string (email or name)
          action: string (Created, Updated, Deleted)
          target: string (Product: XYZ)
          details: string (More info)
        */
        const { error } = await supabase.from('activity_logs').insert([{
            user_email: user,
            action,
            target,
            details
        }]);
        if (error) console.error('Error logging activity:', error);
    }
};
