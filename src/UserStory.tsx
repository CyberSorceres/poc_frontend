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
      <div>
        {userStory?.feedback?.map((f) => (
          <>
            {" "}
            <label for="w3review">{f.user}</label>
            <textarea id="w3review" name="w3review" rows="4" cols="50">
              {f.text}
            </textarea>
          </>
        )) ?? []}
      </div>
    </>
  );
}
