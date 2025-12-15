import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown, ChevronRight } from 'lucide-react';
import { mockBackend } from '../utils/mockBackend';
import '../styles/products.css';

const Products = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [allProducts, setAllProducts] = useState([]);
    const [displayProducts, setDisplayProducts] = useState([]);
    const [categoryTitle, setCategoryTitle] = useState('All Medical Products');

    // Filter States
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Mock Filter Options
    const filterGroups = [
        {
            title: 'Subcategories',
            options: ['Surgical Gloves', 'Examination Gloves', 'Face Masks', 'PPE Kits']
        },
        {
            title: 'Material',
            options: ['Latex', 'Nitrile', 'Vinyl', 'Non-Woven']
        },
        {
            title: 'Usage',
            options: ['Surgical', 'Examination', 'Industrial', 'General Purpose']
        }
    ];

    useEffect(() => {
        const fetchedProducts = mockBackend.getProducts();
        setAllProducts(fetchedProducts);

        // Handle URL Params
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
            const categoryMap = {
                'consumables': 'Medical Consumables',
                'equipment': 'Medical Equipment & Devices',
                'respiratory': 'Respiratory Care Products',
                'furniture': 'Hospital Furniture & Mobility',
                'ortho': 'Orthopedic & Support Products',
                'hygiene': 'Personal Care & Hygiene',
                'safety': 'Industrial & Institutional Safety',
                'instruments': 'Instruments & Accessories'
            };
            const mappedCat = categoryMap[categoryParam] || categoryParam;
            setSelectedCategory(mappedCat);
            setCategoryTitle(mappedCat);
        } else {
            setSelectedCategory('All');
            setCategoryTitle('All Medical Products');
        }
    }, [searchParams]);

    useEffect(() => {
        if (selectedCategory === 'All') {
            setDisplayProducts(allProducts);
        } else {
            setDisplayProducts(allProducts.filter(p => p.category === selectedCategory));
        }
    }, [selectedCategory, allProducts]);

    return (
        <div className="products-page">
            {/* Category Hero */}
            <header className="category-hero">
                <div className="container">
                    <div className="breadcrumb">
                        <a href="/">Home</a> <ChevronRight size={14} style={{ display: 'inline', verticalAlign: 'middle' }} />
                        <span> Products </span> <ChevronRight size={14} style={{ display: 'inline', verticalAlign: 'middle' }} />
                        <span style={{ color: '#004daa', fontWeight: 'bold' }}>{categoryTitle}</span>
                    </div>
                    <h1 className="category-title">{categoryTitle}</h1>
                    <p className="category-desc">
                        Explore our premium range of {categoryTitle.toLowerCase()}.
                        Manufactured to ISO 13485 standards ensuring safety and reliability for healthcare institutions.
                    </p>
                </div>
            </header>

            <div className="container">
                <div className="category-layout">
                    {/* Sticky Sidebar */}
                    <aside className="filter-sidebar">
                        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Filters</h3>
                            <button style={{ color: '#d32f2f', background: 'none', border: 'none', fontSize: '0.85rem', cursor: 'pointer', textDecoration: 'underline' }}
                                onClick={() => navigate('/products')}>Clear All</button>
                        </div>

                        {filterGroups.map((group, idx) => (
                            <div key={idx} className="filter-group">
                                <div className="filter-title">
                                    {group.title} <ChevronDown size={16} />
                                </div>
                                <div className="filter-options">
                                    {group.options.map((opt, i) => (
                                        <label key={i} className="checkbox-label">
                                            <input type="checkbox" /> {opt}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </aside>

                    {/* Products Grid */}
                    <div className="products-content">
                        {displayProducts.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '5rem', background: 'white', borderRadius: '8px', border: '1px solid #eee' }}>
                                <Filter size={48} color="#cbd5e1" style={{ marginBottom: '1rem' }} />
                                <h3>No products found in this category.</h3>
                                <p style={{ color: '#64748B' }}>Try browsing "All Medical Products" or select a different category.</p>
                                <button onClick={() => navigate('/products')} className="btn-view" style={{ marginTop: '1rem', width: 'auto', padding: '0.5rem 2rem' }}>
                                    View All Products
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="products-grid">
                                    {displayProducts.map(product => (
                                        <div key={product.id} className="b2b-product-card">
                                            <div className="card-img-wrapper">
                                                <img src={product.img || '/placeholder.jpg'} alt={product.name} onError={(e) => e.target.style.display = 'none'} />
                                            </div>
                                            <div className="card-content">
                                                <div className="card-category">{product.category}</div>
                                                <div className="card-title">{product.name}</div>

                                                {/* Specs (Mock for demo) */}
                                                <div className="specs-list">
                                                    <div className="spec-item">
                                                        <span className="spec-label">Material:</span>
                                                        <span>Medical Grade</span>
                                                    </div>
                                                    <div className="spec-item">
                                                        <span className="spec-label">Usage:</span>
                                                        <span>Hospital / Clinic</span>
                                                    </div>
                                                    <div className="spec-item">
                                                        <span className="spec-label">Sterility:</span>
                                                        <span>Sterile EO</span>
                                                    </div>
                                                </div>

                                                <div className="card-actions">
                                                    <button className="btn-view" onClick={() => navigate(`/product/${product.id}`)}>
                                                        Details
                                                    </button>
                                                    <button className="btn-quote" onClick={() => navigate(`/contact?subject=Quote for ${product.name}`)}>
                                                        Request Quote
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination (Static Demo) */}
                                <div className="pagination">
                                    <button className="page-btn active">1</button>
                                    <button className="page-btn">2</button>
                                    <button className="page-btn">3</button>
                                    <button className="page-btn"><ChevronRight size={16} /></button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
