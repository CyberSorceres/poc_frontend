import type { EpicStory } from "./types/epic_story";
import { useEffect, useState } from "react";
import {
  MDBCheckbox,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCollapse,
} from "mdb-react-ui-kit";
import UserStory from "./UserStory";
import "./index.css";

export default function ({ epicStory }: { epicStory: EpicStory }) {
  const [showUserStories, setShowUserStories] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isEnabled, setEnabled] = useState(
    epicStory.userStory.map((e) => e.state),
  );
    useEffect(() => {
	console.log(isEnabled)
    setIsComplete(epicStory.userStory.every(u=>u.state))
  }, [isEnabled]);
  return (
    <>
      <MDBContainer fluid className="d-block bg-secondary">
        <MDBRow onClick={() => setShowUserStories(!showUserStories)}>
          <span className="epic-story">
            <i className={`arrow ${showUserStories ? "right" : "down"}`}></i>
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
              <MDBRow>
                <UserStory
                  key={u.descript}
                  userStory={u}
                  sendToParent={(a) => {
                    u.state = a;
                    setEnabled([
                      ...isEnabled.slice(0, i),
                      a,
                      ...isEnabled.slice(i+1),
                    ]);
                  }}
                />
              </MDBRow>
            );
          })}
        </MDBCollapse>
      </MDBContainer>
    </>
  );
}
