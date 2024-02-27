import React, { useState } from "react";
import {
  MDBContainer,
  MDBCollapse,
  MDBNavbar,
  MDBNavbarToggler,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

export default function App() {
  const [showNavExternal, setShowNavExternal] = useState(false);
  const projects = ["Progetto 1", "Progetto 2", "Progetto 3"];

  return (
    <>
      <MDBNavbar>
        <MDBContainer fluid>
          <MDBNavbarToggler
            type="button"
            data-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowNavExternal(!showNavExternal)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>
        </MDBContainer>
      </MDBNavbar>

      <MDBCollapse open={showNavExternal}>
        <div className="bg-light shadow-3 p-4">
          {projects.map((p) => (
            <>
              <Link key={p} to={`project/${p}`}>
                {" "}
                {p}{" "}
              </Link>
              <br />
            </>
          ))}
        </div>
      </MDBCollapse>
    </>
  );
}
