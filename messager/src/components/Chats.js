import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
export default function Chats() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const handleLogout = async () => {
    await auth.signOut();

    history.push("/");
  };

  const getFile = async (url) => {
    const response = await fetch(url);

    const data = await response.blob();

    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    if (!user) {
      history.push("/");
      return;
    }
    
    axios
      .get("https://api.chatengine.io/users/me/", {
        headers: {
          "project-id": "08e3082a-c804-4566-84db-1c7896978b19",
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        const data = {
          username: user.email,
          secret: user.uid,
          avatar: getFile()
        }
        axios
        .post("https://api.chatengine.io/users/", data, {
          headers: {
            "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY,
          },
        })
        .then((response) => {
          setLoading(false);
          console.log(response);
        })
        .catch((error) => console.log(error));  
       
      });
  }, [user, history]);

  if (!user || loading) return "...Loading";

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">Unichat</div>
        <div className="logout-tab" onClick={handleLogout}>
          Logout
        </div>
      </div>

      <ChatEngine
        height="calc(100vh - 66px)"
        projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
}
