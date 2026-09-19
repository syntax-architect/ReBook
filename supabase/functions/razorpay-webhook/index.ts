import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const RAZORPAY_WEBHOOK_SECRET = Deno.env.get("RAZORPAY_WEBHOOK_SECRET") || "";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function verifyRazorpaySignature(payload: string, signature: string, secret: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(payload)
  );

  const hashArray = Array.from(new Uint8Array(signatureBuffer));
  const expectedSignature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  return expectedSignature === signature;
}

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const signature = req.headers.get("x-razorpay-signature");
    if (!signature) {
      return new Response(JSON.stringify({ error: "Missing signature" }), { status: 400 });
    }

    const payloadText = await req.text();
    
    // Verify webhook signature
    const isValid = await verifyRazorpaySignature(payloadText, signature, RAZORPAY_WEBHOOK_SECRET);
    if (!isValid) {
      return new Response(JSON.stringify({ error: "Invalid signature" }), { status: 400 });
    }

    const event = JSON.parse(payloadText);
    
    let subscriptionId = null;
    let newStatus = null;

    switch (event.event) {
      case "subscription.activated":
      case "subscription.charged":
        subscriptionId = event.payload.subscription?.entity?.id;
        newStatus = "active";
        break;
      case "subscription.cancelled":
        subscriptionId = event.payload.subscription?.entity?.id;
        newStatus = "cancelled";
        break;
      case "payment.failed":
        // Fallback for payment failure if we can resolve the subscription ID
        subscriptionId = event.payload.payment?.entity?.notes?.subscription_id;
        newStatus = "past_due";
        break;
      default:
        // Other events can be ignored
        break;
    }

    if (subscriptionId && newStatus) {
      const { error } = await supabase
        .from("shops")
        .update({ subscription_status: newStatus })
        .eq("razorpay_subscription_id", subscriptionId);
        
      if (error) {
        console.error("Failed to update database:", error);
        return new Response(JSON.stringify({ error: "Database update failed" }), { status: 500 });
      }
    }

    return new Response(JSON.stringify({ received: true }), { 
      status: 200, 
      headers: { "Content-Type": "application/json" } 
    });

  } catch (err) {
    console.error("Webhook processing error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
});
