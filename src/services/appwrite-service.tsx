import { Client, Databases, Account } from "appwrite";
import { createContext, useContext, useEffect, useState } from "react";

import { GlobalProviderProps } from "types/GlobalProvider";

const client = new Client();
client
  .setEndpoint(import.meta.env.VITE_APPWRITE_API)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

// eslint-disable-next-line react-refresh/only-export-components
export const account = new Account(client);

// eslint-disable-next-line react-refresh/only-export-components
export const databases = new Databases(client);

export const GlobalContext = createContext({});

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [user, setUser] = useState<null | unknown>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    account
      .get()
      .then((data: unknown) => {
        if (data) {
          setUser(data);
        }
      })
      .catch((error: Error) => {
        console.log(
          `Error retrieving the account information: ${error.message}`
        );
      });
  }, []);

  const loginWithGoogle = () => {
    account.createOAuth2Session(
      "google",
      `${import.meta.env.VITE_PUBLIC_CLIENT_URL}`
    );
  };

  const logout = () => {
    account
      .deleteSessions()
      .then(() => {
        setUser(null);
      })
      .catch((error: Error) => {
        console.log(`Error getting the account information: ${error.message}`);
      });
  };

  const contextProps = {
    user,
    setUser,
    databases,
    loading,
    setLoading,
    loginWithGoogle,
    logout,
  };

  return (
    <GlobalContext.Provider value={contextProps}>
      {children}
    </GlobalContext.Provider>
  );
};
