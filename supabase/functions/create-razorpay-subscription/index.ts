import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'npm:@supabase/supabase-js@2'

// CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing Authorization header');
    }
    
    // Create Supabase client to fetch user and update shops table
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );
    
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      throw new Error('Unauthorized');
    }
    
    const reqBody = await req.json();
    const { shop_id, plan_id } = reqBody;
    
    if (!shop_id || !plan_id) {
      throw new Error('Missing shop_id or plan_id');
    }
    
    // Verify user owns the shop
    const { data: shop, error: shopError } = await supabaseClient
      .from('shops')
      .select('*')
      .eq('id', shop_id)
      .eq('owner_id', user.id)
      .single();
      
    if (shopError || !shop) {
      throw new Error('Shop not found or you are not the owner');
    }
    
    // Razorpay Keys from Env
    const keyId = Deno.env.get('RAZORPAY_KEY_ID');
    const keySecret = Deno.env.get('RAZORPAY_KEY_SECRET');
    
    if (!keyId || !keySecret) {
      throw new Error('Razorpay keys not configured on server');
    }
    
    const basicAuth = btoa(`${keyId}:${keySecret}`);
    
    // Create Subscription via Razorpay API
    const response = await fetch('https://api.razorpay.com/v1/subscriptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${basicAuth}`
      },
      body: JSON.stringify({
        plan_id: plan_id,
        total_count: 12,
        customer_notify: 1,
      })
    });
    
    const subscription = await response.json();
    
    if (!response.ok) {
      throw new Error(`Razorpay Error: ${subscription.error?.description || 'Failed to create subscription'}`);
    }
    
    // Update shop status in DB
    const updatePayload = {
      subscription_status: 'pending',
    };
    
    await supabaseClient
      .from('shops')
      .update(updatePayload)
      .eq('id', shop_id);
      
    return new Response(JSON.stringify({ 
      subscription_id: subscription.id,
      short_url: subscription.short_url 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
