import Box from "@mui/material/Box";
import { colors } from "./colors";
import { Button } from "@mui/material";

export default function User({
  name,
  onRemove,
  showDelete,
}: {
  name: string;
  onRemove: () => any;
  showDelete: boolean;
}) {
  return (
    <>
      <Box
        sx={{
          boxShadow: 2,
          backgroundColor: colors.background,
          borderRadius: 5,
          m: 1,
          flexDirection: "row",
          display: "flex",
          alingItems: "center",
        }}
      >
        <Box
          component="img"
          sx={{
            height: 32,
            width: 32,
            borderRadius: "100%",
            m: 0.7,
          }}
          alt="Developer Icon"
          src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <Box sx={{ pt: 1 }}> {name} </Box>
        {showDelete ? (
          <Button size="small" onClick={onRemove}>
            <i className="fa-solid fa-x"></i>
          </Button>
        ) : (
          <Box sx={{ pr: 2 }} />
        )}
      </Box>
    </>
  );
}
