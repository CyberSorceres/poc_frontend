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
import { LoaderFunction, useLoaderData } from "react-router-dom";
import type { Project } from "./types/project";

export const loader: LoaderFunction<string> = async function ({ params }) {
  const projects = (await (
    await fetch(`${import.meta.env.VITE_API_URL}/getProjects`)
  ).json()) as Project[];
  return { projects };
};

export default function App() {
  const [showNavExternal, setShowNavExternal] = useState(false);
  const { projects } = useLoaderData() as { projects: Project[] };
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
              <Link key={p._id} to={`project/${p._id}`}>
                {" "}
                {p.name}{" "}
              </Link>
              <br />
            </>
          ))}
        </div>
      </MDBCollapse>
    </>
  );
}
