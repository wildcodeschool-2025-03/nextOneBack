import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Outlet />
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
