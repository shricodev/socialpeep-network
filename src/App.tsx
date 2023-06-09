import { useMemo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

import { themeSettings } from "./theme";
import LoginPage from "scenes/loginPage";
import HomePage from "scenes/homePage";
import ProfilePage from "scenes/profilePage";
import RegisterPage from "scenes/registerPage";
import SuggestionPage from "scenes/suggestionPage";
import NewsWidget from "scenes/widgets/NewsWidget";
import AuthState from "interfaces/AuthState";

function App() {
  const mode = useSelector((state: AuthState) => state.mode);
  // check if the user is already logged in
  const isAuth = Boolean(useSelector((state: AuthState) => state.token));

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <CssBaseline />
        <Routes>
          <Route
            path="/"
            element={
              isAuth ? <Navigate to="/home" /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/home"
            element={isAuth ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={isAuth ? <Navigate to="/home" /> : <LoginPage />}
          />
          <Route
            path="/register"
            element={!isAuth ? <RegisterPage /> : <Navigate to="/home" />}
          />
          <Route
            path="/suggestions"
            element={isAuth ? <SuggestionPage /> : <Navigate to="/home" />}
          />
          <Route
            path="/profile"
            element={isAuth ? <ProfilePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile/:userId"
            element={isAuth ? <ProfilePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/news/today"
            element={isAuth ? <NewsWidget /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
