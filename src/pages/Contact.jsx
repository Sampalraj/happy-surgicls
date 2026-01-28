import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, CheckCircle, Send } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { supabaseService } from '../utils/supabaseService';
import styles from './Contact.module.css';

const Contact = () => {
    // ... (state logic remains same)
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
        <div className={styles.contactPage}>
            {/* HERO SECTION */}
            <div className={styles.heroSection}>
                <div className={styles.heroGrid}>
                    <div style={{ position: 'relative', zIndex: 10 }}>
                        <div className={styles.heroBadge}>
                            GET IN TOUCH
                        </div>
                        <h1 className={styles.heroTitle}>
                            {content.title}
                        </h1>
                        <p className={styles.heroSubtitle}>
                            {content.subtitle}
                        </p>
                    </div>

                    <div className={styles.heroImageWrapper}>
                        <img
                            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            alt="Contact Hero"
                            className={styles.heroImage}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.contentSection}>
                <div className={styles.contentGrid}>

                    {/* LEFT: Contact Info Cards */}
                    <div className={styles.infoStack}>
                        <div className={`${styles.infoCard} ${styles.borderGreen}`}>
                            <div className={styles.cardHeader}>
                                <MapPin size={20} color="#1ABC9C" />
                                <h3 className={styles.cardTitle}>Our Location</h3>
                            </div>
                            <p className={styles.cardText} style={{ whiteSpace: 'pre-line' }}>{content.contactInfo?.address || 'Houston, TX'}</p>
                        </div>

                        <div className={`${styles.infoCard} ${styles.borderBlue}`}>
                            <div className={styles.cardHeader}>
                                <Mail size={20} color="#3498DB" />
                                <h3 className={styles.cardTitle}>Email Us</h3>
                            </div>
                            <p className={styles.cardText}>{content.contactInfo?.email}</p>
                        </div>

                        <div className={`${styles.infoCard} ${styles.borderOrange}`}>
                            <div className={styles.cardHeader}>
                                <Phone size={20} color="#F39C12" />
                                <h3 className={styles.cardTitle}>Call Us</h3>
                            </div>
                            <p className={styles.cardText}>{content.contactInfo?.phone}</p>
                        </div>
                    </div>

                    {/* RIGHT: Form */}
                    <div className={styles.formContainer}>
                        <h2 className={styles.formTitle}>Send us a Message</h2>
                        <form onSubmit={handleSubmit} className={styles.formGrid}>
                            <div className={styles.rowTwoCols}>
                                <div>
                                    <label className={styles.formLabel}>Your Name</label>
                                    <input name="name" value={formData.name} onChange={handleChange} required
                                        className={styles.formInput} placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className={styles.formLabel}>Email Address</label>
                                    <input name="email" value={formData.email} onChange={handleChange} required
                                        className={styles.formInput} placeholder="name@company.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className={styles.formLabel}>Subject</label>
                                <input name="subject" value={formData.subject} onChange={handleChange} required
                                    className={styles.formInput} placeholder="Inquiry about..."
                                />
                            </div>

                            <div>
                                <label className={styles.formLabel}>Message</label>
                                <textarea name="message" value={formData.message} onChange={handleChange} required rows="5"
                                    className={styles.formTextarea} placeholder="How can we help you?"
                                />
                            </div>

                            <button type="submit" disabled={loading} className={styles.submitBtn}>
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
