import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});
export const retrieveHelloWorld = () => apiClient.get("/hello-world");

export const retrieveHelloWorldPathVariable = (username) =>
  apiClient.get(`/hello-world/path-variable/${username}`, {
    headers: {
      Authorization: "Basic cGhpbGxpcHM6ZHVtbXk=",
    },
  });
