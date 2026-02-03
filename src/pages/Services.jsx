import React from 'react';
import { Truck, Users, Activity, ArrowRight, Settings, ShieldCheck, Microscope } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './Services.module.css';

const Services = () => {
    const services = [
        {
            icon: <Activity size={24} />,
            title: 'Equipment Rental',
            desc: 'Flexible rental terms for high-end medical equipment. Ideal for temporary capacity expansion.',
            list: ['Ventilators & BiPAPs', 'Oxygen Concentrators', 'Cardiac Monitors', 'ICU Beds'],
            link: '/contact'
        },
        {
            icon: <Truck size={24} />,
            title: 'Bulk Supply',
            desc: 'End-to-end procurement for hospitals. Tiered pricing for consumables and disposables.',
            list: ['Consumables', 'Surgical Disposables', 'Ward Furniture', 'Bulk Order discounts'],
            link: '/contact'
        },
        {
            icon: <Users size={24} />,
            title: 'Distributor Program',
            desc: 'Join our network as an authorized dealer. We provide marketing support and training.',
            list: ['Attractive Margins', 'Marketing Support', 'Product Training', 'Exclusive Territories'],
            link: '/contact'
        },
        {
            icon: <Settings size={24} />,
            title: 'Maintenance',
            desc: 'Annual Maintenance Contracts (AMC) and on-demand repair services for all equipment.',
            list: ['Preventive Maintenance', 'Calibration Services', 'Spare Parts', '24/7 Support'],
            link: '/contact'
        },
        {
            icon: <ShieldCheck size={24} />,
            title: 'Sterilization',
            desc: 'CSSD planning and sterilization assurance products for infection control.',
            list: ['Autoclaves', 'Sterilization Rolls', 'Indicators', 'Consultancy'],
            link: '/contact'
        },
        {
            icon: <Microscope size={24} />,
            title: 'Lab Setup',
            desc: 'Turnkey solutions for pathology and microbiology laboratory setup.',
            list: ['Analyzers', 'Microscopes', 'Reagents', 'Lab Furniture'],
            link: '/contact'
        }
    ];

    return (
        <div className={styles.servicesPage}>
            <div className={styles.container}>
                {/* Header */}
                <div className={styles.headerSection}>
                    <h1 className={styles.title}>Comprehensive Medical Services</h1>
                    <p className={styles.subtitle}>
                        We go beyond manufacturing to provide a complete ecosystem of healthcare solutions for hospitals and distributors.
                    </p>
                </div>

                {/* 3-Column Grid */}
                <div className={styles.servicesGrid}>
                    {services.map((service, index) => (
                        <div key={index} className={styles.serviceCard}>
                            <div className={styles.cardIcon}>
                                {service.icon}
                            </div>
                            <h3 className={styles.cardTitle}>{service.title}</h3>
                            <p className={styles.cardDescription}>{service.desc}</p>
                            <ul className={styles.cardList}>
                                {service.list.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                            <Link to={service.link} className={styles.cardLink}>
                                Learn More <ArrowRight size={16} />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;
