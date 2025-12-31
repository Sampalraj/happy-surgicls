import React, { useState, useEffect } from 'react';
import { Save, Globe, Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { supabaseService } from '../../utils/supabaseService';
import ImageUploader from './components/ImageUploader';

const GeneralSettings = () => {
    const [settings, setSettings] = useState({
        siteName: '',
        logo: '',
        phone: '',
        email: '',
        address: '',
        socials: {
            facebook: '',
            twitter: '',
            linkedin: '',
            instagram: ''
        }
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const data = await supabaseService.getSettings();
                if (data && Object.keys(data).length > 0) {
                    // Ensure nested objects exist to prevent collision with default state
                    setSettings(prev => ({
                        ...prev,
                        ...data,
                        socials: { ...prev.socials, ...(data.socials || {}) }
                    }));
                }
            } catch (error) {
                console.error('Error loading settings:', error);
            }
        };
        loadSettings();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setSettings(prev => ({
                ...prev,
                [parent]: { ...prev[parent], [child]: value }
            }));
        } else {
            setSettings(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleLogoChange = (base64Image) => {
        setSettings(prev => ({ ...prev, logo: base64Image }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await supabaseService.saveSettings(settings);
            setMessage({ type: 'success', text: 'Settings updated successfully!' });
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            console.error('Error saving settings:', error);
            setMessage({ type: 'error', text: 'Failed to save settings' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">General Settings</h1>
                    <p className="text-muted">Manage global site information</p>
                </div>
            </div>

            {message && (
                <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'}`} style={{ marginBottom: '1.5rem', padding: '1rem', borderRadius: '0.5rem', backgroundColor: message.type === 'success' ? '#ecfdf5' : '#fef2f2', color: message.type === 'success' ? '#047857' : '#b91c1c', border: `1px solid ${message.type === 'success' ? '#a7f3d0' : '#fecaca'}` }}>
                    {message.text}
                </div>
            )}

            <div className="content-card">
                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label className="form-label">Site Name</label>
                            <div style={{ position: 'relative' }}>
                                <Globe size={18} style={{ position: 'absolute', top: 12, left: 10, color: '#94a3b8' }} />
                                <input
                                    type="text"
                                    name="siteName"
                                    className="form-control"
                                    value={settings.siteName}
                                    onChange={handleChange}
                                    placeholder="e.g. Happy Surgicals"
                                    style={{ paddingLeft: '2.5rem' }}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <ImageUploader
                                label="Site Logo"
                                value={settings.logo}
                                onChange={handleLogoChange}
                                helpText="Recommended: 200x60px PNG/SVG"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Phone Number</label>
                            <div style={{ position: 'relative' }}>
                                <Phone size={18} style={{ position: 'absolute', top: 12, left: 10, color: '#94a3b8' }} />
                                <input
                                    type="text"
                                    name="phone"
                                    value={settings.phone}
                                    onChange={handleChange}
                                    className="form-control"
                                    style={{ paddingLeft: '2.5rem' }}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={18} style={{ position: 'absolute', top: 12, left: 10, color: '#94a3b8' }} />
                                <input
                                    type="email"
                                    name="email"
                                    value={settings.email}
                                    onChange={handleChange}
                                    className="form-control"
                                    style={{ paddingLeft: '2.5rem' }}
                                />
                            </div>
                        </div>

                        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                            <label className="form-label">Office Address</label>
                            <div style={{ position: 'relative' }}>
                                <MapPin size={18} style={{ position: 'absolute', top: 12, left: 10, color: '#94a3b8' }} />
                                <textarea
                                    name="address"
                                    value={settings.address}
                                    onChange={handleChange}
                                    className="form-control"
                                    style={{ paddingLeft: '2.5rem', minHeight: '80px', resize: 'vertical' }}
                                />
                            </div>
                        </div>

                        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                            <label className="form-label">Footer Description</label>
                            <textarea
                                name="footerDesc"
                                value={settings.footerDesc || ''}
                                onChange={handleChange}
                                className="form-control"
                                rows={2}
                                placeholder="Short company description for footer..."
                            />
                        </div>
                    </div>

                    <h3 className="section-title" style={{ marginTop: '2rem', marginBottom: '1rem' }}>Social Media Links</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label className="form-label">Facebook</label>
                            <div style={{ position: 'relative' }}>
                                <Facebook size={18} style={{ position: 'absolute', top: 12, left: 10, color: '#94a3b8' }} />
                                <input
                                    type="text"
                                    name="social.facebook"
                                    value={settings.socials?.facebook || ''}
                                    onChange={handleChange}
                                    className="form-control"
                                    style={{ paddingLeft: '2.5rem' }}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Twitter / X</label>
                            <div style={{ position: 'relative' }}>
                                <Twitter size={18} style={{ position: 'absolute', top: 12, left: 10, color: '#94a3b8' }} />
                                <input
                                    type="text"
                                    name="social.twitter"
                                    value={settings.socials?.twitter || ''}
                                    onChange={handleChange}
                                    className="form-control"
                                    style={{ paddingLeft: '2.5rem' }}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">LinkedIn</label>
                            <div style={{ position: 'relative' }}>
                                <Linkedin size={18} style={{ position: 'absolute', top: 12, left: 10, color: '#94a3b8' }} />
                                <input
                                    type="text"
                                    name="social.linkedin"
                                    value={settings.socials?.linkedin || ''}
                                    onChange={handleChange}
                                    className="form-control"
                                    style={{ paddingLeft: '2.5rem' }}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Instagram</label>
                            <div style={{ position: 'relative' }}>
                                <Instagram size={18} style={{ position: 'absolute', top: 12, left: 10, color: '#94a3b8' }} />
                                <input
                                    type="text"
                                    name="social.instagram"
                                    value={settings.socials?.instagram || ''}
                                    onChange={handleChange}
                                    className="form-control"
                                    style={{ paddingLeft: '2.5rem' }}
                                />
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1rem', borderTop: '1px solid #e2e8f0', marginTop: '2rem' }}>
                        <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Save size={18} /> {loading ? 'Saving...' : 'Save Settings'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GeneralSettings;
