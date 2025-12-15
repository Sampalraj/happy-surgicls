import React from 'react';
import { Link } from 'react-router-dom';

const Manufacturing = () => {
    return (
        <div style={{ padding: '5rem 0', background: '#f8fafc', minHeight: '80vh' }}>
            <div className="container">
                <div style={{ background: 'white', padding: '3rem', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                    <h1 style={{ color: '#1e3a8a', fontSize: '2.5rem', marginBottom: '1.5rem' }}>Manufacturing Excellence</h1>
                    <p style={{ color: '#64748b', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto 2rem' }}>
                        Our state-of-the-art manufacturing facility operates under strict ISO 13485:2016 and GMP guidelines.
                        We combine advanced automation with skilled craftsmanship.
                    </p>
                    <div style={{ height: '300px', background: '#e2e8f0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                        <span style={{ color: '#94a3b8' }}>Factory Video / Tour Placeholder</span>
                    </div>
                    <Link to="/contact" className="btn btn-primary" style={{ display: 'inline-block', padding: '0.8rem 2rem', background: '#1e3a8a', color: 'white', textDecoration: 'none', borderRadius: '6px' }}>
                        Schedule a Factory Visit
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Manufacturing;
