const TodoItem = require("../models/TodoItem");

exports.createTodoItems = async (req, res, next) => {
    console.log(req.body);
    const { task, date } = req.body;
    const todoItem = new TodoItem({ task, date });
    await todoItem.save()
    res.status(201).json(todoItem)
}

exports.getTodoItems = async (req, res, next) => {
    const todoItem = await TodoItem.find();
    res.json(todoItem);
}

exports.deleteTodoItems = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "Invalid ID" });
    }

    await TodoItem.findByIdAndDelete(id);
    res.status(200).json({ _id: id });
};

exports.markCompleted = async (req, res, next) => {
    const { id } = req.params;
    const todoItem = await TodoItem.findById(id);
    todoItem.completed = true;
    await todoItem.save();
    res.json(todoItem);
}