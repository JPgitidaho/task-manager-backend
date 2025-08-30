const Task = require('../models/Task')

const createTask = async (req, res) => {
  try {
    const task = new Task({ ...req.body, user: req.user.id })
    const savedTask = await task.save()
    res.status(201).json(savedTask)
  } catch (error) {
    res.status(500).json({ msg: 'Error al crear la tarea', error })
  }
}

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 })
    res.json(tasks)
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener tareas', error })
  }
}

const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    )
    if (!task) return res.status(404).json({ msg: 'Tarea no encontrada' })
    res.json(task)
  } catch (error) {
    res.status(500).json({ msg: 'Error al actualizar la tarea', error })
  }
}

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id })
    if (!task) return res.status(404).json({ msg: 'Tarea no encontrada' })
    res.json({ msg: 'Tarea eliminada correctamente' })
  } catch (error) {
    res.status(500).json({ msg: 'Error al eliminar la tarea', error })
  }
}

module.exports = { getTasks, createTask, updateTask, deleteTask }
