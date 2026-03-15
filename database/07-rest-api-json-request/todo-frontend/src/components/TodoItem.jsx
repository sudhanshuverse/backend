function TodoItem({
  id,
  todoName,
  todoDate,
  completed,
  onDeleteClick,
  onCompleteClick,
}) {
  const formattedDate = todoDate
    ? new Date(todoDate).toLocaleDateString("en-GB")
    : "";

  return (
    <div
      className={`flex justify-between items-center p-4 rounded-lg shadow transition 
      ${completed ? "bg-green-50 opacity-70" : "bg-white"}`}
    >
      <div>
        <p
          className={`font-medium ${completed ? "line-through text-gray-400" : ""
            }`}
        >
          {todoName}
        </p>

        <p className="text-sm text-gray-500">{formattedDate}</p>
      </div>

      <div className="flex gap-2">
        {!completed && (
          <button
            onClick={() => onCompleteClick(id)}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            Complete
          </button>
        )}

        <button
          onClick={() => onDeleteClick(id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;