import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(() => localStorage.getItem('user-role') || 'student');

    useEffect(() => {
        localStorage.setItem('user-role', role);
    }, [role]);

    const login = (userData, userRole = 'student') => {
        setUser(userData);
        setRole(userRole);
    };

    const logout = () => {
        setUser(null);
        // We keep the role for demo purposes but can clear if needed
    };

    return (
        <AuthContext.Provider value={{ user, role, setRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
