// src/context/AuthContext.js
import React, { createContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // ✅ Correct named import

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        const decodedToken = jwtDecode(parsed.token); // ✅ Correct usage
        const isExpired = decodedToken.exp * 1000 < Date.now();

        if (!isExpired) {
          setUser(parsed);
        } else {
          localStorage.removeItem('user');
          setUser(null);
        }
      } catch (err) {
        console.error('Token error:', err);
        localStorage.removeItem('user');
        setUser(null);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
 