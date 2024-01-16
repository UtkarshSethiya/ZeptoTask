import React, { useState } from "react";
import im1 from "./img/im1.jpg";
import im2 from "./img/im2.jpg";
import im3 from "./img/im3.jpg";
import im4 from "./img/im4.jpg";
import im5 from "./img/im5.jpg";
import im6 from "./img/im6.jpg";
import im7 from "./img/im7.jpg";
import im8 from "./img/im8.jpg";
export default function Chip() {
  let data = [
    {
      id: 1,
      name: "Staceiya bluemi",
      email: "stacygrey@gmail.com",
      photoURL: im1,
    },
    {
      id: 2,
      name: "Jassona Grey",
      email: "jassonasgrey@gmail.com",
      photoURL: im2,
    },
    {
      id: 3,
      name: "Bob Johans",
      email: "bobjohansson@gmail.com",
      photoURL: im4,
    },
    {
      id: 4,

      name: "Mike Downey",
      email: "mikedowney@gmail.com",
      photoURL: im3,
    },
    {
      id: 5,

      name: "Robe Downey",
      email: "robedowney@gmail.com",
      photoURL: im5,
    },
    {
      id: 6,

      name: "John Downey",
      email: "johndowney@gmail.com",
      photoURL: im6,
    },
    {
      id: 7,

      name: "Andrie Richard",
      email: "andrierichard@gmail.com",
      photoURL: im7,
    },
    {
      id: 8,

      name: "Charlie Thomas",
      email: "charlsthomas@gmail.com",
      photoURL: im8,
    },
  ];
  const [input, setInput] = useState("");

  const [backCount, setBackCount] = useState(1);
  const [userid, setUserId] = useState(null);
  const [userList, setUserList] = useState([]);
  const [suggestionList, setSuggestionList] = useState(data);
  const [style, setStyle] = useState(false);
  const deleteUser = (params) => {
    setUserList(
      userList.filter((item) => {
        return item.id != params.id;
      })
    );
    setSuggestionList([...suggestionList, params]);
  };

  const addUser = (params) => {
    setUserList([...userList, params]);
    setSuggestionList(
      suggestionList.filter((item) => {
        return item.id != params.id;
      })
    );
    setInput("");
    setBackCount(1);
    setStyle(false);
  };

  const handleKeyDown = (event) => {
    if (event.key == "Backspace" && userList.length > 0 && input == "") {
      setBackCount(backCount + 1);
      console.log(backCount);
      if (backCount == 1) {
        setStyle(true);
        console.log("in1");
      } else if (backCount == 2) {
        console.log(backCount);
        let temp = userList;
        setStyle(false);
        setBackCount(1);
        setSuggestionList([...suggestionList, temp[temp.length - 1]]);

        temp.pop();
        setUserList(temp);
      }
    }
  };

  return (
    <div className="container">
      <label for="chips-input" class="chips">
        <div className="chip_container">
          {userList &&
            userList.map((user, index) => {
              // console.log(userList.indexOf(user),userList.length-1);

              return (
                <div
                  className="chip"
                  style={{
                    border:
                      style && userList.indexOf(user) === userList.length - 1
                        ? "2px solid blue"
                        : "none",
                  }}
                >
                  <img
                    className="profileimage"
                    src={user.photoURL}
                    height="30px"
                    width="30px"
                  />
                  <div className="chiptext">
                    {user.name}{" "}
                    <button
                      onClick={() => {
                        deleteUser(user);
                      }}
                      className="close_button"
                    >
                      {" "}
                      X
                    </button>
                  </div>{" "}
                </div>
              );
            })}
          <div className="input_container">
            <label zindex={1}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="searchinput"
                placeholder="Add new User..."
                type="text"
                id="chips-input"
                zindex={1}
              />
              <div className="suggestion_container">
                <div className="suggestion_box">
                  {input.length > 0 &&
                    suggestionList
                      .filter((item) => {
                        return item.name
                          .toLowerCase()
                          .includes(input.toLowerCase());
                      })
                      .map((suggestion) => {
                        return (
                          <>
                            <li
                              className="suggestions"
                              onClick={() => {
                                addUser(suggestion);
                              }}
                            >
                              <img
                                className="suggestionimage"
                                src={suggestion.photoURL}
                                height="30px"
                                width="30px"
                              />
                              <div className="suggestion_name">
                                <p>{suggestion.name} </p>
                              </div>
                              <p className="suggestion_email">
                                {suggestion.email}
                              </p>
                            </li>
                          </>
                        );
                      })}
                </div>
              </div>
            </label>
          </div>
        </div>
      </label>
    </div>
  );
}
