/**
 * Mock Backend Service
 * Simulates a backend using localStorage to persist data.
 */

const STORAGE_KEYS = {
    ENQUIRIES: 'surgical_enquiries',
    PRODUCTS: 'surgical_products',
    CATEGORIES: 'surgical_categories'
};

// Helper to get data
const getStoredData = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
};

// Helper to set data
const setStoredData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

// Seed Data (Initial Population)
const seedData = () => {
    // Only seed if categories are empty to avoid overwriting user changes? 
    // For this demo, we'll force seed if the old "Tables" category exists or if empty.
    const currentCats = getStoredData(STORAGE_KEYS.CATEGORIES);
    const hasOldData = currentCats.some(c => c.name === 'Tables');

    if (!currentCats.length || hasOldData) {
        const initialCategories = [
            { id: '1', name: 'Medical Consumables', count: 120 },
            { id: '2', name: 'Medical Equipment & Devices', count: 45 },
            { id: '3', name: 'Respiratory Care Products', count: 18 },
            { id: '4', name: 'Hospital Furniture & Mobility', count: 32 },
            { id: '5', name: 'Orthopedic & Support Products', count: 24 },
            { id: '6', name: 'Personal Care & Hygiene', count: 50 },
            { id: '7', name: 'Industrial & Institutional Safety', count: 15 },
            { id: '8', name: 'Instruments & Accessories', count: 80 },
            { id: '9', name: 'Services (Equipment Rental)', count: 5 }
        ];
        setStoredData(STORAGE_KEYS.CATEGORIES, initialCategories);

        // Also reset products if we resetting categories to match
        const initialProducts = [
            { id: '101', name: 'Nitrile Examination Gloves (Box of 100)', category: 'Medical Consumables', price: '450', stock: 'In Stock', img: '/placeholder.jpg', description: 'Powder-free nitrile gloves for medical examination.' },
            { id: '102', name: '3-Ply Surgical Mask (Pack of 50)', category: 'Medical Consumables', price: '150', stock: 'In Stock', img: '/placeholder.jpg', description: 'Fluid resistant 3-ply masks with ear loops.' },
            { id: '201', name: 'Multi-Para Patient Monitor', category: 'Medical Equipment & Devices', price: '45000', stock: 'In Stock', img: '/placeholder.jpg', description: '5-para monitor for ICU/OT use.' },
            { id: '202', name: 'Syringe Infusion Pump', category: 'Medical Equipment & Devices', price: '22000', stock: 'Low Stock', img: '/placeholder.jpg', description: 'Precise drug delivery system.' },
            { id: '301', name: 'Portable Oxygen Concentrator 5L', category: 'Respiratory Care Products', price: '35000', stock: 'In Stock', img: '/placeholder.jpg', description: 'Compact and silent oxygen concentrator.' },
            { id: '401', name: 'ICU Bed (5 Function, Electric)', category: 'Hospital Furniture & Mobility', price: '85000', stock: 'In Stock', img: '/placeholder.jpg', description: 'Advanced electric ICU bed with remote control.' },
            { id: '801', name: 'General Surgery Instrument Set', category: 'Instruments & Accessories', price: '12000', stock: 'In Stock', img: '/placeholder.jpg', description: 'Complete set of stainless steel instruments for general surgery.' },
            { id: '701', name: 'Industrial Safety Helmet', category: 'Industrial & Institutional Safety', price: '450', stock: 'In Stock', img: '/placeholder.jpg', description: 'High-impact resistant safety helmet.' }
        ];
        setStoredData(STORAGE_KEYS.PRODUCTS, initialProducts);
    }
};

// Run seed on load
seedData();

export const mockBackend = {
    // --- ENQUIRIES ---
    saveEnquiry: (data) => {
        const enquiries = getStoredData(STORAGE_KEYS.ENQUIRIES);
        const newEnquiry = {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            status: 'New',
            ...data
        };
        enquiries.unshift(newEnquiry);
        setStoredData(STORAGE_KEYS.ENQUIRIES, enquiries);
        return newEnquiry;
    },

    getEnquiries: () => getStoredData(STORAGE_KEYS.ENQUIRIES),

    updateEnquiryStatus: (id, status) => {
        const enquiries = getStoredData(STORAGE_KEYS.ENQUIRIES);
        const updated = enquiries.map(e => e.id === id ? { ...e, status } : e);
        setStoredData(STORAGE_KEYS.ENQUIRIES, updated);
        return updated;
    },

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
            return newProduct;
        }
    },

    deleteProduct: (id) => {
        const products = getStoredData(STORAGE_KEYS.PRODUCTS);
        const filtered = products.filter(p => p.id !== id);
        setStoredData(STORAGE_KEYS.PRODUCTS, filtered);
        return filtered;
    },

    // --- CATEGORIES ---
    getCategories: () => getStoredData(STORAGE_KEYS.CATEGORIES),

    saveCategory: (data) => {
        const categories = getStoredData(STORAGE_KEYS.CATEGORIES);
        // Simple add only for now
        const newCat = { ...data, id: Date.now().toString() };
        categories.push(newCat);
        setStoredData(STORAGE_KEYS.CATEGORIES, categories);
        return newCat;
    },

    deleteCategory: (id) => {
        const categories = getStoredData(STORAGE_KEYS.CATEGORIES);
        const filtered = categories.filter(c => c.id !== id);
        setStoredData(STORAGE_KEYS.CATEGORIES, filtered);
        return filtered;
    },

    // --- DASHBOARD ---
    getStats: () => {
        const enquiries = getStoredData(STORAGE_KEYS.ENQUIRIES);
        const products = getStoredData(STORAGE_KEYS.PRODUCTS);
        const categories = getStoredData(STORAGE_KEYS.CATEGORIES);
        return {
            totalEnquiries: enquiries.length,
            newEnquiries: enquiries.filter(e => e.status === 'New').length,
            products: products.length,
            categories: categories.length
        };
    }
};
