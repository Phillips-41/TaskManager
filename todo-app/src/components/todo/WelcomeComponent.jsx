import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { retrieveHelloWorldPathVariable } from "./HelloWorldApiService";

function WelcomeComponent() {
  const { username } = useParams();
  console.log(username);
  const [message, setMessage] = useState(null);

  function callHelloWorldRestApi() {
    retrieveHelloWorldPathVariable("joy")
      .then((response) => sucessfulResponse(response))
      .catch((error) => errorResponse(error))
      .finally(() => console.log("cleanup"));
  }
  function sucessfulResponse(response) {
    console.log(response);
    setMessage(response.data);
  }
  function errorResponse(error) {
    console.log(error);
  }
  return (
    <div className="welcome">
      <h1>Welcome to {username}</h1>
      <div>
        Manage Your Todos - <Link to="/todo">Go Here</Link>
      </div>
      <button className="btn btn-success m-5" onClick={callHelloWorldRestApi}>
        Call Hello World
      </button>
      <div className="text-info">{message}</div>
    </div>
  );
}
export default WelcomeComponent;
