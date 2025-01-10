import React, { createContext, useState, useContext, useMemo } from "react";
import * as SecureStore from "expo-secure-store";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../mutations/user";
import { ActivityIndicator, Text, View } from "react-native";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { loading, error, data, refetch } = useQuery(GET_USER);

  const user = useMemo(() => {
    if (data) {
      return data.user;
    }
    return {};
  }, [data]);

  const [isLogin, setIsLogin] = useState(false);

  return (
    <AuthContext.Provider
      value={{ isLogin, setIsLogin, user, refetch, loading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
