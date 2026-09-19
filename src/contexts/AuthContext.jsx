import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useUser, useAuth as useClerkAuth } from '@clerk/clerk-react';

const AuthContext = createContext();

const industryConfigs = {
  salon: {
    service: 'Service',
    services: 'Services',
    client: 'Client',
    staff: 'Stylist/Therapist',
  },
  gym: {
    service: 'Class',
    services: 'Classes',
    client: 'Member',
    staff: 'Trainer',
  },
  cafe: {
    service: 'Table',
    services: 'Reservations',
    client: 'Guest',
    staff: 'Server',
  },
  clinic: {
    service: 'Consultation',
    services: 'Appointments',
    client: 'Patient',
    staff: 'Doctor',
  },
};

export const AuthProvider = ({ children }) => {
  const { user, isLoaded: userLoaded } = useUser();
  const { signOut, isLoaded: authLoaded } = useClerkAuth();

  const [shop, setShop] = useState(null);
  const [terms, setTerms] = useState(industryConfigs.salon);
  const [loading, setLoading] = useState(true);

  const fetchShop = async (userId) => {
    const { data } = await supabase.from('shops').select('*').eq('owner_id', userId).maybeSingle();
    if (data) {
      setShop(data);
      localStorage.setItem('rebook_shop_id', data.id);
      if (industryConfigs[data.industry]) {
        setTerms(industryConfigs[data.industry]);
      }
    } else {
      localStorage.removeItem('rebook_shop_id');
      setShop(null);
    }
  };

  useEffect(() => {
    if (userLoaded && authLoaded) {
      if (user) {
        fetchShop(user.id).finally(() => setLoading(false));
      } else {
        setShop(null);
        setLoading(false);
      }
    }
  }, [userLoaded, authLoaded, user]);

  return (
    <AuthContext.Provider value={{ session: user, user, shop, terms, loading, signOut, fetchShop }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
