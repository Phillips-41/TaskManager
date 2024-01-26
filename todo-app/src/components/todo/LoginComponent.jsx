import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./security/AuthContext";

function LoginComponent() {
  const [username, setUsername] = useState("in28minutes");
  const [password, setPassword] = useState("");
  const [showSucessMessage, setshowSucessMessage] = useState(false);
  const [showErrorMessage, setshowErrorMessage] = useState(false);
  const navigate = useNavigate();
  const authContext = useAuth();
  //const auth = useContext(AuthContext);
  async function HandlerMessage() {
    if (await authContext.login(username, password)) {
      navigate(`/welcome/${username}`);
    } else {
      setshowErrorMessage(true);
    }
  }

  function handlerUserNameChange(event) {
    console.log(event.target.value);
    setUsername(event.target.value);
  }

  function handlerPasswordChange(event) {
    console.log(event.target.value);
    setPassword(event.target.value);
  }

  return (
    <div className="Login">
      {showSucessMessage && (
        <div className="sucessMessage">Authenticated Sucessfully</div>
      )}
      {showErrorMessage && (
        <div className="errorMessage">Authentication Failed</div>
      )}
      <div className="LoginForm">
        <div>
          <label>User Name </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handlerUserNameChange}
          ></input>
        </div>
        <div>
          <label>Password </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlerPasswordChange}
          ></input>
        </div>
        <div>
          <button type="buttton" name="login" onClick={HandlerMessage}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
export default LoginComponent;
