import React, { useState } from "react";
import "./Modal.css";
import axios from "axios";

function Modal({ closeModal }) {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const clickCreateAccountButton = async (e) => {
    e.preventDefault();
    const res = await axios.post("/createAccount", {
      fname,
      lname,
      password,
      email,
    });

    closeModal(false);

    return alert(res.data.message);
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              closeModal(false);
            }}
          >
            {" "}
            X{" "}
          </button>
        </div>
        <div className="title">
          <h1>Lets create a new account!</h1>
        </div>
        <form onSubmit={clickCreateAccountButton}>
          <div className="body">
            <div>
              First Name:
              <input
                type="text"
                name="fname"
                onChange={(e) => setFname(e.target.value)}
                value={fname}
              />
            </div>
            <div>
              Last Name:
              <input
                type="text"
                name="lname"
                onChange={(e) => setLname(e.target.value)}
                value={lname}
              />
            </div>
            <div>
              Email:
              <input
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>

            <div>
              Password:
              <input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
          </div>

          <div className="footer">
            <button type="submit">Create Account</button>
            <button
              onClick={() => {
                closeModal(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
