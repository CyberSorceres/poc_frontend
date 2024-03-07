import type { UserStory } from "./types/user_story";
import type { User as UserType } from "./types/user";
import User from "./User";
import { Box, Button, Card, Divider, Menu, MenuItem } from "@mui/material";
import { colors } from "./colors";
import React, { useContext } from "react";
import { LoginContext } from "./App";
import { useRevalidator } from "react-router-dom";

export default function UserStory({
  userStory,
  users = [],
  sendToParent,
}: {
  userStory: UserStory;
  users: UserType[];
  sendToParent: (isActive: boolean) => void;
}) {
  const { login } = useContext(LoginContext) ?? { login: null };
  const revalidator = useRevalidator();
  const addUser = async (user: UserType) => {
    await fetch(`${import.meta.env.VITE_API_URL}/addDev`, {
      method: "POST",
      body: JSON.stringify({
        devId: user._id,
        userStoryId: userStory._id,
      }),
    });
    revalidator.revalidate();
  };

  const removeUser = async (user: UserType) => {
    await fetch(`${import.meta.env.VITE_API_URL}/removeDev`, {
      method: "POST",
      body: JSON.stringify({
        devId: user._id,
        userStoryId: userStory._id,
      }),
    });
    revalidator.revalidate();
  };

  return (
    <>
      <Card
        sx={{
          boxShadow: 1,
          backgroundColor: colors.background,
          borderRadius: 2,
          m: 1,
          p: 2,
        }}
      >
        <h5> {userStory.title}</h5>
        <Divider sx={{ backgroundColor: colors.onBackground }} />
        {userStory.descript}
        <Divider sx={{ backgroundColor: colors.onBackground }} />
        <b>Acceptance Criteria: </b> <br />
        If Im logged in, I can log out <br />
        Then, I can log back in <br />
        {!!userStory.feedback.length && (
          <>
            <Divider sx={{ backgroundColor: colors.onBackground }} />
            <h5> Feedback: </h5>
          </>
        )}
        {userStory.feedback.map((f) => (
          <>
            <Divider sx={{ backgroundColor: colors.onBackground }} />
            {users.find((u) => u._id === f.user)?.name}
            {f.text}
          </>
        ))}
        <Divider sx={{ backgroundColor: colors.onBackground }} />
        <Box
          sx={{ flexDirection: "row", display: "flex", alignItems: "center" }}
        >
          {userStory.user.map((u) => (
            <User
              key={u._id}
              name={u.name}
              onRemove={() => removeUser(u)}
              showDelete={login === "pm"}
            />
          ))}
          {login === "pm" && (
            <Box sx={{ pl: 1 }}>
              <UserStoryMenu users={users} setUser={addUser} />
            </Box>
          )}
        </Box>
      </Card>
    </>
  );
}

function UserStoryMenu({
  users,
  setUser,
}: {
  users: UserType[];
  setUser: (user: UserType) => void;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button onClick={handleClick}>
        <i className="fa-solid fa-plus"></i>
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {users.map((u) => (
          <MenuItem
            key={u._id}
            onClick={() => {
              setUser(u);
              handleClose();
            }}
          >
            {" "}
            {u.name}{" "}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
