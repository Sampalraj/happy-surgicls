import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, ShieldCheck, Home, Factory, Box } from 'lucide-react';
import { supabaseService } from '../../utils/supabaseService';

const CertificatesList = () => {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCertificates();
    }, []);

    const loadCertificates = async () => {
        setLoading(true);
        try {
            const data = await supabaseService.getCertificates();
            setCertificates(data);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const handleDelete = async (id, certName) => {
        if (window.confirm(`Are you sure you want to delete "${certName}"?\n\nThis action cannot be undone.`)) {
            try {
                await supabaseService.deleteCertificate(id);
                loadCertificates();
            } catch (error) {
                console.error(error);
                alert('Failed to delete certificate');
            }
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
                                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Added: {new Date(cert.created_at).toLocaleDateString()}</div>
                                        </td>
                                        <td>
                                            <span style={{
                                                background: '#eff6ff', color: '#1d4ed8',
                                                padding: '0.25rem 0.5rem', borderRadius: 4, fontSize: '0.75rem', fontWeight: '500'
                                            }}>
                                                Standard
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                {cert.show_on_products ? (
                                                    <span title="Products" style={{ background: '#f1f5f9', color: '#475569', padding: 4, borderRadius: 4 }}><Box size={14} /> Product Pages</span>
                                                ) : (
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
