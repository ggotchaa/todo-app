interface Props {
    currentTodos: number;
    allTodos: number;
}
  const TodoHeader = ({ currentTodos, allTodos }: Props) => {
    return (
      <header>
        <h1>Todo App</h1>
        <p>
          Сделано: {currentTodos}/{allTodos}
        </p>
      </header>
    );
};
  
export default TodoHeader;