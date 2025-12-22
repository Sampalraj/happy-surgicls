import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronRight, ChevronLeft, ShieldCheck, Box, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockBackend } from '../utils/mockBackend';
import '../styles/products.css';

const Products = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [allProducts, setAllProducts] = useState([]);
    const [displayProducts, setDisplayProducts] = useState([]);

    // Data State
    const [segments, setSegments] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState({ id: 'all', name: 'All Products' });
    const [activeSegmentIdx, setActiveSegmentIdx] = useState(0);

    useEffect(() => {
        const fetchedProducts = mockBackend.getProducts();
        setAllProducts(fetchedProducts);

        const fetchedCategories = mockBackend.getCategories();
        setSegments(fetchedCategories);

        const categoryParam = searchParams.get('category');
        if (categoryParam) {
            const found = fetchedCategories.find(c => c.name === categoryParam);
            if (found) {
                setSelectedCategory(found);
                // Find index to center the carousel if possible, simplified here
                const idx = fetchedCategories.findIndex(c => c.name === categoryParam);
                if (idx !== -1) setActiveSegmentIdx(idx);
            }
        }
    }, [searchParams]);

    useEffect(() => {
        if (selectedCategory.id === 'all') {
            setDisplayProducts(allProducts);
        } else {
            setDisplayProducts(allProducts.filter(p => p.category === selectedCategory.name));
        }
    }, [selectedCategory, allProducts]);

    const nextSegment = () => {
        if (segments.length === 0) return;
        setActiveSegmentIdx((prev) => (prev + 1) % segments.length);
        // Optional: Auto-select segment on slide? Let's decouple slide from filter for smoother UX
    };

    const prevSegment = () => {
        if (segments.length === 0) return;
        setActiveSegmentIdx((prev) => (prev - 1 + segments.length) % segments.length);
    };

    const handleSegmentClick = (segment, idx) => {
        setActiveSegmentIdx(idx);
        setSelectedCategory(segment);
    };

    return (
        <div className="premium-products-page">

            {/* Header: Global/Enterprise Feel */}
            <div className="pp-header container">
                <h1>Global Healthcare Solutions</h1>
                <p>Premium medical manufacturing for hospitals, distributors, and procurement teams worldwide.</p>
            </div>

            {/* Component 1: Segment Carousel */}
            <section className="pp-carousel-section">
                <div className="pp-carousel-wrapper">
                    <button className="pp-nav-btn prev" onClick={prevSegment}><ChevronLeft size={24} /></button>

                    <div className="pp-carousel-track">
                        {/* We render 5 visible cards centered around active index */}
                        {[-2, -1, 0, 1, 2].map((offset) => {
                            if (segments.length === 0) return null;
                            const idx = (activeSegmentIdx + offset + segments.length) % segments.length; // Circular index
                            const item = segments[idx];
                            if (!item) return null;

                            const isActive = offset === 0;

                            return (
                                <motion.div
                                    key={`${item.id}-${offset}`}
                                    className={`pp-segment-card ${isActive ? 'active' : ''}`}
                                    onClick={() => handleSegmentClick(item, idx)}
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{
                                        scale: isActive ? 1.05 : 0.9,
                                        opacity: Math.abs(offset) > 1 ? 0.6 : 1, // Fade outer cards
                                        x: offset * 340, // Horizontal Spacing
                                        zIndex: isActive ? 10 : 5 - Math.abs(offset),
                                        boxShadow: isActive ? '0 20px 40px rgba(0,166,81,0.15)' : '0 10px 20px rgba(0,0,0,0.05)'
                                    }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                >
                                    <div className="seg-title">{item.name}</div>
                                    <div className="seg-img">
                                        <img src={item.image || '/placeholder.jpg'} alt={item.name} />
                                    </div>
                                    {isActive && <div className="seg-subtitle">{item.subtitle || 'Premium Quality'}</div>}
                                    {isActive && <div className="seg-indicator"></div>}
                                </motion.div>
                            )
                        })}
                    </div>

                    <button className="pp-nav-btn next" onClick={nextSegment}><ChevronRight size={24} /></button>
                </div>
            </section>

            {/* Component 2: Product Grid */}
            <section className="pp-grid-section container">
                <div className="pp-grid-header">
                    <h2>{selectedCategory.name}</h2>
                    <span className="pp-count">{displayProducts.length} Products Available</span>
                </div>

                <div className="pp-grid">
                    {displayProducts.map(product => (
                        <div key={product.id} className="pp-card">
                            <div className="pp-card-img">
                                <img src={product.img || '/placeholder.jpg'} alt={product.name} />
                            </div>
                            <div className="pp-card-content">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <span className={`pp-tag ${product.tag?.toLowerCase().includes('sterile') ? 'sterile' : ''}`}>
                                        {product.tag || 'Standard'}
                                    </span>
                                    {product.subCategory && (
                                        <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>
                                            {product.subCategory}
                                        </span>
                                    )}
                                </div>
                                <h3>{product.name}</h3>

                                <div className="pp-features">
                                    {product.features?.slice(0, 3).map((feat, i) => (
                                        <div key={i} className="pp-feat-item">
                                            <ShieldCheck size={14} className="pp-feat-icon" />
                                            <span>{feat}</span>
                                        </div>
                                    ))}
                                    {(!product.features || product.features.length === 0) && (
                                        <div className="pp-feat-item">
                                            <Box size={14} className="pp-feat-icon" />
                                            <span>Premium Grade</span>
                                        </div>
                                    )}
                                </div>

                                <div className="pp-actions">
                                    <button className="pp-btn-details" onClick={() => navigate(`/product/${product.id}`)}>
                                        View Details
                                    </button>
                                    <button className="pp-btn-enquire" onClick={() => navigate(`/contact?subject=Enquiry: ${product.name}`)}>
                                        Enquire Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {displayProducts.length === 0 && (
                    <div className="pp-empty-state">
                        <Activity size={48} color="#cbd5e1" />
                        <h3>No products found in this category.</h3>
                        <button onClick={() => { setSelectedCategory({ id: 'all', name: 'All Products' }); }} className="pp-btn-details">
                            View All Products
                        </button>
                    </div>
                )}
            </section>

        </div>
    );
};

export default Products;
