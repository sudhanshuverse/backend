import TodoItem from "./TodoItem";

const TodoItems = ({ todoItems, onDeleteClick, onCompleteClick }) => {
  return (
    <div className="space-y-3 mt-4">
      {todoItems.map((item) => (
        <TodoItem
          key={item.id}
          id={item.id}
          todoName={item.name}
          todoDate={item.dueDate}
          completed={item.complete}
          onDeleteClick={onDeleteClick}
          onCompleteClick={onCompleteClick}
        />
      ))}
    </div>
  );
};

export default TodoItems;