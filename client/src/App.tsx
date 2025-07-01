import { Outlet } from "react-router";
import "./App.css";
import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import type { Auth } from "./types/auth";

function App() {
  const [auth, setAuth] = useState(null as Auth | null);

  return (
    <>
      <Navbar />
      <Outlet context={{ auth, setAuth }} />
    </>
  );
}

export default App;
