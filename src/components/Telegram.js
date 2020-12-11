import React from "react";
import './Telegram.css'
import Sidebar from "./Sidebar";
import Thread from "./Thread";

const Telegram = () => {
  return (
    <div className="telegram">
      <Sidebar />
      <Thread/>
    </div>
  );
};

export default Telegram;
