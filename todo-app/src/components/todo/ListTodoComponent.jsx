import { useEffect, useState } from "react";
import { deleteTodoApi, retrieveAllTodosForUsername } from "./TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";

function ListTodoComponent() {
  const Authcontext = useAuth();
  const username = Authcontext.username;
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();
  const authContext = useAuth();
  useEffect(() => refreshTodos(), []);

  function refreshTodos() {
    retrieveAllTodosForUsername(username, authContext.token)
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => console.log(error));
  }
  function deleteTodo(id) {
    deleteTodoApi(username, id, authContext.token)
      .then(() => {
        refreshTodos();
      })
      .catch((error) => console.log(error));
  }
  function UpdateTodo(id) {
    navigate(`/todo/${id}`);
  }
  function AddNewTodo(id) {
    navigate(`/todo/-1`);
  }
  return (
    <div className="welcome">
      <h1>Welcome to Todo page</h1>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              {/* <th>id</th> */}
              <th>Description</th>
              <th>Is Done</th>
              <th>TargetDate</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                {/* <td>{todo.id}</td> */}
                <td>{todo.description}</td>
                <td>{todo.done.toString()}</td>
                <td>{todo.targetDate.toString()}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => UpdateTodo(todo.id)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <div className="btn btn-success m-5" onClick={AddNewTodo}>
            Create Todo
          </div>
        </div>
      </div>
    </div>
  );
}
export default ListTodoComponent;
