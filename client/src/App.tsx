import { useState } from "react";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import type { Auth } from "./types/auth";

function App() {
  const [auth, setAuth] = useState<Auth | null>(null);

  return (
    <div className="app-container">
      <Navbar auth={auth} setAuth={setAuth} />
      <main>
        <Outlet context={{ auth, setAuth }} />
      </main>
      <Footer />
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover={false}
        draggable
        theme="dark"
      />
    </div>
  );
}

export default App;
