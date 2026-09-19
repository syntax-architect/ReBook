import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function Billing() {
  const { shop } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubscribe = async () => {
    if (!shop?.id) {
      setError('Shop not initialized yet. Please complete onboarding.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Get the current session to pass the auth header
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();
      if (sessionError || !session) throw new Error('Authentication failed');

      // Replace this with your actual Razorpay Plan ID
      // You should create a Plan in the Razorpay Dashboard first
      const MOCK_PLAN_ID = 'plan_XXXXXXX'; // To be updated by the merchant

      // Call the Supabase Edge Function securely
      const { data, error: functionError } = await supabase.functions.invoke(
        'create-razorpay-subscription',
        {
          body: {
            shop_id: shop.id,
            plan_id: MOCK_PLAN_ID,
          },
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        }
      );

      if (functionError) {
        throw new Error(functionError.message || 'Failed to initiate subscription');
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      if (data?.short_url) {
        // Redirect to Razorpay hosted checkout
        window.location.href = data.short_url;
      } else {
        throw new Error('No checkout URL returned from Razorpay.');
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-on-surface">Billing & Subscription</h1>
        <p className="text-on-surface-variant mt-2">Manage your Rebook plan and payment methods.</p>
      </div>

      <div className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-on-surface mb-2">Growth Plan</h2>
            <p className="text-on-surface-variant mb-6">
              Unlock unlimited WhatsApp reminders, AI waitlist backfill, and broadcast messaging for
              your salon.
            </p>

            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-4xl font-display font-bold text-primary">₹1,499</span>
              <span className="text-on-surface-variant">/month</span>
            </div>

            <Link
              to="/pricing"
              className="text-primary text-sm font-medium hover:underline inline-block mb-6"
            >
              View all pricing tiers & features →
            </Link>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 text-on-surface">
                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                <span>Unlimited automated WhatsApp reminders</span>
              </li>
              <li className="flex items-start gap-3 text-on-surface">
                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                <span>Waitlist auto-backfill engine</span>
              </li>
              <li className="flex items-start gap-3 text-on-surface">
                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                <span>Custom booking link</span>
              </li>
              <li className="flex items-start gap-3 text-on-surface">
                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                <span>Priority chat support</span>
              </li>
            </ul>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-error-container/20 border border-error-container text-error text-sm flex items-start gap-2">
                <span className="material-symbols-outlined text-lg">error</span>
                <span>{error}</span>
              </div>
            )}

            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 bg-primary text-on-primary rounded-xl font-label-lg hover:bg-primary/90 transition-colors disabled:opacity-70"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-lg">credit_card</span>
                  <span>Subscribe via Razorpay</span>
                </>
              )}
            </button>
            <p className="text-xs text-on-surface-variant mt-4 opacity-70">
              Payments are securely processed by Razorpay. You can cancel your subscription at any
              time.
            </p>
          </div>

          <div className="flex-1 bg-surface rounded-xl border border-outline-variant/30 p-6">
            <h3 className="font-semibold text-on-surface mb-4">Current Status</h3>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center pb-4 border-b border-outline-variant/30">
                <span className="text-on-surface-variant text-sm">Status</span>
                <span className="px-2.5 py-1 rounded-full bg-secondary-container/50 text-on-secondary-container text-xs font-semibold capitalize">
                  {shop?.subscription_status || 'Trialing'}
                </span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-outline-variant/30">
                <span className="text-on-surface-variant text-sm">Current Plan</span>
                <span className="text-on-surface text-sm font-medium">Free Trial</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant text-sm">Shop ID</span>
                <span className="text-on-surface text-sm font-medium font-mono text-xs">
                  {shop?.id?.substring(0, 8)}...
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
