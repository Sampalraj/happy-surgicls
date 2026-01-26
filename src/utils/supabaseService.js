import { supabase } from '../lib/supabase';

// Helper to map DB snake_case to app camelCase if needed, 
// but we tried to keep schema aligned.

export const supabaseService = {
    // --- Users (Profiles) ---
    getUsers: async () => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) {
            console.error('Error fetching users:', error);
            return [];
        }
        // Map to UI format
        return data.map(u => ({
            id: u.id,
            name: u.full_name || u.email,
            email: u.email,
            role_id: u.role,
            status: u.status,
            last_login: u.updated_at
        }));
    },

    updateUser: async (id, updates) => {
        const payload = {
            role: updates.role_id,
            status: updates.status,
            full_name: updates.name
        };
        Object.keys(payload).forEach(key => payload[key] === undefined && delete payload[key]);

        const { data, error } = await supabase
            .from('profiles')
            .update(payload)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    deleteUser: async (id) => {
        const { error } = await supabase
            .from('profiles')
            .update({ status: 'Inactive' })
            .eq('id', id);

        if (error) throw error;
        return true;
    },

    getRoles: async () => {
        return [
            { id: 'admin', name: 'Super Admin' },
            { id: 'editor', name: 'Editor' },
            { id: 'viewer', name: 'Viewer' }
        ];
    },

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
            .select(`
                *,
                categories:category_id(name),
                segments:segment_id(name),
                product_certificates(certificate_id)
            `)
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error inside getProduct:', error);
            return null;
        }

        console.log('Fetched Product Schema:', data);

        // Transform for UI
        return {
            ...data,
            category: data.categories?.name || '',
            category: data.categories?.name || '',
            segment: data.segments?.name || '',
            shortDescription: data.short_description || '', // Map DB snake_case to UI camelCase
            // Flatten [{certificate_id: '...'}] to ['...', '...']
            certificate_ids: data.product_certificates?.map(pc => pc.certificate_id) || [],
            features: data.specifications || [] // Map DB 'specifications' to UI 'features'
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

    // getCertificates moved to Certificates section to avoid duplicate key
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

        // Extract certificates to handle separately
        const certificateIds = payload.certificate_ids || [];

        // Map UI 'features' back to DB 'specifications'
        if (payload.features) {
            payload.specifications = payload.features;
            delete payload.features;
        }

        if (payload.shortDescription) {
            payload.short_description = payload.shortDescription;
            delete payload.shortDescription;
        }

        // Remove UI-only fields, derived fields, and relational arrays
        delete payload.category;
        delete payload.segment;
        delete payload.subCategory; // Legacy
        delete payload.certificate_ids; // Do NOT save to products table
        delete payload.variants; // Handled separately if passed

        // --- COMPATIBILITY RESTORED ---
        // The SQL script 'supabase_fix_full.sql' adds these columns.
        // We now allow these fields to be sent to the database.

        // delete payload.description;
        // delete payload.short_description;
        // delete payload.specifications;
        // delete payload.code; // SKU
        // delete payload.inherit_certificates;
        // delete payload.is_active;
        // delete payload.img;
        // ----------------------------------------------------------------

        // Clean ID
        if (!payload.id) delete payload.id;

        let savedProduct;

        // 1. Save Product Details
        if (payload.id) {
            // UPDATE
            const { data, error } = await supabase
                .from('products')
                .update(payload)
                .eq('id', payload.id)
                .select()
                .single();

            if (error) throw error;
            savedProduct = data;
        } else {
            // INSERT
            const { data, error } = await supabase
                .from('products')
                .insert([payload])
                .select()
                .single();

            if (error) throw error;
            savedProduct = data;
        }

        // 2. Handle Certificates (Junction Table)
        // We only update certificates if the product save was successful
        if (savedProduct) {
            // A. Remove existing mappings for this product
            const { error: deleteError } = await supabase
                .from('product_certificates')
                .delete()
                .eq('product_id', savedProduct.id);

            if (deleteError) console.error("Error clearing old certificates:", deleteError);

            // B. Insert new mappings if any selected
            if (certificateIds.length > 0) {
                const certRows = certificateIds.map(certId => ({
                    product_id: savedProduct.id,
                    certificate_id: certId
                }));

                const { error: insertError } = await supabase
                    .from('product_certificates')
                    .insert(certRows);

                if (insertError) throw insertError;
            }
        }

        return savedProduct;
    },

    deleteProduct: async (id) => {
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (error) throw error;
        return true;
    },

    // --- Variants ---
    getVariants: async (product_id) => {
        const { data, error } = await supabase
            .from('product_variants')
            .select('*')
            .eq('product_id', product_id);

        if (error) {
            console.error('Error fetching product:', error);
            return null; // Return null on error
        }
        console.log('Fetched Product Schema:', data);
        return data;
    },

    saveVariant: async (variantData) => {
        const payload = { ...variantData };
        // Check for temp IDs (integers from Date.now())
        if (typeof payload.id === 'number' || !payload.id) delete payload.id;

        const { data, error } = await supabase
            .from('product_variants')
            .upsert(payload)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    deleteVariant: async (id) => {
        const { error } = await supabase.from('product_variants').delete().eq('id', id);
        if (error) throw error;
        return true;
    },

    // --- Logs ---
    logActivity: async (user, action, target, details) => {
        const payload = {
            user_email: user,
            action,
            target,
            details
        };
        const { error } = await supabase.from('audit_logs').insert([payload]);
        if (error) console.error('Error logging activity:', error);
    },

    getLogs: async () => {
        const { data, error } = await supabase.from('audit_logs').select('*').order('created_at', { ascending: false });
        if (error) {
            console.error('Error fetching logs:', error);
            return [];
        }
        return data.map(log => ({
            ...log,
            timestamp: log.created_at, // Map for UI consistency
            user: log.user_email || 'System'
        }));
    },
};
