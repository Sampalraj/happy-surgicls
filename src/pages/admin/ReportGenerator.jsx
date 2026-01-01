import React, { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
// import { mockBackend } from '../../utils/mockBackend';

const ReportGenerator = () => {
    const [config, setConfig] = useState({
        scope: 'Company', // Company, Category, Product, Certificate
        targetId: '',
        includeInactive: false,
        sections: {
            companyInfo: true,
            certSummary: true,
            complianceDetails: true,
            exceptions: true,
            auditLog: true
        }
    });

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [certificates, setCertificates] = useState([]);

    useEffect(() => {
        // const stats = mockBackend.getStats();
        const stats = { products: 0, categories: 0 };
        // setReportData(stats);
    }, []);

    const handleSectionToggle = (key) => {
        setConfig({
            ...config,
            sections: { ...config.sections, [key]: !config.sections[key] }
        });
    };

    const handleGenerate = () => {
        // Construct query params
        const params = new URLSearchParams({
            scope: config.scope,
            targetId: config.targetId,
            includeInactive: config.includeInactive,
            sections: JSON.stringify(config.sections), // Pass sections config
            generatedBy: 'Admin User', // Hardcoded for demo
            timestamp: new Date().toISOString()
        });

        // Open print view in new tab
        window.open(`/admin/reports/print?${params.toString()}`, '_blank');
    };

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h1 className="admin-title">Compliance Audit Report Generator</h1>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                    Generate official compliance documentation for audits and tenders.
                </div>
            </div>

            <div className="admin-card" style={{ maxWidth: '800px', margin: '0 auto' }}>

                {/* A. REPORT SCOPE */}
                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginBottom: '1rem' }}>1. Report Scope</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                        {['Company', 'Category', 'Product', 'Certificate'].map(scope => (
                            <div
                                key={scope}
                                onClick={() => setConfig({ ...config, scope, targetId: '' })}
                                style={{
                                    padding: '1rem',
                                    border: config.scope === scope ? '2px solid #004daa' : '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    background: config.scope === scope ? '#f0f9ff' : 'white',
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                    fontWeight: '500'
                                }}
                            >
                                {scope}
                            </div>
                        ))}
                    </div>
                </div>

                {/* B. TARGET SELECTION (Conditional) */}
                {config.scope !== 'Company' && (
                    <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginBottom: '1rem' }}>2. Select Target</h3>
                        <div className="form-group">
                            <label className="form-label">
                                Select {config.scope} <span style={{ color: 'red' }}>*</span>
                            </label>
                            <select
                                className="form-control"
                                value={config.targetId}
                                onChange={(e) => setConfig({ ...config, targetId: e.target.value })}
                            >
                                <option value="">-- Select --</option>
                                {config.scope === 'Category' && Array.isArray(categories) && categories.map(c => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                                {config.scope === 'Product' && Array.isArray(products) && products.map(p => (
                                    <option key={p.id} value={p.id}>{p.name} ({p.category})</option>
                                ))}
                                {config.scope === 'Certificate' && Array.isArray(certificates) && certificates.map(c => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}

                {/* C. CONTENT CONFIGURATION */}
                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginBottom: '1rem' }}>3. Report Content</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        {[
                            { key: 'companyInfo', label: 'Company & Manufacturer Info' },
                            { key: 'certSummary', label: 'Certificates Summary' },
                            { key: 'complianceDetails', label: 'Compliance Details (Product/Category)' },
                            { key: 'exceptions', label: 'Compliance Exceptions / Overrides' },
                            { key: 'auditLog', label: 'Audit Log Summary' }
                        ].map(section => (
                            <label key={section.key} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={config.sections[section.key]}
                                    onChange={() => handleSectionToggle(section.key)}
                                    style={{ width: 16, height: 16 }}
                                />
                                <span style={{ fontSize: '0.95rem' }}>{section.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* D. ACTIONS */}
                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                    <button className="btn btn-secondary" style={{ display: 'flex', gap: '0.5rem' }}>
                        Cancel
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={handleGenerate}
                        disabled={config.scope !== 'Company' && !config.targetId}
                        style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem 1.5rem', opacity: (config.scope !== 'Company' && !config.targetId) ? 0.5 : 1 }}
                    >
                        <FileText size={18} /> Generate PDF Report
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ReportGenerator;
