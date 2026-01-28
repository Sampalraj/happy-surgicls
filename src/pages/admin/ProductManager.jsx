import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search, Edit, Trash2, Eye, Filter } from 'lucide-react';
import { supabaseService } from '../../utils/supabaseService';

const ProductManager = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    const loadProducts = async () => {
        setLoading(true);
        const data = await supabaseService.getProducts();
        setProducts(data);
        setLoading(false);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await supabaseService.deleteProduct(id);
                loadProducts();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.category && p.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="product-manager">
            {/* Page Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h2 className="page-title">Manage Products</h2>
                    <p style={{ color: '#6B7280', marginTop: '0.5rem' }}>Add, edit, and organize your medical inventory.</p>
                </div>
                <Link to="/admin/products/new" className="btn btn-primary">
                    <Plus size={18} style={{ marginRight: '8px' }} /> Add New Product
                </Link>
            </div>

            {/* Main Content */}
            <div style={{ background: 'white', borderRadius: '24px', padding: '1.5rem', boxShadow: 'var(--shadow-soft)' }}>

                {/* Visual Filters Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
                        <Search size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%', padding: '0.875rem 1rem 0.875rem 3rem',
                                border: 'none', borderRadius: '16px', background: '#F3F4F6', color: '#1F2937', fontWeight: 500
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button className="btn btn-secondary" style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                            <Filter size={18} style={{ marginRight: '8px' }} /> Filter
                        </button>
                    </div>
                </div>

                {/* Soft Table / Card List */}
                <div className="table-responsive">
                    <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 12px' }}>
                        <thead>
                            <tr style={{ color: '#6B7280', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                <th style={{ padding: '0 1.5rem', textAlign: 'left' }}>Product</th>
                                <th style={{ padding: '0 1.5rem', textAlign: 'left' }}>Category</th>
                                <th style={{ padding: '0 1.5rem', textAlign: 'center' }}>Stock</th>
                                <th style={{ padding: '0 1.5rem', textAlign: 'center' }}>Status</th>
                                <th style={{ padding: '0 1.5rem', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.length === 0 ? (
                                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: '#9CA3AF' }}>No products found.</td></tr>
                            ) : (
                                filteredProducts.map(product => (
                                    <tr key={product.id} style={{ background: 'white', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', transition: 'transform 0.1s' }}>
                                        <td style={{ padding: '1rem 1.5rem', borderRadius: '16px 0 0 16px', border: '1px solid #F3F4F6', borderRight: 'none' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#F8FAFC', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <img
                                                        src={product.img}
                                                        alt=""
                                                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                                        onError={(e) => e.target.src = 'https://placehold.co/100?text=IMG'}
                                                    />
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: 600, color: '#1F2937' }}>{product.name}</div>
                                                    <div style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>#{product.code || product.id.substring(0, 6)}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem 1.5rem', borderTop: '1px solid #F3F4F6', borderBottom: '1px solid #F3F4F6', color: '#4B5563' }}>
                                            {product.category}
                                        </td>
                                        <td style={{ padding: '1rem 1.5rem', textAlign: 'center', borderTop: '1px solid #F3F4F6', borderBottom: '1px solid #F3F4F6', fontWeight: 600, color: '#1F2937' }}>
                                            500
                                        </td>
                                        <td style={{ padding: '1rem 1.5rem', textAlign: 'center', borderTop: '1px solid #F3F4F6', borderBottom: '1px solid #F3F4F6' }}>
                                            <span style={{
                                                background: '#DEF7EC', color: '#03543F',
                                                padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600
                                            }}>In Stock</span>
                                        </td>
                                        <td style={{ padding: '1rem 1.5rem', borderRadius: '0 16px 16px 0', border: '1px solid #F3F4F6', borderLeft: 'none', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                                                <button
                                                    onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                                                    className="btn btn-secondary"
                                                    style={{ padding: '0.5rem', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    style={{
                                                        background: '#FEE2E2', color: '#EF4444', border: 'none',
                                                        padding: '0.5rem', borderRadius: '50%', width: '36px', height: '36px',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                                                    }}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', padding: '0 1rem', color: '#6B7280', fontSize: '0.9rem' }}>
                    <div>Showing 1-10 of {products.length} products</div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>Previous</button>
                        <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>Next</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductManager;
