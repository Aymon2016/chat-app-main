import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute,host } from "../utils/apiRoute";
import ChatContainer from "../componet/ChatContainer";
import Contacts from "../componet/Contacts";
import Welcome from "../componet/Welcome";

function Chat() {
  const socket = useRef();
  const navigate = useNavigate
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect( () => {

     if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
       navigate("/login");
     }
   
   }, []);

  useEffect( () => {
   async function setuser(){
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    } else {
      setCurrentUser(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )
      );
    }
  }
  setuser()
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(  () => {
    async function alluser(){
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const datas = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          
          setContacts(datas.data);
        } else {
          navigate("/setAvatar");
        }
      }
    }
  alluser()
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <>
    <Container>
        <div className="container">
          
         <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
          )}
        </div>
      </Container>
  </>
  )
}
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
export default Chat