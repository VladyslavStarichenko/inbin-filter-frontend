// Modules
import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Cookies from "js-cookie";
import api from "../../api";

function AuthProvider(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setTokenData] = useState(null);

  const setToken = useCallback((tokenData) => {
    setTokenData(tokenData);

    if (tokenData) {
      Cookies.set("auth-token", tokenData);
      localStorage.setItem('token', tokenData);
    } else {
      Cookies.remove("auth-token");
      localStorage.removeItem('token', tokenData);
    }
  }, []);

  const logOut = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  }, [setToken]);

  const loadData = useCallback(async () => {
    const tokenData = Cookies.get("auth-token");
    setTokenData(tokenData);

    try {
      if (tokenData) {
        const { data } = await api.auth.getProfile();
        setUser(data);
      }
    } catch {
      setToken(null);
    } finally {
      setIsLoaded(true);
    }
  }, [setToken]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const contextValue = useMemo(
    () => ({
      isLoaded,
      user,
      token,
      setUser,
      setToken,
      logOut,
    }),
    [isLoaded, user, token, setToken, logOut]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
