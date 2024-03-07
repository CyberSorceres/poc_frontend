import { Box, Collapse } from "@mui/material";
import { useState } from "react";
import { EpicStory } from "./types/epic_story";
import { User } from "./types/user";
import UserStory from "./UserStory";

export default function EpicStoryComponent({
  epicStory,
  users,
}: {
  epicStory: EpicStory;
  users: User[];
}) {
  const [showUserStories, setShowUserStories] = useState(false);
  return (
    <>
      <Box sx={{ flexDirection: "row", display: "flex", alignItems: "center" }}>
        <i className={`arrow ${showUserStories ? "down" : "right"}`}></i>
        <h4 onClick={() => setShowUserStories(!showUserStories)}>
          {" "}
          {epicStory.title}{" "}
        </h4>
      </Box>

      <Collapse in={showUserStories}>
        {epicStory.userStory.map((u) => (
          <UserStory userStory={u} users={users} sendToParent={() => {}} />
        ))}
      </Collapse>
    </>
  );
  /*return <>
        <MDBContainer fluid className="d-block bg-secondary">
          <MDBRow onClick={() => setShowUserStories(!showUserStories)}>
            <span className="epic-story">
              <i className={`arrow ${showUserStories ? "down" : "right"}`}></i>
              &nbsp;
              <MDBCheckbox
                disableWrapper={true}
                checked={isComplete}
               readOnly={true}
                onChange={() => {}}
                label={epicStory.title}
              />{" "}
            </span>
          </MDBRow>
         <MDBCollapse open={showUserStories}>
            {epicStory.userStory.map((u, i) => {
              return (
                <MDBRow key={u._id}>
                  <UserStory
                    key={u._id}
                    userStory={u}
                   users={users}
                    sendToParent={(a) => {
                      u.state = a;
                      setEnabled([
                        ...isEnabled.slice(0, i),
                        a,
                       ...isEnabled.slice(i + 1),
                      ]);
                    }}
                  />
                </MDBRow>
             );
            })}
          </MDBCollapse>
        </MDBContainer>
      </>*/
}
