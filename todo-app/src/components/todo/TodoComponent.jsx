import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./security/AuthContext";
import { createTodoApi, retriveTodoApi, updateTodoApi } from "./TodoApiService";
import { useEffect, useState } from "react";
import { Field, Formik, Form } from "formik";

export default function TodoComponent() {
  const { id } = useParams();
  const authContext = useAuth();
  const username = authContext.username;
  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const navigate = useNavigate();
  useEffect(() => retrieveTodo(), [id]);

  function retrieveTodo() {
    if (id !== -1) {
      retriveTodoApi(username, id)
        .then((response) => {
          setDescription(response.data.description);
          setTargetDate(response.data.targetDate);
        })
        .catch((error) => console.log(error));
    }
  }
  function onSubmit(values) {
    console.log(values);
    const todo = {
      id: id,
      username: username,
      description: values.description,
      targetDate: values.targetDate,
      done: false,
    };
    if (id === -1) {
      createTodoApi(username, todo)
        .then((response) => {
          navigate("/todo");
        })
        .catch((error) => console.log(error));
    } else {
      updateTodoApi(username, id, todo)
        .then((response) => {
          navigate("/todo");
        })
        .catch((error) => console.log(error));
    }
  }
  return (
    <div className="container">
      <h1>Enter todo details</h1>
      <Formik
        initialValues={{ description, targetDate }}
        enableReinitialize={true}
        onSubmit={onSubmit}
      >
        {(props) => (
          <Form>
            <fieldset className="form-group">
              <label>Description</label>
              <Field
                type="text"
                className="form-control"
                name="description"
              ></Field>
            </fieldset>
            <fieldset className="form-group">
              <label>Target Date</label>
              <Field
                type="Date"
                className="form-control"
                name="targetDate"
              ></Field>
            </fieldset>
            <div>
              <button className="btn btn-success m-5" type="submit">
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
