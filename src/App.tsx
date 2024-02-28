import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Navbar from "./Navbar.js";
import { Outlet } from "react-router-dom";
//import './App.css';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
        <Outlet />
      </header>
    </div>
  );
}
