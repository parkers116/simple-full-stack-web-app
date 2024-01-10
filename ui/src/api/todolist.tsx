import axios from "axios";

import { SelectedItemType } from "../components/TodoList";

export const getTodoList = async () => {
  return axios
    .get("/")
    .then((res) => {
      return Promise.resolve(res.data.data as Array<SelectedItemType>);
    })
    .catch((err) => {
      console.error(err);
      return Promise.reject(err);
    });
};

export const postTodoList = async (data: any) => {
  return axios
    .post("/", data)
    .then((res) => {
      return Promise.resolve();
    })
    .catch((err) => {
      console.error(err);
      return Promise.reject(err);
    });
};

export const putTodoList = async (data: any) => {
  return axios
    .put("/", data)
    .then((res) => {
      return Promise.resolve();
    })
    .catch((err) => {
      console.error(err);
      return Promise.reject(err);
    });
};

export const deleteTodoList = async (data: any) => {
  return axios
    .delete("/", { data: data })
    .then((res) => {
      return Promise.resolve();
    })
    .catch((err) => {
      console.error(err);
      return Promise.reject(err);
    });
};
