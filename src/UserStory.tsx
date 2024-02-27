import { MDBCheckbox, MDBCol, MDBContainer } from "mdb-react-ui-kit";
import type { UserStory } from "./types/user_story";

export default function ({
  userStory,
  sendToParent,
}: {
  userStory: UserStory;
  sendToParent: (isActive: boolean) => void;
}) {
  return (
    <>
      <MDBContainer>
        <MDBCheckbox
          disableWrapper={true}
          defaultChecked={userStory.state}
          onChange={(e) => sendToParent(e.currentTarget.checked)}
          label={userStory.descript}
        />
      </MDBContainer>
    </>
  );
}
