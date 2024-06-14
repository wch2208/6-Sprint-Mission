import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Layout from "./Layout";
import { useState } from "react";
import AuthContext from "./contexts/AuthContext";
import AddItem from "./pages/AddItem/AddItem";
import FreeBoard from "./pages/FreeBoard/FreeBoard";
import ItemDetail from "./pages/ItemDetail/ItemDetail";
import LoginPage from "./pages/LoginPage/LoginPage";
import Items from "./pages/Items/Items";

const App: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <AuthContext.Provider value={isLogin}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/items" element={<Items />} />
            <Route path="/products/:id" element={<ItemDetail />} />
            <Route path="/freeboard" element={<FreeBoard />} />
            <Route path="/additem" element={<AddItem />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<LoginPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
