import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, CheckCircle, Send } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { supabaseService } from '../utils/supabaseService';
import styles from './Home.module.css';

const Contact = () => {
    const [searchParams] = useSearchParams();
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', subject: '', message: ''
    });

    const [content, setContent] = useState({
        title: 'Contact Us',
        subtitle: 'We\'d love to hear from you.',
        contactInfo: { address: 'Loading...', email: 'Loading...', phone: 'Loading...' }
    });

    useEffect(() => {
        const subjectParam = searchParams.get('subject');
        if (subjectParam) setFormData(prev => ({ ...prev, subject: subjectParam }));

        const fetchContent = async () => {
            const pageContent = await supabaseService.getPageContent('contact');
            if (pageContent) setContent(prev => ({ ...prev, ...pageContent }));
        };
        fetchContent();
    }, [searchParams]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await supabaseService.submitEnquiry({ ...formData, source: 'Contact Page' });
            setSubmitted(true);
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        } catch (error) {
            alert('Failed to send message.');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div style={{ padding: '8rem 0', textAlign: 'center', background: '#F8F9FA' }}>
                <div style={{ maxWidth: '600px', margin: '0 auto', background: 'white', padding: '3rem', borderRadius: '4px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                    <div style={{ background: '#E0F2F1', display: 'inline-flex', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
                        <CheckCircle size={48} color="#1ABC9C" />
                    </div>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#2C3E50' }}>Message Sent!</h2>
                    <p style={{ color: '#64748B', lineHeight: '1.6' }}>
                        Thank you for reaching out. A member of our team will review your enquiry and get back to you within 24 hours.
                    </p>
                    <button
                        onClick={() => setSubmitted(false)}
                        style={{ marginTop: '2rem', padding: '0.8rem 2rem', background: '#1ABC9C', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        Send Another Message
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ fontFamily: "'Inter', sans-serif" }}>
            {/* HERO SECTION (Split Layout) */}
            <div className={styles.heroSection} style={{ padding: '4rem 2rem', background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                    <div style={{ position: 'relative', zIndex: 10 }}>
                        <div style={{
                            display: 'inline-block', padding: '0.5rem 1rem', background: '#E0F2F1',
                            color: '#16A085', fontWeight: 'bold', fontSize: '0.85rem',
                            marginBottom: '1.5rem', letterSpacing: '0.05em'
                        }}>
                            GET IN TOUCH
                        </div>
                        <h1 style={{ fontSize: '3rem', fontWeight: '800', lineHeight: '1.1', color: '#2C3E50', marginBottom: '1rem' }}>
                            {content.title}
                        </h1>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#64748B', maxWidth: '500px' }}>
                            {content.subtitle}
                        </p>
                    </div>

                    <div className={styles.heroImageWrapper} style={{ height: '350px' }}>
                        <div className={styles.heroSlash}></div>
                        <img
                            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            alt="Contact Hero"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'relative', zIndex: 2 }}
                        />
                    </div>
                </div>
            </div>

            <div style={{ background: '#F8F9FA', padding: '5rem 2rem' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '4rem' }}>

                    {/* LEFT: Contact Info Cards */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ background: 'white', padding: '2rem', borderLeft: '4px solid #1ABC9C', boxShadow: '0 2px 4px rgba(0,0,0,0.03)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                <MapPin size={20} color="#1ABC9C" />
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#2C3E50' }}>Our Location</h3>
                            </div>
                            <p style={{ color: '#64748B', paddingLeft: '2.25rem', whiteSpace: 'pre-line' }}>{content.contactInfo?.address || 'Houston, TX'}</p>
                        </div>

                        <div style={{ background: 'white', padding: '2rem', borderLeft: '4px solid #3498DB', boxShadow: '0 2px 4px rgba(0,0,0,0.03)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                <Mail size={20} color="#3498DB" />
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#2C3E50' }}>Email Us</h3>
                            </div>
                            <p style={{ color: '#64748B', paddingLeft: '2.25rem' }}>{content.contactInfo?.email}</p>
                        </div>

                        <div style={{ background: 'white', padding: '2rem', borderLeft: '4px solid #F39C12', boxShadow: '0 2px 4px rgba(0,0,0,0.03)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                <Phone size={20} color="#F39C12" />
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#2C3E50' }}>Call Us</h3>
                            </div>
                            <p style={{ color: '#64748B', paddingLeft: '2.25rem' }}>{content.contactInfo?.phone}</p>
                        </div>
                    </div>

                    {/* RIGHT: Form */}
                    <div style={{ background: 'white', padding: '3rem', borderRadius: '4px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2C3E50', marginBottom: '2rem' }}>Send us a Message</h2>
                        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.9rem', color: '#4B5563', marginBottom: '0.5rem', fontWeight: 500 }}>Your Name</label>
                                    <input name="name" value={formData.name} onChange={handleChange} required
                                        style={{ width: '100%', padding: '0.75rem', border: '1px solid #E2E8F0', borderRadius: '4px', fontSize: '1rem' }} placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.9rem', color: '#4B5563', marginBottom: '0.5rem', fontWeight: 500 }}>Email Address</label>
                                    <input name="email" value={formData.email} onChange={handleChange} required
                                        style={{ width: '100%', padding: '0.75rem', border: '1px solid #E2E8F0', borderRadius: '4px', fontSize: '1rem' }} placeholder="name@company.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.9rem', color: '#4B5563', marginBottom: '0.5rem', fontWeight: 500 }}>Subject</label>
                                <input name="subject" value={formData.subject} onChange={handleChange} required
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #E2E8F0', borderRadius: '4px', fontSize: '1rem' }} placeholder="Inquiry about..."
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.9rem', color: '#4B5563', marginBottom: '0.5rem', fontWeight: 500 }}>Message</label>
                                <textarea name="message" value={formData.message} onChange={handleChange} required rows="5"
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #E2E8F0', borderRadius: '4px', fontSize: '1rem', fontFamily: 'inherit' }} placeholder="How can we help you?"
                                />
                            </div>

                            <button type="submit" disabled={loading} style={{
                                background: '#2C3E50', color: 'white', padding: '1rem',
                                border: 'none', borderRadius: '4px', fontSize: '1rem', fontWeight: 'bold',
                                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
                            }}>
                                {loading ? 'Sending...' : <><Send size={18} /> Send Message</>}
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contact;
