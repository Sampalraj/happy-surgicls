import React, { useState, useEffect } from 'react';
import { Truck, Users, Activity, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabaseService } from '../utils/supabaseService';

import styles from './Services.module.css';

const Services = () => {
    const [content, setContent] = useState({
        title: 'Our Services',
        subtitle: 'Comprehensive healthcare solutions for hospitals, clinics, and distributors.',
        items: []
    });

    useEffect(() => {
        const loadContent = async () => {
            const data = await supabaseService.getPageContent('services');
            if (data) {
                setContent(prev => ({ ...prev, ...data }));
            }
        };
        loadContent();
    }, []);

    return (
        <div className={styles.servicesPage}>
            {/* Hero */}
            <section className={styles.heroSection}>
                <div className={styles.container}>
                    <h1 className={styles.heroTitle}>{content.title}</h1>
                    <p className={styles.heroSubtitle}>
                        {content.subtitle}
                    </p>
                </div>
            </section>

            {/* Service 1: Rentals */}
            <section className={styles.serviceSection}>
                <div className={styles.container}>
                    <div className={`${styles.serviceGrid} ${styles.gridLeft}`}>
                        <div>
                            <div className={`${styles.serviceIcon} ${styles.iconRed}`}><Activity size={48} /></div>
                            <h2 className={styles.serviceTitle}>Medical Equipment Rental</h2>
                            <p className={styles.serviceDescription}>
                                We provide high-end medical equipment on flexible rental terms. Ideal for home care setups or hospitals needing temporary capacity expansion during peak loads.
                            </p>
                            <ul className={styles.serviceList}>
                                <li>• Ventilators & BiPAPs</li>
                                <li>• Oxygen Concentrators (5L/10L)</li>
                                <li>• Cardiac Monitors & Pulse Oximeters</li>
                                <li>• Hospital Beds (ICU/Fowler)</li>
                            </ul>
                            <Link to="/contact" className={`${styles.btn} ${styles.btnPrimaryRed}`}>Request Rental Quote</Link>
                        </div>
                        <div>
                            <img src="/services-rental.jpg" alt="Equipment Rental" className={styles.serviceImage}
                                onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=Medical+Equipment+Rental' }} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Service 2: Bulk Supply */}
            <section className={`${styles.serviceSection} ${styles.bgLight}`}>
                <div className={styles.container}>
                    <div className={`${styles.serviceGrid} ${styles.gridRight}`}>
                        <div>
                            <img src="/services-bulk.jpg" alt="Bulk Supply" className={styles.serviceImage}
                                onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=Bulk+Supply' }} />
                        </div>
                        <div>
                            <div className={`${styles.serviceIcon} ${styles.iconBlue}`}><Truck size={48} /></div>
                            <h2 className={styles.serviceTitle}>Bulk Supply for Hospitals</h2>
                            <p className={styles.serviceDescription}>
                                End-to-end procurement solutions for large institutions. We offer competitive tiered pricing for bulk orders of consumables, disposables, and furniture.
                            </p>
                            <p className={`${styles.serviceDescription} ${styles.italic}`}>
                                "Trusted by over 150+ Hospitals across India for timely supplies."
                            </p>
                            <Link to="/contact" className={`${styles.btn} ${styles.btnPrimaryBlue}`}>Get Institutional Rates</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service 3: Partnerships */}
            <section className={styles.serviceSection}>
                <div className={styles.container}>
                    <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                        <div className={`${styles.serviceIcon} ${styles.iconRed}`} style={{ display: 'flex', justifyContent: 'center' }}><Users size={48} /></div>
                        <h2 className={styles.serviceTitle}>Distributor Partnership Program</h2>
                        <p className={styles.serviceDescription}>
                            We are expanding our network! Join us as an authorized dealer or distributor. We provide complete marketing support, attractive margins, and product training to help you grow.
                        </p>
                        <Link to="/contact" className={`${styles.btn} ${styles.btnOutlineRed}`}>Apply for Partnership</Link>
                    </div>
                </div>
            </section>

            {/* Contact Strip */}
            <section className={styles.contactStrip}>
                <div className={styles.container}>
                    <div className={styles.contactContent}>
                        <Phone /> <span>Need immediate assistance? Call our Support Line: <strong>+91 98765 43210</strong></span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;
