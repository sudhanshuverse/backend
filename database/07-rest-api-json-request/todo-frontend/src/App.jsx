import AppName from "./components/AppName";
import AddTodo from "./components/AddTodo";
import TodoItems from "./components/TodoItems";
import WelcomeMessage from "./components/WelcomeMessage";
import { useEffect, useState } from "react";
import { addItemToServer, deleteItemFromServer, getItemsFromServer, markItemCompletedOnServer } from "./services/itemsService";

function App() {
  const [todoItems, setTodoItems] = useState([]);

  useEffect(() => {
    getItemsFromServer().then((initialItems) => {
      setTodoItems(initialItems);
    });
  }, []);

  const handleNewItem = async (itemName, itemDueDate) => {
    const item = await addItemToServer(itemName, itemDueDate);
    setTodoItems([...todoItems, item]);
  };

  const handleMarkCompleted = async (id) => {
    const updatedItem = await markItemCompletedOnServer(id);

    const updatedList = todoItems.map((item) =>
      item.id === id ? updatedItem : item
    );

    setTodoItems(updatedList);
  };

  const handleDeleteItem = async (id) => {
    try {
      await deleteItemFromServer(id);
      setTodoItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const pendingTasks = todoItems.filter((item) => !item.complete);
  const completedTasks = todoItems.filter((item) => item.complete);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10">
      <div className="bg-white shadow-xl rounded-xl w-[500px] p-6">
        <AppName />
        <AddTodo onNewItem={handleNewItem} />
        {todoItems.length === 0 && <WelcomeMessage />}
        <TodoItems todoItems={todoItems} onDeleteClick={handleDeleteItem} onCompleteClick={handleMarkCompleted} />
      </div>


    </div>
  );
}

export default App;