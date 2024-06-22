import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import {useContext, useEffect} from "react";
import {Context} from "./index";

function App() {
    const{user} = useContext(Context)
  return (
    <BrowserRouter>
        <NavBar/>
      <AppRouter/>
        <Footer/>
    </BrowserRouter>
  );
}

export default App;
