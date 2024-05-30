import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { Admin } from '../interfaces/Admin';

interface UserContextType {
    user: Admin | null;
    loginUser: (adminData: Admin) => void;
    logoutUser: () => void;
}

export const UserContext = createContext<UserContextType>({
    user: null,
    loginUser: () => {},
    logoutUser: () => {},
});

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<Admin | null>(null);

    // Carregar dados do usuário ao iniciar o app
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const loginUser = (adminData: Admin) => {
        localStorage.setItem('user', JSON.stringify(adminData));
        setUser(adminData);
    };

    const logoutUser = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
};
