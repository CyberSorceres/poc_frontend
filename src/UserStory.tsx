import { MDBCheckbox, MDBCol, MDBContainer, MDBInput, MDBSelect} from "mdb-react-ui-kit";
import type { UserStory } from "./types/user_story";
import {useMemo} from "react";

export default function ({
  userStory,
  sendToParent,
}: {
  userStory: UserStory;
  sendToParent: (isActive: boolean) => void;
}) {
  /*const data = useMemo(
    () => [ {userStory?.user?.filter((u) => u.role=="dev" ).map((f) =>(
      { text: f.name, value: f.name },
    ))??[]}
      
    ],
    []
  );*/
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
      <select className="chooseRole">
        {userStory?.user?.filter((u) => u.role=="dev" ).map((f) =>(
          <>
          <option>{f.name}</option>
          </>
        ))??[]}
        </select>
       {/*} <MDBContainer style={{ width: "300px" }} className="mt-5">
      {inputActive ? (
        <MDBInput onBlur={inputOnBlur} inputRef={otherInputEl} label="Other" id="form1" type="text" />
      ) : (
        <MDBSelect
          onValueChange={(e) => setCurrentValue(e)}
          label="Example label"
          data={data}
        />
      )}
    </MDBContainer>{*/}
      <div>
        {userStory?.feedback?.map((f) => (
          <>
            {" "}
            <div className="feedback">
            <label for="w3review">{f.user}</label>
            <textarea id="w3review" name="w3review" rows="4" cols="50">
              {f.text}
            </textarea>
            </div>
          </>
        )) ?? []}
      </div>
    </>
  );
}
