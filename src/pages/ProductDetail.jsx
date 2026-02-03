import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MessageCircle, Truck, ShieldCheck, CreditCard, ChevronRight, ChevronLeft, X, CheckCircle } from 'lucide-react';
import { supabaseService } from '../utils/supabaseService';
import '../styles/product_detail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [segment, setSegment] = useState(null);
    const [category, setCategory] = useState(null);

    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [modalSubmitted, setModalSubmitted] = useState(false);
    const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

    useEffect(() => {
        const loadProduct = async () => {
            setLoading(true);
            const found = await supabaseService.getProduct(id);
            if (found) {
                setProduct(found);
                // Set flattened segment/category for UI
                if (found.segment) setSegment({ name: found.segment });
                if (found.category) setCategory({ name: found.category });
            }
            setLoading(false);
        };
        loadProduct();
    }, [id]);

    const handleInquiry = () => {
        setShowModal(true);
        setModalSubmitted(false);
    };

    const handleModalSubmit = (e) => {
        e.preventDefault();
        supabaseService.submitEnquiry({
            name: formData.name,
            phone: formData.phone, // Using phone field for now as contact
            email: formData.phone.includes('@') ? formData.phone : null, // Fallback if user enters email in phone
            subject: `Product Inquiry: ${product.name} `,
            message: formData.message,
            source: 'Product Detail'
        });
        setModalSubmitted(true);
        // Close after 2 seconds
        setTimeout(() => {
            setShowModal(false);
            setFormData({ name: '', phone: '', message: '' });
        }, 2000);
    };

    if (loading) return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading...</div>;

    if (!product) return (
        <div style={{ padding: '4rem', textAlign: 'center' }}>
            <h2>Product Not Found</h2>
            <Link to="/products" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>Back to Shop</Link>
        </div>
    );

    return (
        <div className="product-detail-page">

            {/* Modal */}
            {showModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '90%', maxWidth: '500px', position: 'relative' }}>
                        <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>

                        {!modalSubmitted ? (
                            <>
                                <h2 style={{ marginBottom: '1rem', color: '#1E293B' }}>Request Quote</h2>
                                <p style={{ marginBottom: '1.5rem', fontSize: '0.9rem', color: '#666' }}>Fill out the form below for <strong>{product.name}</strong></p>
                                <form onSubmit={handleModalSubmit}>
                                    <div style={{ marginBottom: '1rem' }}>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Name</label>
                                        <input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} type="text" style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }} />
                                    </div>
                                    <div style={{ marginBottom: '1rem' }}>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Phone / Email</label>
                                        <input required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} type="text" style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }} />
                                    </div>
                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Message</label>
                                        <textarea required value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} rows="3" style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}></textarea>
                                    </div>
                                    <button type="submit" className="btn-inquiry" style={{ width: '100%', justifyContent: 'center', background: '#2EBF68', color: 'white' }}>SUBMIT INQUIRY</button>
                                </form>
                            </>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                                <div style={{ color: '#2EBF68', marginBottom: '1rem' }}><CheckCircle size={48} /></div>
                                <h3>Inquiry Sent!</h3>
                                <p>We will contact you shortly.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Breadcrumb Bar */}
            <div className="container" style={{ padding: '1.5rem 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    <Link to="/products" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: '500' }}>
                        <ChevronLeft size={16} /> Back to Products
                    </Link>
                    {segment && (
                        <>
                            <span style={{ margin: '0 0.5rem', opacity: 0.5 }}>/</span>
                            <Link to={`/products?segment=${segment.name}`} style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>
                                {segment.name}
                            </Link>
                        </>
                    )}
                    {category && (
                        <>
                            <span style={{ margin: '0 0.5rem', opacity: 0.5 }}>/</span>
                            <span style={{ opacity: 0.9 }}>{category.name}</span>
                        </>
                    )}
                </div>
            </div>

            <div className="container" style={{ paddingBottom: '3rem' }}>

                {/* Main Product Section */}
                <div className="product-main-section">
                    <div className="product-gallery">
                        <div className="main-image-frame">
                            <div className="best-badge">BEST SELLER</div>
                            <img src={product.img} alt="Product" className="object-contain max-h-full max-w-full"
                                onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerText = 'Product Image'; }} />
                        </div>
                        <div className="gallery-thumbs">
                            <div className="thumb-box"><img src="/placeholder-1.png" alt="1" style={{ width: '100%' }} onError={(e) => e.target.style.display = 'none'} /></div>
                            <div className="thumb-box"><img src="/placeholder-2.png" alt="2" style={{ width: '100%' }} onError={(e) => e.target.style.display = 'none'} /></div>
                            <div className="thumb-box"><img src="/placeholder-3.png" alt="3" style={{ width: '100%' }} onError={(e) => e.target.style.display = 'none'} /></div>
                            <div className="thumb-box more"><span>MORE<br />IMAGES</span></div>
                        </div>
                    </div>

                    <div className="product-info-right">
                        <h1>{product.name}</h1>
                        <div className="brand-text">BRAND: {product.brand || 'Happy Surgicals'}</div>

                        {/* Dynamic Hierarchy Display */}
                        <div className="brand-text" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            CATEGORY:
                            <span style={{ color: '#333', fontWeight: 600 }}>
                                {category ? category.name : (product.subCategory || product.category)}
                            </span>
                        </div>

                        <div className="brand-text">ID: {product.code || product.id}</div>

                        <div className="stock-status">Status: {product.stock || 'Available for Bulk Order'}</div>

                        <div style={{ marginBottom: '1.5rem', color: '#555', lineHeight: '1.6' }}>
                            {product.description || 'Premium quality medical grade product manufactured in our ISO certified facility.'}
                        </div>

                        <button onClick={handleInquiry} className="btn-inquiry">
                            Request Bulk Quote
                        </button>
                    </div>
                </div>

                {/* Features Section */}
                <div className="features-section">
                    <div className="features-grid">
                        <div>
                            <h2 style={{ color: 'var(--text-primary)', marginBottom: '2rem' }}>Technical Specifications</h2>
                            <ul className="feature-list">
                                {product.features ? product.features.map((feat, i) => (
                                    <li key={i}>{feat}</li>
                                )) : (
                                    <>
                                        <li><strong>Material:</strong> Medical Grade Information</li>
                                        <li><strong>Sterility:</strong> EO Sterile / Non-Sterile options</li>
                                        <li><strong>Compliance:</strong> ISO 13485, CE Certified</li>
                                        <li><strong>Packaging:</strong> Bulk / Individual / OEM</li>
                                    </>
                                )}
                            </ul>

                            {/* Dynamic Compliance Badges */}
                            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                                <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '1rem', letterSpacing: '0.05em' }}>Certifications</h4>
                                <ProductCertificates product={product} />
                            </div>

                            <div className="feature-icons">
                                <div className="feature-icon-box">
                                    <div className="feature-icon-circle"><Truck size={28} /></div>
                                    <div className="feature-icon-text">Global<br />Shipping</div>
                                </div>
                                <div className="feature-icon-box">
                                    <div className="feature-icon-circle"><ShieldCheck size={28} /></div>
                                    <div className="feature-icon-text">Quality<br />Assured</div>
                                </div>
                                <div className="feature-icon-box">
                                    <div className="feature-icon-circle"><CreditCard size={28} /></div>
                                    <div className="feature-icon-text">Wholesale<br />Pricing</div>
                                </div>
                            </div>
                        </div>

                        {/* Feature Image */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', opacity: 0.8 }}>
                            {/* Optional secondary image or illustration */}
                        </div>
                    </div>
                </div>

                {/* Policies */}
                <div className="policy-section">
                    <div>
                        <h4><Truck size={18} /> Shipping & Logistics</h4>
                        <p>We handle bulk logistics securely. Shipping terms (EXW, FOB, CIF) can be discussed during the quotation process. Global delivery partners ensure timely arrival.</p>
                    </div>
                    <div>
                        <h4><ShieldCheck size={18} /> Quality Guarantee</h4>
                        <p>All products undergo rigorous QC checks at our ISO facility. We offer replacement for any manufacturing defects reported within 30 days of receipt.</p>
                    </div>
                </div>

                {/* Related Products */}
                <div className="related-products">
                    <div className="section-header-row">
                        <div style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 'bold', letterSpacing: '0.05em' }}>SIMILAR PRODUCTS</div>
                        <Link to="/products" style={{ color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 'bold', textDecoration: 'none' }}>View Catalog ▶</Link>
                    </div>
                    <h3 style={{ marginBottom: '2rem', color: 'var(--text-primary)', fontSize: '1.5rem' }}>You May Also Be Interested In</h3>

                    <RelatedProducts currentProductId={id} categoryId={product.category_id} segmentId={product.segment_id} />
                </div>

                {/* Brand Banner */}
                <div className="brand-banner">
                    <h3 style={{ margin: 0 }}>TRUSTED BY LEADING HOSPITALS WORLDWIDE</h3>
                </div>

            </div>
        </div>
    );
};

const ProductCertificates = ({ product }) => {
    const [certs, setCerts] = useState([]);

    useEffect(() => {
        const loadCerts = async () => {
            if (product) {
                const allCerts = await supabaseService.getCertificates();
                // Filter certs where category_ids contains product.category_id
                const applicableCerts = allCerts.filter(c =>
                    c.category_ids && c.category_ids.includes(product.category_id)
                );
                // Filter by show_on_products
                const displayCerts = applicableCerts.filter(c => c.show_on_products);
                setCerts(displayCerts);
            }
        };
        loadCerts();
    }, [product]);

    if (certs.length === 0) return null;

    return (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {certs.map(cert => (
                <div key={cert.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.75rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 4 }}>
                    <img src={cert.image} alt={cert.name} style={{ width: 24, height: 24, objectFit: 'contain' }} />
                    <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>{cert.name}</span>
                </div>
            ))}
        </div>
    );
};

const RelatedProducts = ({ currentProductId, categoryId, segmentId }) => {
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRelated = async () => {
            // Basic implementation: fetch all active products and filter (optimization: db text search or related query)
            // For now, fetching first 20 and picking 4 random or same category
            setLoading(true);
            const products = await supabaseService.getProducts();
            let filtered = products.filter(p => p.id !== currentProductId && p.is_active);

            // Prioritize same category
            const sameCategory = filtered.filter(p => p.category_id === categoryId);
            if (sameCategory.length >= 4) {
                setRelated(sameCategory.slice(0, 4));
            } else {
                setRelated(filtered.slice(0, 4));
            }
            setLoading(false);
        };
        if (currentProductId) fetchRelated();
    }, [currentProductId, categoryId]);

    if (loading) return <div style={{ textAlign: 'center', padding: '2rem', color: '#999' }}>Loading suggestions...</div>;
    if (related.length === 0) return <div style={{ textAlign: 'center', padding: '2rem', color: '#999' }}>View our catalog for more.</div>;

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
            {related.map(prod => (
                <Link to={`/product/${prod.id}`} key={prod.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ background: 'white', borderRadius: 8, padding: '1rem', border: '1px solid #eee', height: '100%' }}>
                        <div style={{ height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', background: '#f9fafb', borderRadius: 4 }}>
                            <img src={prod.img} alt={prod.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                                onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerText = prod.name[0]; }}
                            />
                        </div>
                        <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem', color: '#1e293b', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{prod.name}</h4>
                        <div style={{ fontSize: '0.8rem', color: '#2EBF68', fontWeight: 'bold' }}>Request Quote</div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default ProductDetail;
