import { useContext, useState } from "react";
import {
  LoaderFunction,
  useLoaderData,
  useRevalidator,
} from "react-router-dom";
import EpicStory from "./EpicStory";
import type { Project } from "./types/project";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Modal,
  TextField,
} from "@mui/material";
import { generateUserStories } from "./bedrock";
import { LoginContext } from "./App";

export const loader: LoaderFunction<string> = async function ({ params }) {
  const project = await (
    await fetch(
      `${import.meta.env.VITE_API_URL}/getProject?id=${params.projectId}`,
    )
  ).json();

  return project;
};

export default function () {
  const { project: p } = useLoaderData() as { project: Project };
  const [project, setProject] = useState(p);
  if (JSON.stringify(p) !== JSON.stringify(project)) setProject(p);
  const [openModal, setOpenModal] = useState(false);
  const revalidator = useRevalidator();
  const { login } = useContext(LoginContext) ?? { login: null };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "vertical",
          alignItems: "center",
        }}
      >
        <h3> {project.name} </h3>
        {login === "user" && (
          <Button onClick={() => setOpenModal(true)}>
            <i className="fa-solid fa-plus"></i>
          </Button>
        )}
      </Box>
      <div>
        {project.epicStory.map((e) => (
          <EpicStory key={e._id} epicStory={e} users={p.user} />
        ))}
      </div>
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        PaperProps={{
          component: "form",
          onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const { name, description } = Object.fromEntries(
              (formData as any).entries(),
            );
            const userStories = JSON.parse(
              await generateUserStories(description),
            );
            const epicStory = await (
              await fetch(`${import.meta.env.VITE_API_URL}/addEpicStory`, {
                method: "POST",
                body: JSON.stringify({
                  title: name,
                  descript: description,
                  project: project._id,
                  userStory: [],
                }),
              })
            ).text();
            for (const userStory of userStories) {
              await fetch(`${import.meta.env.VITE_API_URL}/addUserStory`, {
                method: "POST",
                body: JSON.stringify({
                  ...userStory,
                  epicStory,
                }),
              });
            }
            revalidator.revalidate();
            setOpenModal(false);
          },
        }}
      >
        <DialogTitle>Crea una epic story</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: 2,
          }}
        >
          <TextField
            autoFocus
            required
            name="name"
            label="Nome Epic Story"
            fullWidth
          />
          <TextField
            required
            name="description"
            label="Descrizione"
            multiline
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancella</Button>
          <Button type="submit">Crea</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
