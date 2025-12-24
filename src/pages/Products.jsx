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
    const [categories, setCategories] = useState([]); // New State
    const [selectedSegment, setSelectedSegment] = useState(null);
    const [activeSegmentIdx, setActiveSegmentIdx] = useState(0);

    useEffect(() => {
        // Fetch Data
        const fetchedProducts = mockBackend.getProducts();
        setAllProducts(fetchedProducts);

        const fetchedSegments = mockBackend.getSegments();
        setSegments(fetchedSegments);

        const fetchedCategories = mockBackend.getCategories(); // Fetch Categories
        setCategories(fetchedCategories);

        // Handle URL Param (e.g. ?segment=Healthcare)
        const segmentParam = searchParams.get('segment');
        if (segmentParam) {
            const found = fetchedSegments.find(s => s.name === segmentParam || s.id === segmentParam);
            if (found) {
                setSelectedSegment(found);
                const idx = fetchedSegments.findIndex(s => s.id === found.id);
                if (idx !== -1) setActiveSegmentIdx(idx);
            } else if (fetchedSegments.length > 0) {
                // Default to first if not found
                setSelectedSegment(fetchedSegments[0]);
            }
        } else if (fetchedSegments.length > 0) {
            // Default to first segment
            setSelectedSegment(fetchedSegments[0]);
        }
    }, [searchParams]);

    // Filtering Logic
    useEffect(() => {
        if (!selectedSegment) {
            setDisplayProducts(allProducts);
            return;
        }

        // Filter by Segment ID (New Schema) or Fallback to legacy string matching
        const filtered = allProducts.filter(p =>
            p.segment_id === selectedSegment.id ||
            p.category === selectedSegment.name // Fallback for old data
        );
        setDisplayProducts(filtered);
    }, [selectedSegment, allProducts]);

    const nextSegment = () => {
        if (segments.length === 0) return;
        const newIdx = (activeSegmentIdx + 1) % segments.length;
        setActiveSegmentIdx(newIdx);
        setSelectedSegment(segments[newIdx]); // Auto-select on scroll for this specific UI pattern
    };

    const prevSegment = () => {
        if (segments.length === 0) return;
        const newIdx = (activeSegmentIdx - 1 + segments.length) % segments.length;
        setActiveSegmentIdx(newIdx);
        setSelectedSegment(segments[newIdx]);
    };

    const handleSegmentClick = (segment, idx) => {
        setActiveSegmentIdx(idx);
        setSelectedSegment(segment);
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
                                        <img src={item.hero_image || item.image || '/placeholder.jpg'} alt={item.name} />
                                    </div>
                                    {isActive && <div className="seg-subtitle">{item.description || item.subtitle || 'Premium Quality'}</div>}
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
                    <h2>{selectedSegment ? selectedSegment.name : 'All Products'}</h2>
                    <span className="pp-count">{displayProducts.length} Products Available</span>
                </div>

                <div className="pp-grid">
                    {displayProducts.map(product => {
                        // Resolve display strings potentially from IDs if needed (or backend populates them)
                        // Fetch fresh categories if needed or use what we have? 
                        // For efficiency, we rely on 'allProducts' loading, but we need categories list.
                        // Let's assume we can fetch all categories once if we want perfect mapping, or just use what we have.
                        // Ideally we pass "categories" prop or fetch in useEffect.
                        // For now, let's use a quick lookup if we have the list, but we only fetched segments.

                        // FIX: We need to fetch categories to resolve the name properly.
                        // Since we didn't fetch categories in the main component state, let's just rely on 
                        // the fact that ProductForm might have saved it, OR we should fetch categories in useEffect.
                        // I will add categories fetch to useEffect in next step if needed, but for now:
                        const categoryName = product.subCategory || 'Medical';

                        return (
                            <div key={product.id} className="pp-card">
                                <div className="pp-card-img">
                                    <img src={product.img || '/placeholder.jpg'} alt={product.name} />
                                </div>
                                <div className="pp-card-content">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                        <span className={`pp-tag ${product.tag?.toLowerCase().includes('sterile') ? 'sterile' : ''}`}>
                                            {product.tag || product.material || 'Standard'}
                                        </span>
                                        {/* Display SubCategory info if available */}
                                        <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>
                                            {/* We want to show the actual Category Name if possible */}
                                            {product.category || product.subCategory || ''}
                                        </span>
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
                        );
                    })}
                </div>

                {displayProducts.length === 0 && (
                    <div className="pp-empty-state">
                        <Activity size={48} color="#cbd5e1" />
                        <h3>No products found in this segment.</h3>
                        <button onClick={() => { setSelectedSegment(null); }} className="pp-btn-details">
                            View All Products
                        </button>
                    </div>
                )}
            </section>

        </div>
    );
};

export default Products;
