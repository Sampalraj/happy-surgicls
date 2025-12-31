import React, { useState, useEffect } from 'react';
import { Edit, Eye, Save, Plus, Trash2 } from 'lucide-react';
import { supabaseService } from '../../utils/supabaseService';
import ImageUploader from './components/ImageUploader';

const PageManager = () => {
    const [pages] = useState([
        { id: 'home', name: 'Home Page', slug: '/' },
        { id: 'about', name: 'About Us', slug: '/about' },
        { id: 'manufacturing', name: 'Manufacturing', slug: '/manufacturing' },
        { id: 'services', name: 'Services', slug: '/services' },
        { id: 'contact', name: 'Contact Us', slug: '/contact' }
    ]);

    const [editingPage, setEditingPage] = useState(null);
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleEdit = async (pageId) => {
        setLoading(true);
        try {
            const data = await supabaseService.getPageContent(pageId);
            setContent(data || {});
            setEditingPage(pageId);
            setMessage(null);
        } catch (error) {
            console.error(error);
            alert('Failed to load page content');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            await supabaseService.savePageContent(editingPage, content);
            setMessage({ type: 'success', text: 'Page content saved successfully!' });
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            console.error(error);
            setMessage({ type: 'error', text: 'Failed to save content.' });
        } finally {
            setLoading(false);
        }
    };

    const handleTextChange = (e, section = null) => {
        const { name, value } = e.target;
        if (section) {
            setContent(prev => ({
                ...prev,
                [section]: { ...prev[section], [name]: value }
            }));
        } else {
            setContent(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleImageChange = (key, base64) => {
        setContent(prev => ({ ...prev, [key]: base64 }));
    };

    const handleArrayChange = (index, field, value, arrayName) => {
        const newArray = [...content[arrayName]];
        newArray[index] = { ...newArray[index], [field]: value };
        setContent(prev => ({ ...prev, [arrayName]: newArray }));
    };

    const addItemToArray = (arrayName, defaultItem) => {
        setContent(prev => ({
            ...prev,
            [arrayName]: [...(prev[arrayName] || []), defaultItem]
        }));
    };

    const removeItem = (index, arrayName) => {
        const newArray = content[arrayName].filter((_, i) => i !== index);
        setContent(prev => ({ ...prev, [arrayName]: newArray }));
    };

    const renderPageEditor = () => {
        if (!content) return <div>Loading...</div>;

        switch (editingPage) {
            case 'home':
                return (
                    <div className="form-grid">
                        <h3 style={{ gridColumn: '1/-1' }}>Hero Section</h3>
                        <div className="form-group" style={{ gridColumn: '1/-1' }}>
                            <label className="form-label">Hero Title</label>
                            <input className="form-input" name="heroTitle" value={content.heroTitle || ''} onChange={handleTextChange} />
                        </div>
                        <div className="form-group" style={{ gridColumn: '1/-1' }}>
                            <label className="form-label">Hero Subtitle</label>
                            <textarea className="form-input" name="heroSubtitle" value={content.heroSubtitle || ''} onChange={handleTextChange} rows={2} />
                        </div>

                        <h3 style={{ gridColumn: '1/-1', marginTop: '1rem' }}>Statistics</h3>
                        <div className="form-group">
                            <label className="form-label">Years Experience</label>
                            <input className="form-input" name="experience" value={content.stats?.experience || ''} onChange={(e) => handleTextChange(e, 'stats')} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Products Count</label>
                            <input className="form-input" name="products" value={content.stats?.products || ''} onChange={(e) => handleTextChange(e, 'stats')} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Clients Count</label>
                            <input className="form-input" name="clients" value={content.stats?.clients || ''} onChange={(e) => handleTextChange(e, 'stats')} />
                        </div>

                        <h3 style={{ gridColumn: '1/-1', marginTop: '1rem' }}>Key Features</h3>
                        {content.features?.map((feature, i) => (
                            <div key={i} style={{ gridColumn: '1/-1', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,2fr) auto', gap: '1rem', alignItems: 'end', marginBottom: '0.5rem', background: '#f8fafc', padding: '1rem', borderRadius: 8 }}>
                                <div className="form-group" style={{ marginBottom: 0 }}>
                                    <label className="form-label">Title</label>
                                    <input className="form-input" value={feature.title} onChange={(e) => handleArrayChange(i, 'title', e.target.value, 'features')} />
                                </div>
                                <div className="form-group" style={{ marginBottom: 0 }}>
                                    <label className="form-label">Description</label>
                                    <input className="form-input" value={feature.desc} onChange={(e) => handleArrayChange(i, 'desc', e.target.value, 'features')} />
                                </div>
                                <button type="button" onClick={() => removeItem(i, 'features')} className="btn btn-danger-outline" style={{ padding: '0.5rem' }}><Trash2 size={16} /></button>
                            </div>
                        ))}
                        <button type="button" onClick={() => addItemToArray('features', { title: '', desc: '' })} className="btn btn-secondary" style={{ gridColumn: '1/-1' }}><Plus size={16} /> Add Feature</button>
                    </div>
                );

            case 'about':
                return (
                    <div className="form-grid">
                        <div className="form-group" style={{ gridColumn: '1/-1' }}>
                            <label className="form-label">Page Title</label>
                            <input className="form-input" name="title" value={content.title || ''} onChange={handleTextChange} />
                        </div>
                        <div className="form-group" style={{ gridColumn: '1/-1' }}>
                            <label className="form-label">Subtitle</label>
                            <input className="form-input" name="subtitle" value={content.subtitle || ''} onChange={handleTextChange} />
                        </div>
                        <ImageUploader
                            label="About Section Image"
                            value={content.image}
                            onChange={(val) => handleImageChange('image', val)}
                        />
                        <div className="form-group" style={{ gridColumn: '1/-1' }}>
                            <label className="form-label">Main Content</label>
                            <textarea className="form-input" name="content" value={content.content || ''} onChange={handleTextChange} rows={6} />
                        </div>
                        <div className="form-group" style={{ gridColumn: '1/-1' }}>
                            <label className="form-label">Mission Statement</label>
                            <textarea className="form-input" name="mission" value={content.mission || ''} onChange={handleTextChange} rows={3} />
                        </div>
                        <div className="form-group" style={{ gridColumn: '1/-1' }}>
                            <label className="form-label">Vision Statement</label>
                            <textarea className="form-input" name="vision" value={content.vision || ''} onChange={handleTextChange} rows={3} />
                        </div>

                        <h3 style={{ gridColumn: '1/-1', marginTop: '1rem' }}>Diagram Section (Difference)</h3>
                        <div className="form-group">
                            <label className="form-label">Section Title</label>
                            <input className="form-input" value={content.diagram?.title || ''} onChange={(e) => handleTextChange(e, 'diagram')} name="title" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Philosophy</label>
                            <input className="form-input" value={content.diagram?.philosophy || ''} onChange={(e) => handleTextChange(e, 'diagram')} name="philosophy" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">What We Do</label>
                            <input className="form-input" value={content.diagram?.whatWeDo || ''} onChange={(e) => handleTextChange(e, 'diagram')} name="whatWeDo" />
                        </div>

                        <h3 style={{ gridColumn: '1/-1', marginTop: '1rem' }}>Core Values</h3>
                        {content.coreValues?.map((val, i) => (
                            <div key={i} style={{ gridColumn: '1/-1', display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: '1rem', alignItems: 'end', marginBottom: '0.5rem', background: '#f8fafc', padding: '1rem', borderRadius: 8 }}>
                                <div className="form-group" style={{ marginBottom: 0 }}>
                                    <label className="form-label">Value</label>
                                    <input className="form-input" value={val.title} onChange={(e) => handleArrayChange(i, 'title', e.target.value, 'coreValues')} />
                                </div>
                                <div className="form-group" style={{ marginBottom: 0 }}>
                                    <label className="form-label">Description</label>
                                    <input className="form-input" value={val.desc} onChange={(e) => handleArrayChange(i, 'desc', e.target.value, 'coreValues')} />
                                </div>
                                <button type="button" onClick={() => removeItem(i, 'coreValues')} className="btn btn-danger-outline"><Trash2 size={16} /></button>
                            </div>
                        ))}
                        <button type="button" onClick={() => addItemToArray('coreValues', { title: '', desc: '' })} className="btn btn-secondary" style={{ gridColumn: '1/-1' }}><Plus size={16} /> Add Value</button>
                    </div>
                );

            case 'manufacturing':
                return (
                    <div className="form-grid">
                        <div className="form-group" style={{ gridColumn: '1/-1' }}>
                            <label className="form-label">Section Title</label>
                            <input className="form-input" name="title" value={content.title || ''} onChange={handleTextChange} />
                        </div>
                        <div className="form-group" style={{ gridColumn: '1/-1' }}>
                            <label className="form-label">Subtitle</label>
                            <input className="form-input" name="subtitle" value={content.subtitle || ''} onChange={handleTextChange} />
                        </div>
                        <ImageUploader
                            label="Manufacturing Image"
                            value={content.image}
                            onChange={(val) => handleImageChange('image', val)}
                        />
                        <div className="form-group" style={{ gridColumn: '1/-1' }}>
                            <label className="form-label">Description</label>
                            <textarea className="form-input" name="content" value={content.content || ''} onChange={handleTextChange} rows={4} />
                        </div>

                        <h3 style={{ gridColumn: '1/-1', marginTop: '1rem' }}>Facilities / Technologies</h3>
                        {content.facilities?.map((item, i) => (
                            <div key={i} style={{ gridColumn: '1/-1', display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: '1rem', alignItems: 'end', marginBottom: '0.5rem', background: '#f8fafc', padding: '1rem', borderRadius: 8 }}>
                                <div className="form-group" style={{ marginBottom: 0 }}>
                                    <label className="form-label">Technolgy/Facility</label>
                                    <input className="form-input" value={item.title} onChange={(e) => handleArrayChange(i, 'title', e.target.value, 'facilities')} />
                                </div>
                                <div className="form-group" style={{ marginBottom: 0 }}>
                                    <label className="form-label">Description</label>
                                    <input className="form-input" value={item.desc} onChange={(e) => handleArrayChange(i, 'desc', e.target.value, 'facilities')} />
                                </div>
                                <button type="button" onClick={() => removeItem(i, 'facilities')} className="btn btn-danger-outline"><Trash2 size={16} /></button>
                            </div>
                        ))}
                        <button type="button" onClick={() => addItemToArray('facilities', { title: '', desc: '' })} className="btn btn-secondary" style={{ gridColumn: '1/-1' }}><Plus size={16} /> Add Facility</button>
                    </div>
                );

            case 'services':
                return (
                    <div className="form-grid">
                        <div className="form-group" style={{ gridColumn: '1/-1' }}>
                            <label className="form-label">Title</label>
                            <input className="form-input" name="title" value={content.title || ''} onChange={handleTextChange} />
                        </div>
                        <div className="form-group" style={{ gridColumn: '1/-1' }}>
                            <label className="form-label">Subtitle</label>
                            <input className="form-input" name="subtitle" value={content.subtitle || ''} onChange={handleTextChange} />
                        </div>
                        <h3 style={{ gridColumn: '1/-1', marginTop: '1rem' }}>Service Offerings</h3>
                        {content.items?.map((item, i) => (
                            <div key={i} style={{ gridColumn: '1/-1', display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: '1rem', alignItems: 'end', marginBottom: '0.5rem', background: '#f8fafc', padding: '1rem', borderRadius: 8 }}>
                                <div className="form-group" style={{ marginBottom: 0 }}>
                                    <label className="form-label">Service Name</label>
                                    <input className="form-input" value={item.title} onChange={(e) => handleArrayChange(i, 'title', e.target.value, 'items')} />
                                </div>
                                <div className="form-group" style={{ marginBottom: 0 }}>
                                    <label className="form-label">Description</label>
                                    <input className="form-input" value={item.desc} onChange={(e) => handleArrayChange(i, 'desc', e.target.value, 'items')} />
                                </div>
                                <button type="button" onClick={() => removeItem(i, 'items')} className="btn btn-danger-outline"><Trash2 size={16} /></button>
                            </div>
                        ))}
                        <button type="button" onClick={() => addItemToArray('items', { title: '', desc: '' })} className="btn btn-secondary" style={{ gridColumn: '1/-1' }}><Plus size={16} /> Add Service</button>
                    </div>
                );

            case 'contact':
                return (
                    <div className="form-grid">
                        <div className="form-group" style={{ gridColumn: '1/-1' }}>
                            <label className="form-label">Page Title</label>
                            <input className="form-input" name="title" value={content.title || ''} onChange={handleTextChange} />
                        </div>
                        <div className="form-group" style={{ gridColumn: '1/-1' }}>
                            <label className="form-label">Subtitle</label>
                            <input className="form-input" name="subtitle" value={content.subtitle || ''} onChange={handleTextChange} />
                        </div>
                        <div className="form-group" style={{ gridColumn: '1/-1' }}>
                            <label className="form-label">Google Maps Embed URL</label>
                            <textarea className="form-input" name="mapUrl" value={content.mapUrl || ''} onChange={handleTextChange} rows={3} />
                            <small style={{ display: 'block', marginTop: '0.25rem', color: '#64748b' }}>Paste the "Embed a map" HTML source code or just the URL from Google Maps.</small>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Head Office Address</label>
                            <textarea className="form-input" name="address" value={content.contactInfo?.address || ''} onChange={(e) => handleTextChange(e, 'contactInfo')} rows={3} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Email Addresses</label>
                            <textarea className="form-input" name="email" value={content.contactInfo?.email || ''} onChange={(e) => handleTextChange(e, 'contactInfo')} rows={3} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Phone Numbers</label>
                            <textarea className="form-input" name="phone" value={content.contactInfo?.phone || ''} onChange={(e) => handleTextChange(e, 'contactInfo')} rows={3} />
                        </div>
                    </div>
                );

            default:
                return <div>Select a page to edit</div>;
        }
    };

    return (
        <div className="admin-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Page Manager</h1>
                    <p className="text-muted">Edit website page content</p>
                </div>
            </div>

            {message && (
                <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'}`} style={{ marginBottom: '1.5rem', padding: '1rem', borderRadius: '0.5rem', backgroundColor: message.type === 'success' ? '#ecfdf5' : '#fef2f2', color: message.type === 'success' ? '#047857' : '#b91c1c', border: `1px solid ${message.type === 'success' ? '#a7f3d0' : '#fecaca'}` }}>
                    {message.text}
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem' }}>
                {/* Sidebar List */}
                <div className="content-card" style={{ padding: 0, height: 'fit-content' }}>
                    <div style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>
                        Pages
                    </div>
                    <div>
                        {pages.map(page => (
                            <div
                                key={page.id}
                                onClick={() => handleEdit(page.id)}
                                style={{
                                    padding: '1rem',
                                    borderBottom: '1px solid #f1f5f9',
                                    cursor: 'pointer',
                                    background: editingPage === page.id ? '#f0f9ff' : 'white',
                                    color: editingPage === page.id ? '#0284c7' : 'inherit',
                                    borderLeft: editingPage === page.id ? '3px solid #0284c7' : '3px solid transparent',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <span>{page.name}</span>
                                {editingPage === page.id && <Edit size={14} />}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Editor Area */}
                <div className="content-card">
                    {editingPage ? (
                        <>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #e2e8f0' }}>
                                <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Editing: {pages.find(p => p.id === editingPage)?.name}</h2>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button className="btn btn-secondary" onClick={() => window.open(pages.find(p => p.id === editingPage)?.slug, '_blank')}>
                                        <Eye size={16} style={{ marginRight: '0.5rem' }} /> View Page
                                    </button>
                                    <button className="btn btn-primary" onClick={handleSave} disabled={loading}>
                                        <Save size={16} style={{ marginRight: '0.5rem' }} />
                                        {loading ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </div>

                            {renderPageEditor()}
                        </>
                    ) : (
                        <div style={{ padding: '4rem', textAlign: 'center', color: '#94a3b8' }}>
                            <Edit size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                            <h3>Select a page to start editing</h3>
                            <p>Choose a page from the list on the left to edit its content.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PageManager;
