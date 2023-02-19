import React, { useState, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const auth = localStorage.getItem("auth")
    const [user, setUser] = useState(auth ? auth : null);
    
    const logout = () => {
        setUser(null);
        localStorage.removeItem("auth");
        window.location.href = "/auth"
    }

    const contextData = {
        user: user,
        setUser: setUser,
        logout: logout,
    }
    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}