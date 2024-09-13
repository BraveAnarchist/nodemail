import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [dataSaved, setDataSaved] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://nodemail-2.onrender.com/sendEmail",
        {
          name,
          email,
          message,
        }
      );
      if (response.status === 200 && response.statusText === "Ok") {
        setDataSaved(!dataSaved);
      }
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div style={{display:"flex",justifyContent:"center",marginTop:"10vh",height:"100vh"}}>
      <form action="" onSubmit={handleSubmit}>

      {dataSaved ? <p className="success">Email Sent</p> : ""}
      <h2 style={{marginBottom:"2vh"}}>Node mailer</h2>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          name="name"
          onChange={(e) => setName(e.target.value)}
        />{" "}
        <br />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />{" "}
        <br />
        <textarea
          name="message"
          value={message}
          id=""
          placeholder="Enter your message"
          onChange={(e) => setMessage(e.target.value)}
        >
          {message}
        </textarea>
        <br />
        <button type="submit">Send Email</button>
      </form>
    </div>
  );
}

export default App;
