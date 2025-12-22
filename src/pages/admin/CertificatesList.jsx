import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, ShieldCheck, Home, Factory, Box } from 'lucide-react';
import { mockBackend } from '../../utils/mockBackend';

const CertificatesList = () => {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCertificates();
    }, []);

    const loadCertificates = () => {
        setLoading(true);
        // Simulate network delay
        setTimeout(() => {
            const data = mockBackend.getCertificates();
            setCertificates(data);
            setLoading(false);
        }, 500);
    };

    const handleDelete = (id, certName) => {
        // Check if certificate is in use
        const usage = mockBackend.checkCertificateUsage(id);

        if (usage.inUse) {
            const categoriesList = usage.categories.join(', ');
            const productsList = usage.products.join(', ');

            let warningMessage = `⚠️ Cannot delete "${certName}" - it is currently in use:\n\n`;

            if (usage.categories.length > 0) {
                warningMessage += `📁 Categories (${usage.categories.length}): ${categoriesList}\n`;
            }

            if (usage.products.length > 0) {
                warningMessage += `📦 Products (${usage.products.length}): ${productsList}\n`;
            }

            warningMessage += `\n💡 Please remove this certificate from the above items before deleting.`;

            alert(warningMessage);
            return;
        }

        // No dependencies - safe to delete with confirmation
        if (window.confirm(`Are you sure you want to delete "${certName}"?\n\nThis action cannot be undone.`)) {
            mockBackend.deleteCertificate(id);
            loadCertificates();
        }
    };

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h1 className="admin-title">Certificates & Compliance</h1>
                <Link to="/admin/certificates/new" className="btn btn-primary">
                    <Plus size={18} /> Add Certificate
                </Link>
            </div>

            <div className="admin-card">
                {loading ? (
                    <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>Loading certificates...</div>
                ) : certificates.length === 0 ? (
                    <div className="empty-state">
                        <ShieldCheck size={48} color="#cbd5e1" />
                        <h3>No Certificates Added</h3>
                        <p>Upload ISO, CE, or GMP certificates to display trust badges on your site.</p>
                        <Link to="/admin/certificates/new" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                            Add First Certificate
                        </Link>
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th width="80">Logo</th>
                                    <th>Certificate Name</th>
                                    <th>Type</th>
                                    <th>Visibility (Used On)</th>
                                    <th>Status</th>
                                    <th width="100">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {certificates.map(cert => (
                                    <tr key={cert.id}>
                                        <td>
                                            <div style={{ width: 48, height: 48, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                                <img
                                                    src={cert.image}
                                                    alt={cert.name}
                                                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                                                    onError={(e) => e.target.style.display = 'none'}
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ fontWeight: '600', color: '#1e293b' }}>{cert.name}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Updated: {new Date(cert.updated_at).toLocaleDateString()}</div>
                                        </td>
                                        <td>
                                            <span style={{
                                                background: '#eff6ff', color: '#1d4ed8',
                                                padding: '0.25rem 0.5rem', borderRadius: 4, fontSize: '0.75rem', fontWeight: '500'
                                            }}>
                                                {cert.type}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                {cert.show_on_homepage && (
                                                    <span title="Homepage" style={{ background: '#f0fdf4', color: '#15803d', padding: 4, borderRadius: 4 }}><Home size={14} /></span>
                                                )}
                                                {cert.show_on_manufacturing && (
                                                    <span title="Manufacturing" style={{ background: '#fefce8', color: '#a16207', padding: 4, borderRadius: 4 }}><Factory size={14} /></span>
                                                )}
                                                {cert.show_on_products && (
                                                    <span title="Products" style={{ background: '#f1f5f9', color: '#475569', padding: 4, borderRadius: 4 }}><Box size={14} /></span>
                                                )}
                                                {!cert.show_on_homepage && !cert.show_on_manufacturing && !cert.show_on_products && (
                                                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>-</span>
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`status-badge ${cert.status.toLowerCase()}`}>
                                                {cert.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                <Link to={`/admin/certificates/edit/${cert.id}`} className="btn-icon" title="Edit">
                                                    <Edit size={16} />
                                                </Link>
                                                <button onClick={() => handleDelete(cert.id, cert.name)} className="btn-icon delete" title="Delete">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CertificatesList;
