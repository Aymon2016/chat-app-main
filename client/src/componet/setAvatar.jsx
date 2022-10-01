import React from 'react'
import  { useState,useEffect} from "react";
import styled from "styled-components";
import loader from "../pages/ASSET/loader.gif";
import { useNavigate} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import logo from '../pages/ASSET/LOGO.jpg'
import  {Buffer} from "buffer";
import {setAvatarRoute} from '../utils/apiRoute'
import baby from "../pages/ASSET/baby.png"
import babo from "../pages/ASSET/babo.png"

function SetAvatar() {

    // const api = `https://api.multiavatar.com/4645646`;
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([baby,babo]);
    const [isLoading, setIsLoading] = useState(false);


    const [selectedAvatar, setSelectedAvatar] = useState(undefined);

    const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  
  useEffect(() => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    }
  }, []);
  const setProfilePicture = async () => {
   
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
     const image=avatars[selectedAvatar]
      const buffer = new Buffer(image)
      const imgString = buffer.toString("base64")
      console.log(imgString)
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: imgString
        
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(user)
        );
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };

  // useEffect( () => {
  //   const data = [];
  //   for (let i = 0; i < 4; i++) {
  //     axios.get(
  //       `${api}/${Math.round(Math.random() * 1000)}`
  //     ).then(image=>{
  //       const buff = new Buffer(image.data);
  //       const buffData = buff.toString('base64');
  //       data.push(buffData)

  //     }).catch(err=>console.log(err))
      
      
  //   }
  //   setAvatars(data);
  //   setIsLoading(false);
  // }, []);
  // useEffect(()=>{
  //   for (let i = 0; i <4; i++) {
  //       const data = [];
  //       async function fetchData(){
  //           const image = await axios.get(
  //            `${api}/${Math.round(Math.random() * 1000)}`
  //            );
              
  //           const buffer = new Buffer(image.data);
  //           data.push(buffer.toString("base64"));
          
  //       }
  //       fetchData()
  //       console.log(data)
  //       setAvatars(data)
  //       setIsLoading(false)
  //   }
  // },[])

  
  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
               
              return (
                <div
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img src={avatar} key={avatar} alt="" onClick={() => setSelectedAvatar(index)} /> 
                  
                </div>
              );
            })}
          </div>
          
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
          <ToastContainer />
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;

export default SetAvatar