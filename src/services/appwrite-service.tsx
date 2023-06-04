import { Client, Databases, Account, AppwriteException, ID } from "appwrite";
import { createContext, useContext, useState } from "react";

import { GlobalProviderProps } from "types/GlobalProvider";

const client = new Client();
client
  .setEndpoint(import.meta.env.VITE_APPWRITE_API)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const databases = new Databases(client);

export const GlobalContext = createContext<any>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [user, setUser] = useState<null | unknown>(null);
  const [loading, setLoading] = useState(true);

  const getUserData = async () => {
    try {
      const account = new Account(client);
      return account.get();
    } catch (error) {
      const appwriteError = error as AppwriteException;
      throw new Error(appwriteError.message);
    }
  };

  const loginWithGoogle = () => {
    const account = new Account(client);
    account.createOAuth2Session("google");
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const account = new Account(client);
      return account.create(ID.unique(), email, password, name);
    } catch (error) {
      const appwriteError = error as AppwriteException;
      throw new Error(appwriteError.message);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const account = new Account(client);
      return account.createEmailSession(email, password);
    } catch (error) {
      const appwriteError = error as AppwriteException;
      throw new Error(appwriteError.message);
    }
  };

  const logout = async () => {
    try {
      const account = new Account(client);
      account.deleteSession("current").then(() => {
        setUser(null);
      });
    } catch (error) {
      const appwriteError = error as AppwriteException;
      throw new Error(appwriteError.message);
    }
  };

  const contextProps = {
    user,
    setUser,
    getUserData,
    login,
    logout,
    register,
    loading,
    setLoading,
    loginWithGoogle,
  };

  return (
    <GlobalContext.Provider value={contextProps}>
      {children}
    </GlobalContext.Provider>
  );
};
