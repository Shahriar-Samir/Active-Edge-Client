import React, { createContext } from 'react';

export const AuthContext = createContext(null)

const AuthProvider = () => {

    const userAuth = {}
    return (
        <AuthContext.Provider value={userAuth}>
            
        </AuthContext.Provider>
    );
};

export default AuthProvider;