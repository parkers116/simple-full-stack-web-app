import React, { useEffect } from "react";
import TodoList from "./components/TodoList";
import Form from "./components/FormSubmit";
import Header from "./components/Header";
import CreateButton from "./components/CreateButton";

import "./App.scss";

function App() {
  useEffect(() => {}, []);
  return (
    <div className="App">
      <Header />
      <TodoList />
      <Form />
      <CreateButton />
    </div>
  );
}

export default App;
