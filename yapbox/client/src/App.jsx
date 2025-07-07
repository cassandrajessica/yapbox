import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import AccountSetup from "./components/AccountSetup";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/setup" element={<AccountSetup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
