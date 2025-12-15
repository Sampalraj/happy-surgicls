import React, { useState } from 'react';
import { Save, Upload } from 'lucide-react';

const Branding = () => {
    const [siteName, setSiteName] = useState('Happy Surgicals');
    const [tagline, setTagline] = useState('Quality Surgical Instruments');

    return (
        <div className="branding-page">
            <h2 style={{ marginBottom: '2rem', fontSize: '1.5rem', fontWeight: 'bold' }}>Branding Management</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>

                {/* Card 1: Logo Management */}
                <div className="card" style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: 'var(--shadow-sm)' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Logo</h3>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <div style={{ width: '100%', height: '150px', background: '#f4f6f8', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', marginBottom: '1rem' }}>
                            <img src="/logo.png" alt="Current Logo" style={{ maxHeight: '100px', maxWidth: '80%' }} />
                        </div>
                        <p style={{ fontSize: '0.9rem', color: '#666' }}>Current Logo Preview</p>
                    </div>

                    <button className="btn btn-secondary" style={{ width: '100%' }}>
                        <Upload size={16} style={{ marginRight: '8px' }} /> Upload New Logo
                    </button>
                </div>

                {/* Card 2: Website Identity */}
                <div className="card" style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: 'var(--shadow-sm)' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Website Identity</h3>

                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Website Name</label>
                        <input
                            type="text"
                            value={siteName}
                            onChange={(e) => setSiteName(e.target.value)}
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                    </div>

                    <div className="form-group" style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Tagline</label>
                        <input
                            type="text"
                            value={tagline}
                            onChange={(e) => setTagline(e.target.value)}
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                    </div>

                    <button className="btn btn-primary" style={{ width: '100%' }}>
                        <Save size={16} style={{ marginRight: '8px' }} /> Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Branding;
