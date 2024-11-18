import { useEffect, useState } from "react";
import "./styles.css";
import Header from "./components/Header.jsx";
import { ToastContainer } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";
import Api from "./components/Api.jsx";
import { MyProvider } from "./MyContext";
import SplashScreen from "./components/SplashScreen.js";

function App() {
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  !isMobile && useEffect(() => {
      // Simuler un délai de chargement pour voir l'effet du splash screen
      const timer = setTimeout(() => setLoading(false), 2000); // 3 secondes
      return () => clearTimeout(timer);
  }, []);

  if (loading && !isMobile) {
      return <SplashScreen />;
  }

  return (
    <MyProvider>
      <div className="App">
        {/* <Header /> */}
        <Api />
        <ToastContainer />
      </div>
        {/* <div className="footer">
          Levi's <span style={{ color: "orangered" }}>&nbsp;CineList</span>
        </div> */}
    </MyProvider>
  );
}

export default App;