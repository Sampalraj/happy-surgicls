import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
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
                // Log activity?
                await supabaseService.logActivity('Admin', 'Deleted', `Product ID: ${id}`, 'Deleted from Product Manager');
                loadProducts(); // Refresh list
            } catch (error) {
                alert('Error deleting product');
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
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1e293b' }}>Manage Products</h2>
                    <p style={{ color: '#64748b' }}>Add, edit, and organize your medical inventory.</p>
                </div>
                <Link to="/admin/products/new" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '1rem' }}>
                    <Plus size={18} /> Add New Product
                </Link>
            </div>

            {/* Main Card */}
            <div className="admin-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1e293b' }}>Product List</h3>

                {/* Filters Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', gap: '1rem', flex: 1 }}>
                        <div style={{ position: 'relative', minWidth: '300px' }}>
                            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    width: '100%', padding: '0.6rem 1rem 0.6rem 2.5rem',
                                    border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.95rem'
                                }}
                            />
                        </div>
                        <select style={{ padding: '0.6rem', border: '1px solid #e2e8f0', borderRadius: '6px', minWidth: '180px', color: '#64748b' }}>
                            <option value="">All Categories</option>
                            <option value="Surgical">Surgical Instruments</option>
                            <option value="Consumables">Consumables</option>
                        </select>
                    </div>

                    {/* Mock Pagination Controls */}
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <select style={{ padding: '0.4rem', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
                            <option>10 / Page</option>
                            <option>20 / Page</option>
                        </select>
                        <div style={{ display: 'flex', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
                            <button style={{ padding: '0.4rem 0.8rem', background: 'white', border: 'none', cursor: 'pointer', borderRight: '1px solid #e2e8f0' }}>&lt;</button>
                            <button style={{ padding: '0.4rem 0.8rem', background: 'white', border: 'none', cursor: 'pointer' }}>&gt;</button>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="table-responsive">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th style={{ width: '80px' }}>Image</th>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>Stock</th>
                                <th>Status</th>
                                <th style={{ textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.length === 0 ? (
                                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>No products found matching your search.</td></tr>
                            ) : (
                                filteredProducts.map(product => (
                                    <tr key={product.id}>
                                        <td>
                                            <div style={{ width: '48px', height: '48px', background: '#f8fafc', borderRadius: '8px', overflow: 'hidden', padding: 4 }}>
                                                <img
                                                    src={product.img}
                                                    alt="prod"
                                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                                    onError={(e) => e.target.src = 'https://placehold.co/100?text=IMG'}
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ fontWeight: '600', color: '#0f172a' }}>{product.name}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>ID: #{product.id.substring(0, 6)}</div>
                                        </td>
                                        <td style={{ color: '#475569' }}>{product.category}</td>
                                        <td style={{ fontVariantNumeric: 'tabular-nums' }}>
                                            {product.stock === 'In Stock' ? '500' : '0'} {/* Mock Stock Qty */}
                                        </td>
                                        <td>
                                            <span className={`status-badge ${product.stock === 'In Stock' ? 'status-in-stock' : 'status-out-of-stock'
                                                }`}>
                                                {product.stock}
                                            </span>
                                        </td>
                                        <td style={{ textAlign: 'right' }}>
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                                <button
                                                    onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                                                    className="btn-action-primary"
                                                >
                                                    <Edit size={14} /> Edit
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer Pagination Mock */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', color: '#64748b', fontSize: '0.9rem' }}>
                    <div>Showing 1 to {filteredProducts.length} of {products.length} entries</div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="btn-outline" style={{ padding: '0.4rem 0.8rem' }}>1</button>
                        <button className="btn-outline" style={{ padding: '0.4rem 0.8rem', background: '#3b82f6', color: 'white', borderColor: '#3b82f6' }}>2</button>
                        <button className="btn-outline" style={{ padding: '0.4rem 0.8rem' }}>...</button>
                        <button className="btn-outline" style={{ padding: '0.4rem 0.8rem' }}>&gt;</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductManager;
