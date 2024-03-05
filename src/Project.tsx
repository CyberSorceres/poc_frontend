import { useState } from "react";
import { LoaderFunction, useLoaderData } from "react-router-dom";
import {
  EpicStories,
  EpicStoriesPM,
  EpicStoriesSD,
  EpicStoriesUser,
} from "./EpicStory";
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
  const project = await (
    await fetch(
      `${import.meta.env.VITE_API_URL}/getProject?id=${params.projectId}`,
    )
  ).json();
  /*const project: Project = {
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
                feedback: [
                  {
                    text: "complimenti",
                    id: "12345",
                    user:"sabry12",
                  },
                ],
              },
              {
                descript: "Fai altro",
                state: true,
                user: "Marco",
                feedback:[
                  {
                    text: "complimenti",
                    id: "12345",
                    user:"sabry12",
                  },
                ],
              },
            ]
          : [],
      },
    ],
    user: "",
    };*/
  return project;
};

export default function () {
  const { project: p } = useLoaderData() as { project: Project };
  const [project, setProject] = useState(p);
  if (p.name !== project.name) setProject(p);
  let epicStoryComponent: EpicStories;
  const role = import.meta.env.VITE_ROLE;

  switch (role) {
    case "dev":
      epicStoryComponent = new EpicStoriesSD();
      break;
    case "pm":
      epicStoryComponent = new EpicStoriesPM();
      break;
    case "user":
      epicStoryComponent = new EpicStoriesUser();
      break;
  }
  console.log(project);
  return (
    <>
      <MDBContainer fluid>
        <h3> {project.name} </h3>
      </MDBContainer>
      <div>
        {project.epicStory.map((e) => (
          <epicStoryComponent.EpicStories
            key={e._id}
            epicStory={e}
            users={p.user}
          />
        ))}
      </div>
    </>
  );
}
