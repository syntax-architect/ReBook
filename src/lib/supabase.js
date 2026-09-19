import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found in environment variables.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '', {
  global: {
    fetch: async (url, options = {}) => {
      const clerkToken = await window.Clerk?.session?.getToken({
        template: 'supabase',
      });

      const headers = new Headers(options?.headers);
      if (clerkToken) {
        headers.set('Authorization', `Bearer ${clerkToken}`);
      }

      return fetch(url, {
        ...options,
        headers,
      });
    },
  },
});
