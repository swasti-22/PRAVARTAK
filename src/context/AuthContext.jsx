import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Current active session user
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("pravartak_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Database simulator: stores list of registered citizens
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const savedUsers = localStorage.getItem("pravartak_registered_users");
    if (savedUsers) {
      return JSON.parse(savedUsers);
    }
    
    // Seed default mock account for easy developer login testing
    const defaultSeed = [{ name: "Test Citizen", email: "test@citizen.gov.in", password: "password123" }];
    localStorage.setItem("pravartak_registered_users", JSON.stringify(defaultSeed));
    return defaultSeed;
  });

  // Keep localStorage in sync when new users sign up
  useEffect(() => {
    localStorage.setItem("pravartak_registered_users", JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  const signUp = (name, email, password) => {
    const emailLower = email.toLowerCase().trim();
    
    // Check if duplicate email exists
    const duplicate = registeredUsers.find(u => u.email.toLowerCase() === emailLower);
    if (duplicate) {
      return { success: false, error: "already_exists" };
    }

    // Add to registered list
    const newUser = { name, email: emailLower, password };
    setRegisteredUsers(prev => [...prev, newUser]);

    // Log user session in
    const sessionUser = { name, email: emailLower };
    setUser(sessionUser);
    localStorage.setItem("pravartak_user", JSON.stringify(sessionUser));
    return { success: true };
  };

  const login = (email, password) => {
    const emailLower = email.toLowerCase().trim();
    
    // Check if user exists
    const targetUser = registeredUsers.find(u => u.email.toLowerCase() === emailLower);
    if (!targetUser) {
      return { success: false, error: "email_not_found" };
    }

    // Validate password match
    if (targetUser.password !== password) {
      return { success: false, error: "incorrect_password" };
    }

    // Log user session in
    const sessionUser = { name: targetUser.name, email: emailLower };
    setUser(sessionUser);
    localStorage.setItem("pravartak_user", JSON.stringify(sessionUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("pravartak_user");
    localStorage.removeItem("pravartak_application_progress");
  };

  return (
    <AuthContext.Provider value={{ user, signUp, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
