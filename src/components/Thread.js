import { Avatar, IconButton } from "@material-ui/core";
import {
  MicNoneOutlined,
  MoreHoriz,
  SendRounded,
  TimerOutlined,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import "./Thread.css";
import db from "../firebase";
import firebase from "firebase";
import { useSelector } from "react-redux";
import { selectThreadName, selectThreadId } from "../features/threadSlice";
import { selectUser } from "../features/userSlice";
import Message from "./Message";

const Thread = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const threadName = useSelector(selectThreadName);
  const threadId = useSelector(selectThreadId);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (threadId) {
      db.collection("threads")
        .doc(threadId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [threadId]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("threads")
      .doc(threadId)
      .collection("messages")
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        uid: user.uid,
        photo: user.photo,
        email: user.email,
        displayName: user.displayName,
      })
      .then(() => {
        setInput("");
      });
  };
  
  return (
    <div className="thread">
      <div className="thread__header">
        <div className="thread__header__contents">
          <Avatar src={messages[0]?.data?.photo} />
          <div className="thread__header__content__info">
            <h4>{threadName}</h4>
            <h5>Last Seen {"  "}</h5>
          </div>
        </div>
        <IconButton>
          <MoreHoriz className="thread__header__details" />
        </IconButton>
      </div>
      <div className="thread__messages">
        {messages.map(({ id, data }) => (
          <Message key={id} data={data} />
        ))}
      </div>
      <div className="thread__input">
        <form>
          <input
            placeholder="Write a message..."
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></input>
          <IconButton>
            <TimerOutlined />
          </IconButton>
          <IconButton onClick={sendMessage} >
            <SendRounded  />
          </IconButton>
          <IconButton>
            <MicNoneOutlined />
          </IconButton>
        </form>
      </div>
    </div>
  );
};

export default Thread;
