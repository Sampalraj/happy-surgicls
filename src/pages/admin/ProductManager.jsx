import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { mockBackend } from '../../utils/mockBackend';

const ProductManager = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setProducts(mockBackend.getProducts());
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            mockBackend.deleteProduct(id);
            setProducts(mockBackend.getProducts()); // Refresh list
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.category && p.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="product-manager">
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Products</h2>
                <Link to="/admin/products/new" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Plus size={18} /> Add Product
                </Link>
            </div>

            <div className="filter-bar" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                    <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                </div>
                <select style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', minWidth: '200px' }}>
                    <option value="">All Categories</option>
                    <option value="Surgical">Surgical Instruments</option>
                    <option value="Dental">Dental Instruments</option>
                </select>
            </div>

            <div className="card" style={{ background: 'white', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th style={{ width: '80px' }}>Image</th>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.length === 0 ? (
                            <tr><td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>No products found.</td></tr>
                        ) : (
                            filteredProducts.map(product => (
                                <tr key={product.id}>
                                    <td>
                                        <div style={{ width: '40px', height: '40px', background: '#f4f4f4', borderRadius: '4px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <img src={product.img} alt="" style={{ maxWidth: '100%', maxHeight: '100%' }} onError={(e) => e.target.style.display = 'none'} />
                                        </div>
                                    </td>
                                    <td style={{ fontWeight: '500' }}>{product.name}</td>
                                    <td style={{ color: '#666' }}>{product.category}</td>
                                    <td>₹ {product.price}</td>
                                    <td>
                                        <span style={{
                                            padding: '0.25rem 0.5rem',
                                            borderRadius: '12px',
                                            fontSize: '0.75rem',
                                            fontWeight: 'bold',
                                            background: product.stock !== 'Out of Stock' ? '#e6fffa' : '#fff5f5',
                                            color: product.stock !== 'Out of Stock' ? '#38a169' : '#c53030'
                                        }}>
                                            {product.stock || 'Active'}
                                        </span>
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                            <button onClick={() => navigate(`/admin/products/edit/${product.id}`)} className="btn-icon" title="Edit"><Edit size={16} /></button>
                                            <button onClick={() => handleDelete(product.id)} className="btn-icon" title="Delete" style={{ color: '#c53030' }}><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductManager;
