
import { MDBCheckbox, MDBCol, MDBContainer, MDBInput} from "mdb-react-ui-kit";
import type { UserStory } from "./types/user_story";
import type { User } from "./types/user";
import Select, { ValueType } from 'react-select';
import React, { useCallback, useEffect, useMemo, useRef, useState, CSSProperties, SetStateAction } from "react";


export default function UserStory({
  userStory,

  users = [],
  sendToParent,
}: {
  userStory: UserStory;
  users: User[];

  sendToParent: (isActive: boolean) => void;
}) {
  const data= user?.filter((u) => u.role=="sviluppatore" ).map((u) => ({ value: u._id, label: u.name }));
  console.log(data);
  /*const data= [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' },
  ];*/
  const [selectedOption, setSelectedOption] = useState<{ value: string; label: string; } | null>(null);

  const handleChange = (selectedOption: ValueType<{ value: string; label: string; }>) => {
    setSelectedOption(selectedOption);
  }
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

      {(import.meta.env.VITE_ROLE=="pm") ?
      <>
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={data}
      />
       {/*}
      <MDBSelect
          onValueChange={(e) => setCurrentValue(e)}
          label="Assegna uno sviluppatore alla user story"
          data={data}
        />
       
      <form className="chooseRole">
      <select id="assign" >
        {user?.filter((u) => u.role=="sviluppatore" ).map((f) =>( 
          <>
          <option key={f._id}>{f.name}</option>
          </>
        ))??[]}
        </select>
        </form>{*/}
         </>
         :
        <></>
      }
    
      

        {/*}
      <select className="chooseRole">
        {users
          ?.filter((u) => u.role == "sviluppatore")
          .map((f) => <option key={f._id}>{f.name}</option>) ?? []}
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
          <div key={f._id}>
            {" "}
            <div className="feedback">
              <label htmlFor="w3review">{f.user}</label>
              <textarea
                id="w3review"
                name="w3review"
                rows="4"
                cols="50"
                defaultValue={f.text}
              ></textarea>
            </div>
          </div>
        )) ?? []}
      </div>
    </>
  );
}
