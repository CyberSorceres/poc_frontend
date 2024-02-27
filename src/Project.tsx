import { useState } from "react";
import { LoaderFunction, useLoaderData } from "react-router-dom";
import EpicStory from "./EpicStory";
import type { Project } from "./types/project";
import {
  MDBContainer,
  MDBCollapse,
  MDBNavbar,
  MDBNavbarToggler,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";

export const loader: LoaderFunction<string> = async function ({ params }) {
  console.log("called loader");
  const project: Project = {
    name: params.projectId ?? "",
    validation: false,
    startDate: new Date(),
    epicStory: [
      {
        title: "ChatGPT",
        descript: "ChatGPT epic story",
        state: false,
        userStory: params.projectId?.includes("1")
          ? [
              {
                descript: "Implementa CHATGPT",
                state: false,
              },
              {
                descript: "Fai altro",
                state: true,
                user: "Marco",
              },
            ]
          : [],
      },
    ],
    user: "",
  };
  return { project };
};

export default function () {
  const { project: p } = useLoaderData() as { project: Project };
  const [project, setProject] = useState(p);
  if (p.name !== project.name) setProject(p);
  return (
    <>
      <MDBContainer fluid>
        <h3> {project.name} </h3>
      </MDBContainer>
      {project.epicStory.map((e) => (
        <EpicStory key={e.descript} epicStory={e} />
      ))}
    </>
  );
}