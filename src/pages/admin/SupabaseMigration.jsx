import React, { useState } from 'react';
import { mockBackend } from '../../utils/mockBackend';
import { supabase } from '../../lib/supabase';

const SupabaseMigration = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);

    const log = (msg) => setLogs(prev => [...prev, `${new Date().toLocaleTimeString()} - ${msg}`]);

    const seedSegments = async () => {
        log('Seeding Segments...');
        const segments = mockBackend.getSegments();
        for (const seg of segments) {
            const { data: existing } = await supabase.from('segments').select('id').eq('name', seg.name).single();

            const payload = {
                name: seg.name,
                description: seg.description,
                display_order: seg.display_order,
                is_active: seg.is_active,
                hero_image: seg.hero_image
            };

            if (existing) {
                const { error } = await supabase.from('segments').update(payload).eq('id', existing.id);
                if (error) log(`Error updating segment ${seg.name}: ${error.message}`);
                else log(`Updated segment: ${seg.name}`);
            } else {
                const { error } = await supabase.from('segments').insert(payload);
                if (error) log(`Error inserting segment ${seg.name}: ${error.message}`);
                else log(`Inserted segment: ${seg.name}`);
            }
        }
    };

    const seedCategories = async () => {
        log('Seeding Categories...');
        const categories = mockBackend.getCategories();
        for (const cat of categories) {
            const localSeg = mockBackend.getSegments().find(s => s.id === cat.segment_id);
            if (!localSeg) continue;

            const { data: dbSeg } = await supabase.from('segments').select('id').eq('name', localSeg.name).single();
            if (!dbSeg) {
                log(`Error: DB Segment not found for ${localSeg.name}`);
                continue;
            }

            const payload = {
                name: cat.name,
                segment_id: dbSeg.id,
                display_order: cat.display_order,
                is_active: cat.is_active,
                image: cat.image
            };

            const { data: existing } = await supabase.from('categories').select('id').eq('name', cat.name).single();

            if (existing) {
                const { error } = await supabase.from('categories').update(payload).eq('id', existing.id);
                if (error) log(`Error updating category ${cat.name}: ${error.message}`);
                else log(`Updated category: ${cat.name}`);
            } else {
                const { error } = await supabase.from('categories').insert(payload);
                if (error) log(`Error inserting category ${cat.name}: ${error.message}`);
                else log(`Inserted category: ${cat.name}`);
            }
        }
    };

    const seedProducts = async () => {
        log('Seeding Products...');
        const products = mockBackend.getProducts();
        for (const prod of products) {
            const localCat = mockBackend.getCategories().find(c => c.id === prod.category_id);
            if (!localCat) continue;

            const { data: dbCat } = await supabase.from('categories').select('id, segment_id').eq('name', localCat.name).single();
            if (!dbCat) continue;

            const payload = {
                category_id: dbCat.id,
                segment_id: dbCat.segment_id,
                name: prod.name,
                short_description: prod.short_description,
                description: prod.description,
                brand: prod.brand,
                code: prod.code || prod.id,
                stock: prod.stock,
                img: prod.img,
                features: prod.features,
                is_active: prod.is_active
            };

            const { data: existing } = await supabase.from('products').select('id').eq('name', prod.name).single();

            if (existing) {
                const { error } = await supabase.from('products').update(payload).eq('id', existing.id);
                if (error) log(`Error updating product ${prod.name}: ${error.message}`);
                else log(`Updated product: ${prod.name}`);
            } else {
                const { error } = await supabase.from('products').insert(payload);
                if (error) log(`Error inserting product ${prod.name}: ${error.message}`);
                else log(`Inserted product: ${prod.name}`);
            }
        }
    };

    const runAll = async () => {
        setLoading(true);
        setLogs([]);
        try {
            await seedSegments();
            await seedCategories();
            await seedProducts();
            log('Migration Complete!');
        } catch (e) {
            log(`CRITICAL ERROR: ${e.message}`);
        }
        setLoading(false);
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Supabase Migration Tool</h1>
            <p>Push mock data to Supabase.</p>
            <button
                onClick={runAll}
                disabled={loading}
                style={{ padding: '10px 20px', background: 'blue', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
            >
                {loading ? 'Migrating...' : 'Start Migration'}
            </button>
            <div style={{ marginTop: '2rem', background: '#f0f0f0', padding: '1rem', height: '300px', overflowY: 'auto', fontFamily: 'monospace' }}>
                {logs.map((l, i) => <div key={i}>{l}</div>)}
            </div>
        </div>
    );
};

export default SupabaseMigration;
