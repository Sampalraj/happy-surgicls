import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MessageCircle, Truck, ShieldCheck, CreditCard, ChevronRight, ChevronLeft, X, CheckCircle } from 'lucide-react';
import { mockBackend } from '../utils/mockBackend';
import '../styles/product_detail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [modalSubmitted, setModalSubmitted] = useState(false);
    const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

    useEffect(() => {
        const found = mockBackend.getProduct(id);
        setProduct(found);
        setLoading(false);
    }, [id]);

    const handleInquiry = () => {
        setShowModal(true);
        setModalSubmitted(false);
    };

    const handleModalSubmit = (e) => {
        e.preventDefault();
        mockBackend.saveEnquiry({
            name: formData.name,
            email: formData.phone, // Using phone field for now as contact
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
        <div className="product-detail-page" style={{ background: 'white', position: 'relative' }}>

            {/* Modal */}
            {showModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '90%', maxWidth: '500px', position: 'relative' }}>
                        <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>

                        {!modalSubmitted ? (
                            <>
                                <h2 style={{ marginBottom: '1rem', color: '#004daa' }}>Request Quote</h2>
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
                                    <button type="submit" className="btn-inquiry" style={{ width: '100%', justifyContent: 'center', background: '#e53935', color: 'white' }}>SUBMIT INQUIRY</button>
                                </form>
                            </>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                                <div style={{ color: 'green', marginBottom: '1rem' }}><CheckCircle size={48} /></div>
                                <h3>Inquiry Sent!</h3>
                                <p>We will contact you shortly.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Top Blue Bar */}
            <div style={{ background: '#2b5c9e', color: 'white', padding: '1rem 0' }}>
                <div className="container" style={{ display: 'flex', alignItems: 'center' }}>
                    <Link to="/products" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white', textDecoration: 'none', fontWeight: '500', fontSize: '0.9rem' }}>
                        <ChevronLeft size={16} /> Back to Products
                    </Link>
                </div>
            </div>

            <div className="container" style={{ paddingTop: '3rem' }}>

                {/* Main Product Section */}
                <div className="product-main-section">
                    <div className="product-gallery">
                        <div className="main-image-frame">
                            <div className="best-badge">BEST</div>
                            <img src={product.img} alt="Product" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerText = 'Product Image'; }} />
                        </div>
                        <div className="gallery-thumbs">
                            <div className="thumb-box"><img src="/placeholder-1.png" alt="1" style={{ width: '100%' }} onError={(e) => e.target.style.display = 'none'} /></div>
                            <div className="thumb-box"><img src="/placeholder-2.png" alt="2" style={{ width: '100%' }} onError={(e) => e.target.style.display = 'none'} /></div>
                            <div className="thumb-box"><img src="/placeholder-3.png" alt="3" style={{ width: '100%' }} onError={(e) => e.target.style.display = 'none'} /></div>
                            <div className="thumb-box more"><span>MORE<br />5 IMAGES</span></div>
                        </div>
                    </div>

                    <div className="product-info-right">
                        <h1>{product.name}</h1>
                        <div className="brand-text">BRAND: {product.brand || 'Happy Surgicals'}</div>
                        <div className="brand-text">CATEGORY: {product.category}</div>
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
                            <h2 style={{ color: '#004daa', marginBottom: '2rem', textTransform: 'uppercase' }}>Technical Specifications</h2>
                            <ul className="feature-list">
                                {product.features ? product.features.map((feat, i) => (
                                    <li key={i}>{feat}</li>
                                )) : (
                                    <>
                                        <li><strong>Material:</strong> Medical Grade</li>
                                        <li><strong>Sterility:</strong> EO Sterile / Non-Sterile options</li>
                                        <li><strong>Compliance:</strong> ISO 13485, CE</li>
                                        <li><strong>Packaging:</strong> Bulk / Individual</li>
                                    </>
                                )}
                            </ul>

                            <div className="feature-icons">
                                <div className="feature-icon-box">
                                    <div className="feature-icon-circle"><Truck size={32} /></div>
                                    <div className="feature-icon-text">Global<br />Shipping</div>
                                </div>
                                <div className="feature-icon-box">
                                    <div className="feature-icon-circle"><ShieldCheck size={32} /></div>
                                    <div className="feature-icon-text">Quality<br />Assured</div>
                                </div>
                                <div className="feature-icon-box">
                                    <div className="feature-icon-circle"><CreditCard size={32} /></div>
                                    <div className="feature-icon-text">Wholesale<br />Pricing</div>
                                </div>
                            </div>
                        </div>

                        {/* Feature Image */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <img src={product.img} alt="Features" style={{ maxWidth: '100%', transform: 'scaleX(-1)' }}
                                onError={(e) => { e.target.style.display = 'none' }} />
                        </div>
                    </div>
                </div>

                {/* Policies */}
                <div className="policy-section">
                    <div style={{ marginBottom: '2rem' }}>
                        <h4>Shipping & Logistics</h4>
                        <p>We handle bulk logistics securely. Shipping terms (EXW, FOB, CIF) can be discussed during the quotation process.</p>
                    </div>
                    <div style={{ marginBottom: '2rem' }}>
                        <h4>Quality Guarantee</h4>
                        <p>All products undergo rigorous QC checks. We offer replacement for any manufacturing defects reported within 30 days.</p>
                    </div>
                </div>

                {/* Related Products */}
                <div className="related-products">
                    <div className="section-header-row">
                        <div style={{ fontSize: '0.8rem', color: '#004daa', fontWeight: 'bold' }}>SIMILAR PRODUCTS</div>
                        <Link to="/products" style={{ color: '#d32f2f', fontSize: '0.9rem', fontWeight: 'bold', textDecoration: 'none' }}>View All ▶</Link>
                    </div>
                    <h3 style={{ textTransform: 'uppercase', marginBottom: '2rem', color: '#333' }}>You May Also Interested In</h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                        {mockBackend.getProducts().slice(0, 4).map(p => (
                            <div key={p.id} style={{ border: '1px solid #eee', padding: '1rem', borderRadius: '4px', textAlign: 'center', background: 'white' }}>
                                <div style={{ height: '120px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img src={p.img} alt={p.name} style={{ maxWidth: '100%', maxHeight: '100%' }} onError={(e) => e.target.style.display = 'none'} />
                                </div>
                                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', height: '2.4em', overflow: 'hidden' }}>{p.name}</h4>
                                <Link to={`/product/${p.id}`} style={{ border: '1px solid #004daa', color: '#004daa', background: 'white', padding: '5px 15px', fontSize: '0.8rem', textDecoration: 'none', display: 'inline-block' }}>View Details</Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Brand Banner */}
                <div className="brand-banner">
                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                        SUPPLY
                    </div>
                    <h3 style={{ margin: 0, marginBottom: '1rem' }}>HOSPITAL EQUIPMENT BRANDS</h3>
                    <div className="brand-scroll">
                        <ChevronLeft />
                        <div className="brand-logo-box"><span style={{ color: 'black', fontWeight: 'bold' }}>BMC</span></div>
                        <div className="brand-logo-box"><span style={{ color: 'black', fontWeight: 'bold' }}>dnve</span></div>
                        <div className="brand-logo-box"><span style={{ color: 'black', fontWeight: 'bold' }}>ResMed</span></div>
                        <div className="brand-logo-box"><span style={{ color: 'black', fontWeight: 'bold' }}>hypnus</span></div>
                        <div className="brand-logo-box"><span style={{ color: 'black', fontWeight: 'bold' }}>RESPRO</span></div>
                        <ChevronRight />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductDetail;
