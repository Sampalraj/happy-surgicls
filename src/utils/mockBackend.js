/**
 * Mock Backend Service
 * Simulates a backend using localStorage to persist data.
 */

const STORAGE_KEYS = {
    ENQUIRIES: 'surgical_enquiries',
    PRODUCTS: 'surgical_products',
    CATEGORIES: 'surgical_categories',
    SEGMENTS: 'surgical_segments', // New
    VARIANTS: 'surgical_product_variants', // New
    CERTIFICATES: 'surgical_certificates',
    ACTIVITY_LOG: 'surgical_activity_log',
    SETTINGS: 'surgical_settings',
    PAGES: 'surgical_pages',
    USERS: 'surgical_users'
};


const getStoredData = (key) => {
    const data = localStorage.getItem(key);
    try {
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error(`Error parsing data for ${key}:`, e);
        return [];
    }
};

const setStoredData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

// Seed Data
const seedData = () => {
    const currentCats = getStoredData(STORAGE_KEYS.CATEGORIES);
    const hasOldData = currentCats.some(c => c.name === 'Tables');
    const currentCerts = getStoredData(STORAGE_KEYS.CERTIFICATES);
    const currentSettings = getStoredData(STORAGE_KEYS.SETTINGS);
    const currentPages = getStoredData(STORAGE_KEYS.PAGES);
    const currentUsers = getStoredData(STORAGE_KEYS.USERS);

    const currentSegments = getStoredData(STORAGE_KEYS.SEGMENTS);
    const currentVariants = getStoredData(STORAGE_KEYS.VARIANTS);

    // Seed Segments (New Top Level)
    if (!currentSegments.length) {
        const initialSegments = [
            { id: 'seg_hc_01', name: 'Healthcare', description: 'Hospitals, clinics & nursing homes', display_order: 1, is_active: true, hero_image: 'https://images.unsplash.com/photo-1584036561566-b452ae589666?auto=format&fit=crop&q=80&w=500' },
            { id: 'seg_ind_02', name: 'Industrial Safety', description: 'Factories, laboratories & manufacturing', display_order: 2, is_active: true, hero_image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=500' },
            { id: 'seg_resp_03', name: 'Respiratory Care', description: 'ICU, respiratory therapy & oxygen', display_order: 3, is_active: true, hero_image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=500' },
            { id: 'seg_hyg_04', name: 'Personal Care & Hygiene', description: 'Home care, elder care & wellness', display_order: 4, is_active: true, hero_image: 'https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&q=80&w=500' },
            { id: 'seg_orth_05', name: 'Orthopedic & Support', description: 'Rehabilitation & injury support', display_order: 5, is_active: true, hero_image: 'https://images.unsplash.com/photo-1583912267550-d41398b11151?auto=format&fit=crop&q=80&w=500' },
            { id: 'seg_med_06', name: 'Medical Equipment', description: 'General hospital & clinical use', display_order: 6, is_active: true, hero_image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=500' },
            { id: 'seg_serv_07', name: 'Services', description: 'B2B & institutional services', display_order: 7, is_active: true, hero_image: 'https://images.unsplash.com/photo-1556740758-90de29227195?auto=format&fit=crop&q=80&w=500' }
        ];
        setStoredData(STORAGE_KEYS.SEGMENTS, initialSegments);
    }

    // Seed Categories (Linked to Segments)
    if (!currentCats.length || hasOldData) {
        // We'll clear old data structure to enforce new schema if strictly needed, 
        // but for safety in this "Task Plan", let's overwrite if empty or old format.
        const initialCategories = [
            // Healthcare
            { id: 'cat_sgm_01', segment_id: 'seg_hc_01', name: 'Surgical Gloves & Masks', display_order: 1, is_active: true, count: 0 },
            { id: 'cat_heqw_02', segment_id: 'seg_hc_01', name: 'Hospital Equipment', display_order: 2, is_active: true, count: 0 },
            { id: 'cat_mon_03', segment_id: 'seg_hc_01', name: 'Monitoring & Devices', display_order: 3, is_active: true, count: 0 },
            // Industrial
            { id: 'cat_igl_04', segment_id: 'seg_ind_02', name: 'Industrial Gloves', display_order: 1, is_active: true, count: 0 },
            { id: 'cat_prot_05', segment_id: 'seg_ind_02', name: 'Protective Wear', display_order: 2, is_active: true, count: 0 },
            // Respiratory
            { id: 'cat_oxy_06', segment_id: 'seg_resp_03', name: 'Oxygen & Nebulization', display_order: 1, is_active: true, count: 0 },
            // Personal Care
            { id: 'cat_ad_07', segment_id: 'seg_hyg_04', name: 'Diapers & Hygiene', display_order: 1, is_active: true, count: 0 },
            { id: 'cat_sani_08', segment_id: 'seg_hyg_04', name: 'Sanitation', display_order: 2, is_active: true, count: 0 },
            // Ortho
            { id: 'cat_sup_09', segment_id: 'seg_orth_05', name: 'Supports & Braces', display_order: 1, is_active: true, count: 0 },
            // Medical Eq
            { id: 'cat_cons_10', segment_id: 'seg_med_06', name: 'Consumables', display_order: 1, is_active: true, count: 0 },
            // Services
            { id: 'cat_rent_11', segment_id: 'seg_serv_07', name: 'Rental & Supply Services', display_order: 1, is_active: true, count: 0 }
        ];
        setStoredData(STORAGE_KEYS.CATEGORIES, initialCategories);

        // Seed Products (Linked to Segment & Category)
        const initialProducts = [
            {
                id: 'prod_101', segment_id: 'seg_hc_01', category_id: 'cat_sgm_01',
                name: 'Nitrile Blue Surgical Hand Gloves',
                short_description: 'High sensitivity blue nitrile gloves.',
                material: 'Nitrile', usage_type: 'Medical',
                is_active: true, img: 'https://images.unsplash.com/photo-1584036561566-b452ae589666?auto=format&fit=crop&q=80&w=400',
                features: ['Powder-Free', 'Disposable']
            },
            {
                id: 'prod_102', segment_id: 'seg_med_06', category_id: 'cat_heqw_02',
                name: 'Hydraulic OT Table',
                short_description: 'Heavy duty hydraulic operation table.',
                material: 'Steel', usage_type: 'Medical',
                is_active: true, img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400',
                features: ['Adjustable', 'Hydraulic']
            },
            {
                id: 'prod_103', segment_id: 'seg_resp_03', category_id: 'cat_oxy_06',
                name: 'Nebulizer Machine',
                short_description: 'Portable electric nebulizer.',
                material: 'Plastic', usage_type: 'Medical',
                is_active: true, img: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=400',
                features: ['Low Noise', 'Portable']
            }
        ];
        setStoredData(STORAGE_KEYS.PRODUCTS, initialProducts);

        // Seed Variants (New)
        const initialVariants = [
            { id: 'var_1', product_id: 'prod_101', size: 'S', color: 'Blue', material: 'Nitrile', is_active: true },
            { id: 'var_2', product_id: 'prod_101', size: 'M', color: 'Blue', material: 'Nitrile', is_active: true },
            { id: 'var_3', product_id: 'prod_101', size: 'L', color: 'Blue', material: 'Nitrile', is_active: true },
        ];
        setStoredData(STORAGE_KEYS.VARIANTS, initialVariants);
    }

    // Seed Certificates if empty
    if (!currentCerts.length) {
        const initialCerts = [
            { id: 'c1', name: 'ISO 13485:2016', issuer: 'TUV Nord', expiry: '2025-12-31', status: 'Active' },
            { id: 'c2', name: 'CE Certification', issuer: 'EuroCert', expiry: '2024-06-30', status: 'Expiring' }
        ];
        setStoredData(STORAGE_KEYS.CERTIFICATES, initialCerts);
    }

    // Seed Global Settings (New)
    if (!currentSettings || Object.keys(currentSettings).length === 0) {
        const initialSettings = {
            siteName: 'Happy Surgicals',
            logo: '',
            email: 'sales@happysurgicals.com',
            phone: '+91 98765 43210',
            footerDesc: 'Your trusted partner for high-quality medical supplies and hospital equipment. ISO 13485:2016 Certified.',
            address: '123, Medical Park, Industrial Area, New Delhi - 110020',
            socials: {
                facebook: 'https://facebook.com',
                twitter: 'https://twitter.com',
                linkedin: 'https://linkedin.com',
                instagram: 'https://instagram.com'
            }
        };
        setStoredData(STORAGE_KEYS.SETTINGS, initialSettings);
    }


    // Seed Page Content (New)
    if (!currentPages || Object.keys(currentPages).length === 0) {
        const initialPages = {
            home: {
                heroTitle: 'Premium Medical Equipment Manufacturer',
                heroSubtitle: 'ISO 13485:2016 Certified | Global Exporter | Trusted by 500+ Hospitals',
                stats: { experience: '25+', products: '500+', clients: '1000+' },
                features: [
                    { title: 'Global Standards', desc: 'ISO certified manufacturing processes.' },
                    { title: '24/7 Support', desc: 'Dedicated technical support team.' },
                    { title: 'Fast Delivery', desc: 'Efficient logistics network worldwide.' }
                ]
            },
            about: {
                title: 'About Happy Surgicals',
                subtitle: 'Pioneering Excellence in Medical Technology Since 1998',
                content: 'Happy Surgicals is a leading manufacturer and exporter of high-quality medical and hospital equipment. With over two decades of experience, we have established ourselves as a trusted name in the healthcare industry, known for our commitment to quality, innovation, and customer satisfaction.',
                mission: 'To provide world-class medical solutions that improve patient outcomes and healthcare delivery globally.',
                vision: 'To be the most preferred partner for healthcare institutions worldwide through innovation and reliability.',
                image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000',
                coreValues: [
                    { title: 'Quality', desc: 'Quality is First In Everything We Do.' },
                    { title: 'Commitment', desc: 'Adherence to Best Products & Services.' },
                    { title: 'Performance', desc: 'Creating success via results-driven plans.' },
                    { title: 'Safety', desc: 'Ensuring Safety above all else.' }
                ],
                diagram: {
                    title: 'How Are We Different?',
                    philosophy: 'Customer centric approach in everything we do.',
                    whatWeDo: 'Supplying premium quality medical equipment.'
                }
            },
            contact: {
                title: 'Get in Touch',
                subtitle: 'We are here to help you with your medical equipment needs',
                mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.943929457788!2d77.0678563150821!3d28.60156398243003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1b3796d19bb1%3A0xe5a3c988c5d80b4d!2sHappy%20Surgicals!5e0!3m2!1sen!2sin!4v1647856642158!5m2!1sen!2sin',
                contactInfo: {
                    address: 'Happy Surgical Industry\nSambrial, Sialkot\nPakistan 51310',
                    email: 'info@happysurgicals.com\nsales@happysurgicals.com',
                    phone: '+92 300 1234567\n+1 555 0123 456'
                }
            },
            manufacturing: {
                title: 'State-of-the-Art Manufacturing',
                subtitle: 'Precision Engineering meets Medical Safety',
                content: 'Our manufacturing facility spans 50,000 sq. ft. and is equipped with the latest CNC machines, laser cutters, and automated assembly lines. We follow strict quality control protocols at every stage of production.',
                facilities: [
                    { title: 'CNC Machining', desc: 'High precision components production' },
                    { title: 'Laser Cutting', desc: 'Accurate metal fabrication' },
                    { title: 'Sterilization Unit', desc: 'Post-production sterilization' }
                ],
                image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000'
            },
            services: {
                title: 'Our Services',
                subtitle: 'Comprehensive Support for Your Healthcare Facility',
                items: [
                    { title: 'Equipment Installation', desc: 'Professional installation by certified engineers' },
                    { title: 'Annual Maintenance', desc: 'Regular checkups and preventive maintenance' },
                    { title: 'Staff Training', desc: 'Operational training for hospital staff' },
                    { title: 'Technical Support', desc: '24/7 remote and on-site assistance' }
                ]
            }
        };
        setStoredData(STORAGE_KEYS.PAGES, initialPages);
    }

    // Seed Users (New)
    const users = currentUsers || [];
    const myAdminEmail = 'sampalraj2001@gmail.com';
    const myAdminUser = { id: 'u_custom', name: 'Sampalraj', email: myAdminEmail, role: 'Super Admin', password: 'Sblove@0321' };

    if (!users.find(u => u.email === myAdminEmail)) {
        // Add or ensure user exists
        users.push(myAdminUser);
        setStoredData(STORAGE_KEYS.USERS, users);
    } else if (users.length === 0) {
        // Initial seed fallback
        const initialUsers = [
            myAdminUser,
            { id: 'u2', name: 'Content Editor', email: 'editor@happysurgicals.com', role: 'Editor', password: 'editor' }
        ];
        setStoredData(STORAGE_KEYS.USERS, initialUsers);
    }
};

// ...

export const mockBackend = {
    // --- AUTHENTICATION ---
    login: (email, password) => {
        const users = getStoredData(STORAGE_KEYS.USERS);
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            // "Session" is just returning the user object to store in app state/localstorage
            const { password, ...safeUser } = user; // Exclude password
            mockBackend.logActivity(safeUser.name, 'Login', 'System', 'User logged in');
            return safeUser;
        }
        return null;
    },

    // ... existing methods ...

    // --- SETTINGS ---
    getSettings: () => getStoredData(STORAGE_KEYS.SETTINGS),

    saveSettings: (settings) => {
        setStoredData(STORAGE_KEYS.SETTINGS, settings);
        mockBackend.logActivity('Admin', 'Updated', 'Global Settings', 'Site configuration changed');
        return settings;
    },

    // --- PAGES ---
    getPageContent: (pageKey) => {
        const pages = getStoredData(STORAGE_KEYS.PAGES);
        return pages[pageKey] || {};
    },

    savePageContent: (pageKey, content) => {
        const pages = getStoredData(STORAGE_KEYS.PAGES);
        pages[pageKey] = content;
        setStoredData(STORAGE_KEYS.PAGES, pages);
        mockBackend.logActivity('Admin', 'Updated', `Page Content: ${pageKey}`, 'Content updated');
        return content;
    },

    getAllPages: () => getStoredData(STORAGE_KEYS.PAGES),

    // --- ENQUIRIES --- (keep existing)
    deleteEnquiry: (id) => {
        const enquiries = getStoredData(STORAGE_KEYS.ENQUIRIES);
        const filtered = enquiries.filter(e => e.id !== id);
        setStoredData(STORAGE_KEYS.ENQUIRIES, filtered);
        return filtered;
    },

    // --- PRODUCTS ---
    getProducts: () => getStoredData(STORAGE_KEYS.PRODUCTS),

    getProduct: (id) => {
        const products = getStoredData(STORAGE_KEYS.PRODUCTS);
        return products.find(p => p.id === id);
    },

    saveProduct: (data) => {
        const products = getStoredData(STORAGE_KEYS.PRODUCTS);
        if (data.id) {
            // Update
            const updated = products.map(p => p.id === data.id ? { ...p, ...data } : p);
            setStoredData(STORAGE_KEYS.PRODUCTS, updated);
            return data;
        } else {
            // Create
            const newProduct = { ...data, id: Date.now().toString() };
            products.unshift(newProduct);
            setStoredData(STORAGE_KEYS.PRODUCTS, products);
            mockBackend.logActivity('Admin', 'Created', `Product: ${data.name}`, 'Product created');
            return newProduct;
        }
    },

    deleteProduct: (id) => {
        const products = getStoredData(STORAGE_KEYS.PRODUCTS);
        const product = products.find(p => p.id === id);
        const filtered = products.filter(p => p.id !== id);
        setStoredData(STORAGE_KEYS.PRODUCTS, filtered);
        mockBackend.logActivity('Admin', 'Deleted', `Product: ${product ? product.name : id}`, 'Product deleted');
        return filtered;
    },

    // --- CATEGORIES ---
    getCategories: () => getStoredData(STORAGE_KEYS.CATEGORIES),

    saveCategory: (data) => {
        const categories = getStoredData(STORAGE_KEYS.CATEGORIES);
        if (data.id) {
            // Update
            const updated = categories.map(c => c.id === data.id ? { ...c, ...data } : c);
            setStoredData(STORAGE_KEYS.CATEGORIES, updated);
            mockBackend.logActivity('Admin', 'Updated', `Category: ${data.name}`, 'Category updated');
            return data;
        } else {
            // Create
            const newCat = { ...data, id: 'cat_' + Date.now().toString() };
            categories.push(newCat);
            setStoredData(STORAGE_KEYS.CATEGORIES, categories);
            mockBackend.logActivity('Admin', 'Created', `Category: ${data.name}`, 'Category created');
            return newCat;
        }
    },

    deleteCategory: (id) => {
        const categories = getStoredData(STORAGE_KEYS.CATEGORIES);
        const filtered = categories.filter(c => c.id !== id);
        setStoredData(STORAGE_KEYS.CATEGORIES, filtered);
        return filtered;
    },

    // --- SEGMENTS (New) ---
    getSegments: () => getStoredData(STORAGE_KEYS.SEGMENTS),

    saveSegment: (data) => {
        const segments = getStoredData(STORAGE_KEYS.SEGMENTS);
        if (data.id) {
            const updated = segments.map(s => s.id === data.id ? { ...s, ...data } : s);
            setStoredData(STORAGE_KEYS.SEGMENTS, updated);
            return data;
        } else {
            const newSeg = { ...data, id: 'seg_' + Date.now().toString() };
            segments.push(newSeg);
            setStoredData(STORAGE_KEYS.SEGMENTS, segments);
            return newSeg;
        }
    },

    deleteSegment: (id) => {
        const segments = getStoredData(STORAGE_KEYS.SEGMENTS);
        const filtered = segments.filter(s => s.id !== id);
        setStoredData(STORAGE_KEYS.SEGMENTS, filtered);
        return filtered;
    },

    // --- VARIANTS (New) ---
    getVariants: (productId) => {
        const variants = getStoredData(STORAGE_KEYS.VARIANTS);
        return productId ? variants.filter(v => v.product_id === productId) : variants;
    },

    saveVariant: (data) => {
        // Seed Roles & Users
        const currentRoles = getStoredData(STORAGE_KEYS.ROLES || 'surgical_roles');
        if (!currentRoles || !currentRoles.length) {
            const roles = [
                { id: 'role_admin', name: 'Super Admin', permissions: ['all'] },
                { id: 'role_manager', name: 'Product Manager', permissions: ['products', 'categories', 'segments'] },
                { id: 'role_viewer', name: 'Viewer', permissions: ['read_only'] }
            ];
            setStoredData('surgical_roles', roles);
        }

        const dataUsers = getStoredData(STORAGE_KEYS.USERS);
        if (!dataUsers || !dataUsers.length) {
            const users = [
                {
                    id: 'user_001',
                    name: 'Admin User',
                    email: 'admin@happysurgicals.com',
                    password: 'admin',
                    role_id: 'role_admin',
                    status: 'Active',
                    last_login: new Date().toISOString()
                }
            ];
            setStoredData(STORAGE_KEYS.USERS, users);
        }
        const variants = getStoredData(STORAGE_KEYS.VARIANTS);
        if (data.id) {
            const updated = variants.map(v => v.id === data.id ? { ...v, ...data } : v);
            setStoredData(STORAGE_KEYS.VARIANTS, updated);
            return data;
        } else {
            const newVar = { ...data, id: 'var_' + Date.now().toString() };
            variants.push(newVar);
            setStoredData(STORAGE_KEYS.VARIANTS, variants);
            return newVar;
        }
    },

    deleteVariant: (id) => {
        const variants = getStoredData(STORAGE_KEYS.VARIANTS);
        const filtered = variants.filter(v => v.id !== id);
        setStoredData(STORAGE_KEYS.VARIANTS, filtered);
        return filtered;
    },

    // --- USERS CRUD ---
    getUsers: () => getStoredData(STORAGE_KEYS.USERS),

    saveUser: (data) => {
        const users = getStoredData(STORAGE_KEYS.USERS);
        if (data.id) {
            const updated = users.map(u => u.id === data.id ? { ...u, ...data } : u);
            setStoredData(STORAGE_KEYS.USERS, updated);
            return data;
        } else {
            const newUser = { ...data, id: 'user_' + Date.now(), last_login: null };
            users.push(newUser);
            setStoredData(STORAGE_KEYS.USERS, users);
            return newUser;
        }
    },

    deleteUser: (id) => {
        const users = getStoredData(STORAGE_KEYS.USERS);
        const filtered = users.filter(u => u.id !== id);
        setStoredData(STORAGE_KEYS.USERS, filtered);
    },

    getRoles: () => getStoredData('surgical_roles') || [],

    validateUser: (email, password) => {
        const users = getStoredData(STORAGE_KEYS.USERS);
        const user = users.find(u => u.email === email && u.password === password);
        if (user && user.status === 'Active') {
            // Update last login
            const updated = users.map(u => u.id === user.id ? { ...u, last_login: new Date().toISOString() } : u);
            setStoredData(STORAGE_KEYS.USERS, updated);
            return user;
        }
        return null;
    },

    // --- SETTINGS & PAGES ---
    getPages: () => getStoredData(STORAGE_KEYS.PAGES),
    savePage: (data) => {
        const pages = getStoredData(STORAGE_KEYS.PAGES);
        const existingIndex = pages.findIndex(p => p.id === data.id);
        if (existingIndex >= 0) {
            pages[existingIndex] = { ...pages[existingIndex], ...data };
        } else {
            pages.push(data);
        }
        setStoredData(STORAGE_KEYS.PAGES, pages);
    },

    // --- DASHBOARD ---
    getStats: () => {
        const enquiries = getStoredData(STORAGE_KEYS.ENQUIRIES);
        const products = getStoredData(STORAGE_KEYS.PRODUCTS);
        const categories = getStoredData(STORAGE_KEYS.CATEGORIES);
        const certificates = getStoredData(STORAGE_KEYS.CERTIFICATES);
        return {
            totalEnquiries: enquiries.length,
            newEnquiries: enquiries.filter(e => e.status === 'New').length,
            products: products.length,
            categories: categories.length,
            certificates: certificates.length
        };
    },

    saveAccessRequest: (data) => {
        // In a real app, this would save to a pending approvals table
        console.log("Access Request Received:", data);

        // Log to activity for demo
        const logs = getStoredData(STORAGE_KEYS.ACTIVITY_LOG);
        logs.push({
            id: Date.now(),
            user: "System",
            action: "Access Request",
            target: "User Registration",
            details: `Request from ${data.name} (${data.email}) - ${data.role}`,
            timestamp: new Date().toISOString()
        });
        setStoredData(STORAGE_KEYS.ACTIVITY_LOG, logs);

        return { success: true, message: "Request queued for approval" };
    },

    // --- DASHBOARD STATS ---
    getDashboardStats: () => {
        const products = getStoredData(STORAGE_KEYS.PRODUCTS);
        const enquiries = getStoredData(STORAGE_KEYS.ENQUIRIES);
        const pendingEnquiries = enquiries.filter(e => e.status === 'New').length;

        return {
            totalProducts: products.length,
            activeProducts: products.filter(p => p.is_active !== false).length,
            totalEnquiries: enquiries.length,
            pendingEnquiries,
            todayVisits: 142, // Mock hardcoded for now
            conversionRate: '3.2%'
        };
    },

    // --- CERTIFICATES ---
    getCertificates: () => getStoredData(STORAGE_KEYS.CERTIFICATES),

    getCertificate: (id) => {
        const certificates = getStoredData(STORAGE_KEYS.CERTIFICATES);
        return certificates.find(c => c.id === id);
    },

    saveCertificate: (data) => {
        const certificates = getStoredData(STORAGE_KEYS.CERTIFICATES);
        if (data.id) {
            // Update
            const updated = certificates.map(c => c.id === data.id ? { ...c, ...data, updated_at: new Date().toISOString() } : c);
            setStoredData(STORAGE_KEYS.CERTIFICATES, updated);
            return data;
        } else {
            // Create
            const newCert = {
                ...data,
                id: Date.now().toString(),
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };
            certificates.push(newCert);
            setStoredData(STORAGE_KEYS.CERTIFICATES, certificates);
            return newCert;
        }
    },

    checkCertificateUsage: (certId) => {
        const categories = getStoredData(STORAGE_KEYS.CATEGORIES);
        const products = getStoredData(STORAGE_KEYS.PRODUCTS);

        // Check which categories use this certificate
        const usedByCategories = categories.filter(cat => {
            const certs = mockBackend.getCertificatesForCategory(cat.id);
            return certs.some(c => c.id === certId);
        });

        // Check which products explicitly use this certificate (override mode)
        const usedByProducts = products.filter(p =>
            p.inherit_certificates === false &&
            p.certificate_ids &&
            p.certificate_ids.includes(certId)
        );

        return {
            inUse: usedByCategories.length > 0 || usedByProducts.length > 0,
            categories: usedByCategories.map(c => c.name),
            products: usedByProducts.map(p => p.name)
        };
    },

    deleteCertificate: (id) => {
        const certificates = getStoredData(STORAGE_KEYS.CERTIFICATES);
        const filtered = certificates.filter(c => c.id !== id);
        setStoredData(STORAGE_KEYS.CERTIFICATES, filtered);
        return filtered;
    },

    getCertificatesForCategory: (categoryId) => {
        const certificates = getStoredData(STORAGE_KEYS.CERTIFICATES);
        // Find active certificates that include this categoryId in their list
        return certificates.filter(c =>
            c.status === 'Active' &&
            c.category_ids &&
            c.category_ids.includes(categoryId)
        );
    },

    getEffectiveCertificates: (product) => {
        if (!product) return [];

        // Default to inheritance = true if undefined
        const inherit = product.inherit_certificates !== false;

        if (inherit) {
            const categories = getStoredData(STORAGE_KEYS.CATEGORIES);
            // Match by Name as that is what is stored in product.category
            const cat = categories.find(c => c.name === product.category);
            if (!cat) return [];

            // Re-use logic (internal call requires access to self, or just duplicate logic)
            // Simpler to just duplicate the filter logic to avoid 'this' issues in simple object
            const certificates = getStoredData(STORAGE_KEYS.CERTIFICATES);
            return certificates.filter(c =>
                c.status === 'Active' &&
                c.category_ids &&
                c.category_ids.includes(cat.id)
            );
        } else {
            // Return specific certs
            const allCerts = getStoredData(STORAGE_KEYS.CERTIFICATES);
            const ids = product.certificate_ids || [];
            return allCerts.filter(c => ids.includes(c.id) && c.status === 'Active');
        }
    },

    // --- SEARCH ---
    searchAdmin: (query) => {
        if (!query) return [];
        const q = query.toLowerCase();
        const results = [];

        // Search Products
        const products = getStoredData(STORAGE_KEYS.PRODUCTS);
        products.forEach(p => {
            if (p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) {
                results.push({ type: 'Product', title: p.name, subtitle: p.category, link: `/admin/products/edit/${p.id}` });
            }
        });

        // Search Pages
        const pages = getStoredData(STORAGE_KEYS.PAGES);
        Object.entries(pages).forEach(([key, data]) => {
            if (key.includes(q)) {
                results.push({ type: 'Page', title: key.charAt(0).toUpperCase() + key.slice(1), subtitle: 'Page Content', link: `/admin/pages` });
            }
        });

        // Search Enquiries
        const enquiries = getStoredData(STORAGE_KEYS.ENQUIRIES);
        enquiries.forEach(e => {
            if (e.name.toLowerCase().includes(q) || e.email.toLowerCase().includes(q)) {
                results.push({ type: 'Enquiry', title: e.name, subtitle: e.email, link: `/admin/enquiries` });
            }
        });

        return results;
    },

    // --- ACTIVITY LOG ---
    getLogs: () => {
        const logs = getStoredData(STORAGE_KEYS.ACTIVITY_LOG);
        return logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    },

    logActivity: (user, action, target, details) => {
        const logs = getStoredData(STORAGE_KEYS.ACTIVITY_LOG);
        const newLog = {
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            user: user || 'Admin', // Default to Admin if not specified
            action,
            target,
            details
        };
        logs.unshift(newLog);
        // Keep only last 100 logs
        if (logs.length > 100) logs.pop();
        setStoredData(STORAGE_KEYS.ACTIVITY_LOG, logs);
        return newLog;
    }
};

// Initialize Data
seedData();
