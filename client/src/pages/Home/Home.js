import React, { useState } from "react";
// import { StreamChat } from "stream-chat";
// import { getMaxListeners } from "../../../../server/src/models/userModel";
import { login, register } from "../../apiCalls";
function Home() {
  const [registerData, setRegisterData] = useState({
    email: "jon@gmail.com",
    password: "holahola",
    userName: "croat",
    phone: "679899863",
  });
  const [loginData, setLoginData] = useState({
    password: "holahola",
    userName: "croat",
  });
  // const StreamChat = require("stream-chat").StreamChat;
  // const client = StreamChat.getInstance(
  //   "skkkwp5dqzne6bkvs9fw29htfjd8v8k88c6pc4fmj24etspjjrhwrw2wtdzwe2dfa5aynxmzfmu3"
  // );
  function log() {
    login(loginData).then((res) => console.log(res));
  }
  function reg() {
    register(registerData).then((res) => console.log(res));
  }
  return (
    <>
      <button onClick={reg}>Register a user</button>
      <button onClick={log}>log a user</button>
    </>
  );
}
export default Home;
