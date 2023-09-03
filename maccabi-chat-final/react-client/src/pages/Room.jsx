import React, { useState, useEffect } from "react";
import { databases, DATABASE_ID, COLLECTION_ID_ROOMS } from "../appwriteConfig";
import { Query } from "appwrite";
import Header from "../components/Header";
import DropdownSelect from "../components/DropdownSelect";
import { useAuth } from "../utils/AuthContext";
import io from "socket.io-client";
import Chat from "../components/Chat";

const socket = io.connect("http://localhost:3001");

const Room = () => {
  const { user } = useAuth();
  const username = user.name;
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  // Selected option from DropdownSelect
  const [selectedOption, setSelectedOption] = useState({});

  const handleDropdownChange = (selectedValue) => {
    const selectedObject = rooms.find((elem) => elem.roomId == selectedValue);
    setSelectedOption(selectedObject);
    setRoom(selectedObject.roomName);
  };

  useEffect(() => {
    getRooms();
  }, []);

  // Get chat rooms from DB
  const getRooms = async () => {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_ROOMS,
      [Query.orderDesc("$createdAt"), Query.limit(25)]
    );
    setRooms(response.documents);
  };

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div>
      <div className="App">
        <main className="container">
          <Header />
          <div className="room--container">
            <div className="chat--room">
              {!showChat ? (
                <div className="joinChatContainer">
                  <h4>{user.name}! Join a chat</h4>
                  <br />

                  <DropdownSelect
                    list={rooms}
                    defaultText="Select Room"
                    elementId="roomId"
                    elementName="roomName"
                    selectedOption={selectedOption ? selectedOption.id : ""}
                    onOptionChange={handleDropdownChange} // Pass callback to handle changes
                  />
                  <br />

                  <div className="join-wrapper">
                    <button onClick={joinRoom} className="bb3">
                      Join Room
                    </button>
                  </div>
                </div>
              ) : (
                <Chat socket={socket} username={user.name} room={room} />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Room;
