import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export default function Onboarding() {
  const navigate = useNavigate();
  const { user, shop, fetchShop } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    industry: 'salon',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // If shop already exists, redirect to dashboard
    if (shop) {
      navigate('/dashboard', { replace: true });
    }
  }, [shop, navigate]);

  const handleNameChange = (e) => {
    const newName = e.target.value;
    const autoSlug = newName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    setFormData({ ...formData, name: newName, slug: autoSlug });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.slug) return;

    setLoading(true);
    setError('');

    try {
      const { data, error: sbError } = await supabase
        .from('shops')
        .insert({
          name: formData.name,
          slug: formData.slug,
          industry: formData.industry,
          owner_id: user.id,
        })
        .select()
        .single();

      if (sbError) {
        if (sbError.code === '23505') {
          setError('This URL slug is already taken. Please choose another.');
        } else {
          setError(sbError.message);
        }
        setLoading(false);
        return;
      }

      await fetchShop(user.id); // Update context
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-container-lowest flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-outline-variant/30"
      >
        <div className="p-8">
          <div className="flex justify-center mb-8">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-on-primary">
              <span className="material-symbols-outlined text-3xl">storefront</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-on-surface mb-2 tracking-tight">
            Set up your shop
          </h1>
          <p className="text-center text-on-surface-variant text-sm mb-8">
            Welcome to ReBook! Let's get your business online.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 bg-error-container text-on-error-container text-sm rounded-lg font-medium">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wide">
                Shop Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={handleNameChange}
                placeholder="e.g. Aura Wellness Studio"
                className="w-full bg-surface border border-outline-variant/50 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wide">
                Booking URL Slug
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-outline-variant/50 bg-surface-container-low text-on-surface-variant text-sm font-mono">
                  rebook.com/book/
                </span>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''),
                    })
                  }
                  className="w-full bg-surface border border-outline-variant/50 rounded-r-xl px-3 py-3 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all font-mono"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wide">
                Industry Category
              </label>
              <div className="relative">
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full appearance-none bg-surface border border-outline-variant/50 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all font-medium pr-10"
                >
                  <option value="salon">Salon & Spa</option>
                  <option value="gym">Fitness & Gym</option>
                  <option value="clinic">Clinic & Healthcare</option>
                  <option value="cafe">Cafe & Restaurant</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-3 text-on-surface-variant/50 pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary text-on-primary font-semibold rounded-xl hover:opacity-90 active:scale-[0.98] transition-all mt-4 disabled:opacity-50"
            >
              {loading ? (
                <span className="material-symbols-outlined animate-spin text-xl">refresh</span>
              ) : (
                <>
                  <span>Complete Setup</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
