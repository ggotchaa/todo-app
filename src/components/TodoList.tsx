import { useEffect, useState } from "react";
import { FiDelete } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import "../styles/styles.css";
import TodoHeader from "./TodoHeader";

interface Todo {
  id: number;
  text: string;
  completed?: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    // достаем список сохраненных туду из localstorage
    const localValue = localStorage.getItem("todosData");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });
  useEffect(() => {
    localStorage.setItem("todosData", JSON.stringify(todos));
  }, [todos]);

  const [inputValue, setInputValue] = useState("");
  // ипут для добавления туду
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // кнопка добавления туду
  const handleAddTodo = () => {
    if (inputValue.trim() === "") {
      return;
    }
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: Math.random() * 1234, text: inputValue, completed: false },
      ];
    });
    setInputValue("");
  };

  // чтобы удалить айтем фильтруем массив без айдишки
  const handleDeleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    // добавляем новый айтем в массив в стейт
    setTodos(updatedTodos);
    localStorage.setItem("todosData", JSON.stringify(updatedTodos));
  };
  const toggleTodo = (id: number, completed: boolean) => {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  const filteredTodos = todos
    ? todos.filter((todo) => todo.completed !== false)
    : [];
  return (
    <section id="todoList">
      <TodoHeader currentTodos={filteredTodos.length} allTodos={todos.length} />
      <div className="input">
        <input
          type="text"
          placeholder="add a todo..."
          value={inputValue}
          name="input"
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
        />
        <button onClick={handleAddTodo}>
          <IoMdAdd />
        </button>
      </div>
      <ul>
        {todos.length === 0 && (
          <li
            style={{
              textAlign: "center",
              display: "block",
              padding: "5px 0 10px",
              borderBottom: "1px solid gainsboro",
            }}
          >
            Пусто? Добавь задачу {":)"}
          </li>
        )}
        {todos.map((todo, index) => (
          <li key={index}>
            <span className={todo.completed ? "completed" : ""}>
              <input
                id="checkbox"
                type="checkbox"
                checked={todo.completed}
                onChange={(e) => toggleTodo(todo.id, e.target.checked)}
              />
              {todo.text}
            </span>
            <button
              className="danger"
              onClick={() => handleDeleteTodo(todo.id)}
            >
              <FiDelete />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TodoList;