import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Navbar from "./Navbar.js";
import { Outlet } from "react-router-dom";
import React, { useState } from "react";
//import './App.css';

export const LoginContext = React.createContext(
  null as { login: any; setLogin: any } | null,
);

export default function App() {
  const [login, setLogin] = useState("pm");
  return (
    <div className="App">
      <header className="App-header">
        <LoginContext.Provider value={{ login, setLogin }}>
          <Navbar />
          <Outlet />
        </LoginContext.Provider>
      </header>
    </div>
  );
}
