import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Truck, Users } from 'lucide-react';

const MegaMenu = ({ isVisible, onClose }) => {
    if (!isVisible) return null;

    return (
        <div className="megamenu-overlay" onClick={onClose}>
            <div className="megamenu-container" onClick={(e) => e.stopPropagation()}>
                <div className="megamenu-grid">
                    {/* Column 1: Medical Consumables */}
                    <div className="megamenu-column">
                        <h4 className="megamenu-title">Medical Consumables</h4>
                        <ul className="megamenu-list">
                            <li><Link to="/products?category=consumables" onClick={onClose}>Surgical Gloves</Link></li>
                            <li><Link to="/products?category=consumables" onClick={onClose}>Examination Gloves</Link></li>
                            <li><Link to="/products?category=consumables" onClick={onClose}>Face Masks (3 Ply, N95)</Link></li>
                            <li><Link to="/products?category=consumables" onClick={onClose}>PPE Kits</Link></li>
                            <li><Link to="/products?category=consumables" onClick={onClose}>Surgical Gowns</Link></li>
                            <li><Link to="/products?category=consumables" onClick={onClose}>Disposable Items</Link></li>
                        </ul>
                    </div>

                    {/* Column 2: Medical Equipment & Devices */}
                    <div className="megamenu-column">
                        <h4 className="megamenu-title">Medical Equipment & Devices</h4>
                        <ul className="megamenu-list">
                            <li><Link to="/products?category=equipment" onClick={onClose}>Pulse Oximeter</Link></li>
                            <li><Link to="/products?category=equipment" onClick={onClose}>BP Instruments</Link></li>
                            <li><Link to="/products?category=equipment" onClick={onClose}>Digital Thermometer</Link></li>
                            <li><Link to="/products?category=equipment" onClick={onClose}>Glucometer</Link></li>
                            <li><Link to="/products?category=equipment" onClick={onClose}>Nebulizer Machines</Link></li>
                            <li><Link to="/products?category=equipment" onClick={onClose}>Steam Vaporizers</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Respiratory & Hospital Care */}
                    <div className="megamenu-column">
                        <h4 className="megamenu-title">Respiratory & Hospital Care</h4>
                        <ul className="megamenu-list">
                            <li><Link to="/products?category=respiratory" onClick={onClose}>Nebulizer Masks</Link></li>
                            <li><Link to="/products?category=respiratory" onClick={onClose}>Nasal Cannula</Link></li>
                            <li><Link to="/products?category=respiratory" onClick={onClose}>Venturi Mask</Link></li>
                            <li><Link to="/products?category=furniture" onClick={onClose}>Hospital Beds</Link></li>
                            <li><Link to="/products?category=furniture" onClick={onClose}>Medical Air Beds</Link></li>
                            <li><Link to="/products?category=furniture" onClick={onClose}>Wheel Chairs</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Orthopedic, Hygiene & Safety */}
                    <div className="megamenu-column">
                        <h4 className="megamenu-title">Orthopedic, Hygiene & Safety</h4>
                        <ul className="megamenu-list">
                            <li><Link to="/products?category=ortho" onClick={onClose}>Knee Caps & Braces</Link></li>
                            <li><Link to="/products?category=ortho" onClick={onClose}>Lumbar Support Belts</Link></li>
                            <li><Link to="/products?category=hygiene" onClick={onClose}>Adult & Baby Diapers</Link></li>
                            <li><Link to="/products?category=safety" onClick={onClose}>Industrial Gloves</Link></li>
                            <li><Link to="/products?category=safety" onClick={onClose}>Hospital Uniforms</Link></li>
                            <li><Link to="/products?category=linen" onClick={onClose}>Cotton Bed Sheets</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Services Section (Bottom Strip) */}
                <div className="megamenu-services">
                    <div className="service-item">
                        <Activity size={20} className="service-icon" />
                        <span>Medical Equipment Rental</span>
                    </div>
                    <div className="service-item">
                        <Truck size={20} className="service-icon" />
                        <span>Bulk Institutional Supply</span>
                    </div>
                    <div className="service-item">
                        <Users size={20} className="service-icon" />
                        <span>Distributor Partnerships</span>
                    </div>
                    <Link to="/contact" className="btn-bulk-quote" onClick={onClose}>
                        Request Bulk Quote
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MegaMenu;
