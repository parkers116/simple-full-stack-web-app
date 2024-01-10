import React, { useEffect } from "react";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";

import TodoList from "./components/TodoList";
import FormSubmit from "./components/FormSubmit";
import Header from "./components/Header";
import CreateButton from "./components/CreateButton";

import "./App.scss";

axios.defaults.baseURL = process.env.REACT_APP_API;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

console.log(process.env.REACT_APP_API);

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Header />
        <TodoList />
        <FormSubmit type="create" />
        <CreateButton />
      </div>
    </QueryClientProvider>
  );
}

export default App;
