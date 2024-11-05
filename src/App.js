import React from "react";
import "./styles.css";
import Header from "./components/Header.jsx";
import { ToastContainer } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";
import Api from "./components/Api.jsx";
import { MyProvider } from "./MyContext";

function App() {
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