import { useEffect, useReducer, useState } from "react";
import { todoReducer } from "../todoReducer";

const init = () => {
  return JSON.parse(localStorage.getItem("todos")) || [];
};

export const useTodos = () => {
  const [todos, dispatch] = useReducer(todoReducer, [], init);
  const [todoAll, setTodoAll] = useState(0);
  const [todoPending, setTodoPending] = useState(0);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    setTodoAll(todos.length);
    setTodoPending(todos.filter((todo) => !todo.done).length);
  }, [todos]);

  const handleNewTodo = (todo) => {
    const action = {
      type: "[TODO] Add Todo",
      payload: todo,
    };

    dispatch(action);
  };

  const onRemoveTodo = (todo) => {
    const action = {
      type: "[TODO] Remove Todo",
      payload: todo,
    };

    dispatch(action);
  };

  const onToggleTodo = (todo) => {
    const action = {
      type: "[TODO] Toggle Todo",
      payload: { ...todo, done: !todo.done },
    };

    dispatch(action);
  };

  return {
    todos,
    todoAll,
    todoPending,
    handleNewTodo,
    onRemoveTodo,
    onToggleTodo,
  };
};
