import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { mockBackend } from '../utils/mockBackend';
import '../styles/home.css';

const Contact = () => {
    const [searchParams] = useSearchParams();
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [content, setContent] = useState({
        title: 'Contact Us',
        subtitle: 'We\'d love to hear from you.',
        mapUrl: '',
        contactInfo: {
            address: 'Loading...',
            email: 'Loading...',
            phone: 'Loading...'
        }
    });

    useEffect(() => {
        const subjectParam = searchParams.get('subject');
        if (subjectParam) {
            setFormData(prev => ({ ...prev, subject: subjectParam }));
        }

        const pageContent = mockBackend.getPageContent('contact');
        if (pageContent) {
            setContent(prev => ({ ...prev, ...pageContent }));
        }
    }, [searchParams]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        mockBackend.saveEnquiry({
            ...formData,
            source: 'Contact Page'
        });
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    if (submitted) {
        return (
            <div className="contact-page" style={{ padding: '8rem 0', textAlign: 'center' }}>
                <div className="container">
                    <div style={{ background: '#e6fffa', display: 'inline-block', padding: '2rem', borderRadius: '50%' }}>
                        <Send size={48} color="#38a169" />
                    </div>
                    <h2 style={{ fontSize: '2.5rem', margin: '2rem 0 1rem' }}>Thank You!</h2>
                    <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
                        Your enquiry has been successfully submitted. Our team will get back to you shortly.
                    </p>
                    <button onClick={() => setSubmitted(false)} className="btn btn-primary" style={{ marginTop: '2rem' }}>
                        Send Another Message
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="contact-page">
            {/* Page Header */}
            <div className="page-header-bg" style={{ background: '#f8f9fa', padding: '6rem 0 4rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: '800', color: '#1a202c', marginBottom: '1rem' }}>{content.title}</h1>
                <p style={{ color: '#718096', fontSize: '1.1rem' }}>{content.subtitle}</p>
            </div>

            <div className="container" style={{ padding: '5rem 0' }}>
                <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>

                    {/* Contact Info */}
                    <div className="contact-info">
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ width: '5px', height: '25px', background: 'var(--color-primary)', display: 'block' }}></span>
                            Get In Touch
                        </h3>

                        <div className="info-item" style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
                            <div style={{ background: '#ebf8ff', padding: '1rem', borderRadius: '50%', height: 'fit-content' }}>
                                <MapPin size={24} color="var(--color-primary)" />
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Our Location</h4>
                                <p style={{ color: '#666', lineHeight: '1.6', whiteSpace: 'pre-line' }}>
                                    {content.contactInfo?.address || content.headOffice /* fallback if old data */}
                                </p>
                            </div>
                        </div>

                        <div className="info-item" style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
                            <div style={{ background: '#ebf8ff', padding: '1rem', borderRadius: '50%', height: 'fit-content' }}>
                                <Mail size={24} color="var(--color-primary)" />
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Email Us</h4>
                                <p style={{ color: '#666', whiteSpace: 'pre-line' }}>{content.contactInfo?.email}</p>
                            </div>
                        </div>

                        <div className="info-item" style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
                            <div style={{ background: '#ebf8ff', padding: '1rem', borderRadius: '50%', height: 'fit-content' }}>
                                <Phone size={24} color="var(--color-primary)" />
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Call Us</h4>
                                <p style={{ color: '#666', whiteSpace: 'pre-line' }}>{content.contactInfo?.phone}</p>
                            </div>
                        </div>

                    </div>

                    {/* Contact Form */}
                    <div className="contact-form-wrapper" style={{ background: 'white', padding: '3rem', borderRadius: '12px', boxShadow: 'var(--shadow-lg)' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Send us a Message</h3>
                        <form onSubmit={handleSubmit}>
                            {/* ... Fields ... */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                <div className="form-group">
                                    <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Your Name</label>
                                    <input name="name" value={formData.name} onChange={handleChange} type="text" required className="form-input" style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="John Doe" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email Address</label>
                                    <input name="email" value={formData.email} onChange={handleChange} type="email" required className="form-input" style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="john@example.com" />
                                </div>
                            </div>

                            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Subject</label>
                                <input name="subject" value={formData.subject} onChange={handleChange} type="text" required className="form-input" style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="Product Inquiry" />
                            </div>

                            <div className="form-group" style={{ marginBottom: '2rem' }}>
                                <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Message</label>
                                <textarea name="message" value={formData.message} onChange={handleChange} required className="form-input" rows="5" style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="How can we help you?"></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
