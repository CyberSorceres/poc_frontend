import React, { ChangeEvent, useState } from "react";
import { useRevalidator } from "react-router-dom";
import {
  MDBContainer,
  MDBCollapse,
  MDBNavbar,
  MDBNavbarToggler,
  MDBIcon,
  MDBBtn,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBTextArea,
  MDBInput,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
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

  const [varyingState, setVaryingState] = useState("");
  const [varyingModal, setVaryingModal] = useState(false);
  const [varyingRecipient, setVaryingRecipient] = useState("");
  const [varyingMessage, setVaryingMessage] = useState("");

  const onChangeRecipient = (event: ChangeEvent<HTMLInputElement>) => {
    setVaryingRecipient(event.target.value);
  };

  const onChangeMessage = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setVaryingMessage(event.target.value);
  };

  const addProject = async (title: string, descript: string) => {
    await fetch(`${import.meta.env.VITE_API_URL}/addProgetto`, {
      method: "POST",
      body: JSON.stringify({
        name: title,
        descript: descript,
      }),
    });
    /*const revalidator = useRevalidator();

      // run when you need to update
      revalidator.revalidate();*/
    window.location.reload();
  };

  return (
    <>
      <MDBNavbar>
        <MDBContainer fluid className="menu">
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
        {import.meta.env.VITE_ROLE == "user" ? ( //andrà modificato con isUser(user)
          <>
            <MDBBtn
              className="divBtnProject"
              onClick={() => {
                setVaryingState("");
                setVaryingModal(!varyingModal);
                setVaryingRecipient("");
              }}
            >
              New Project
            </MDBBtn>
            <MDBModal
              open={varyingModal}
              setOpen={setVaryingModal}
              tabIndex="-1"
            >
              <MDBModalDialog>
                <MDBModalContent>
                  <MDBModalHeader>
                    <MDBModalTitle>Crea il nuovo progetto</MDBModalTitle>
                    <MDBBtn
                      className="btn-close"
                      color="none"
                      onClick={() => setVaryingModal(!varyingModal)}
                    ></MDBBtn>
                  </MDBModalHeader>
                  <MDBModalBody>
                    <form>
                      <div className="mb-3">
                        {varyingModal && (
                          <MDBInput
                            value={varyingRecipient}
                            onChange={onChangeRecipient}
                            labelClass="col-form-label"
                            label="Titolo del Progetto:"
                          />
                        )}
                      </div>
                      <div className="mb-3">
                        {varyingModal && (
                          <MDBTextArea
                            value={varyingMessage}
                            onChange={onChangeMessage}
                            labelClass="col-form-label"
                            label="Descrizione Progetto:"
                          />
                        )}
                      </div>
                    </form>
                  </MDBModalBody>
                  <MDBModalFooter>
                    <MDBBtn
                      color="secondary"
                      onClick={() => setVaryingModal(!varyingModal)}
                    >
                      Close
                    </MDBBtn>
                    <MDBBtn
                      onClick={() =>
                        addProject(varyingRecipient, varyingMessage)
                      }
                    >
                      Invia Proposta di Progetto
                    </MDBBtn>
                  </MDBModalFooter>
                </MDBModalContent>
              </MDBModalDialog>
            </MDBModal>
          </>
        ) : (
          <></>
        )}
      </MDBNavbar>

      <MDBCollapse open={showNavExternal}>
        <div className="bg-light shadow-3 p-4">
          {projects.map((p) => (
            <div key={p._id}>
              <Link to={`project/${p._id}`}> {p.name} </Link>
              <br />
            </div>
          ))}
        </div>
      </MDBCollapse>
    </>
  );
}
