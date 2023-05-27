import { Routes, Navigate, Route } from "react-router-dom";

import LoginPage from "scenes/loginPage";
import Navbar from "scenes/navbar";
import HomePage from "scenes/homePage";
import ProfilePage from "scenes/profilePage";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/profile/:userId" element={<ProfilePage />}></Route>
      </Routes>
      ;
    </div>
  );
}

export default App;
