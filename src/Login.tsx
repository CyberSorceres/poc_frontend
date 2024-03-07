import { Box, Button, Container } from "@mui/material";
import { colors } from "./colors";
import { LoginContext } from "./App";
import { useContext } from "react";

export default function Login() {
  const { setLogin } = useContext(LoginContext) ?? { setLogin: null };
  return (
    <>
      <Container>
        <Box
          sx={{
            boxShadow: 1,
            m: 1,
            borderRadious: 5,
            backgroundColor: colors.background,
            display: "flex",
            flexDirection: "column",
            rowGap: 2,
          }}
        >
          Logga come:
          {[
            {
              role: "user",
              text: "Cliente",
            },
            { role: "pm", text: "Project Manager" },
            { role: "dev", text: "Developer" },
          ].map(({ role, text }) => (
            <Box>
              <Button onClick={() => setLogin(role)} variant="contained">
                {text}
              </Button>
            </Box>
          ))}
        </Box>
      </Container>
    </>
  );
}
