import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const session = localStorage.getItem('vlhub_session');
      if (session) {
        setUser(JSON.parse(session));
      }
    } catch (e) {
      console.error('Session load error:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const signUp = (name, email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const users = JSON.parse(localStorage.getItem('vlhub_users') || '[]');
    
    if (users.find(u => u.email === cleanEmail)) {
      throw new Error('An account with this email already exists.');
    }

    const newUser = {
      id: 'usr_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
      name: name.trim(),
      email: cleanEmail,
      password: password, // client-side simulation
      createdAt: new Date().toISOString(),
      level: 5,
      xp: 6420,
      veBalance: 1420,
      gemBalance: 45
    };

    users.push(newUser);
    localStorage.setItem('vlhub_users', JSON.stringify(users));

    // Save session
    const sessionData = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      level: newUser.level
    };
    localStorage.setItem('vlhub_session', JSON.stringify(sessionData));
    setUser(sessionData);
    return true;
  };

  const signIn = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const users = JSON.parse(localStorage.getItem('vlhub_users') || '[]');
    
    const existing = users.find(u => u.email === cleanEmail && u.password === password);
    if (!existing) {
      throw new Error('Invalid email or password. Please try again.');
    }

    const sessionData = {
      id: existing.id,
      name: existing.name,
      email: existing.email,
      level: existing.level || 5
    };
    localStorage.setItem('vlhub_session', JSON.stringify(sessionData));
    setUser(sessionData);
    return true;
  };

  const signOut = () => {
    localStorage.removeItem('vlhub_session');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
