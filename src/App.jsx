import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AppRouter from "./AppRouter";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
