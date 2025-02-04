import { useState } from "react"
import { Trash2, Edit2, Plus, Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Todo {
  id: number
  text: string
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editText, setEditText] = useState("")

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo }])
      setNewTodo("")
    }
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const startEditing = (id: number, text: string) => {
    setEditingId(id)
    setEditText(text)
  }

  const updateTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text: editText } : todo)))
    setEditingId(null)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground p-4">
        <h1 className="text-2xl font-bold text-center">Todo List App</h1>
      </header>

      <main className="flex-grow container mx-auto p-4">
        <div className="flex mb-4">
          <Input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter a new todo"
            className="flex-grow mr-2"
          />
          <Button onClick={addTodo}>
            <Plus className="w-4 h-4 mr-2" /> Add Todo
          </Button>
        </div>

        <ul className="space-y-2">
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center bg-card p-2 rounded-md">
              {editingId === todo.id ? (
                <>
                  <Input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-grow mr-2"
                  />
                  <Button onClick={() => updateTodo(todo.id)} size="sm">
                    <Check className="w-4 h-4" />
                  </Button>
                </>
              ) : (
                <>
                  <span className="flex-grow">{todo.text}</span>
                  <Button onClick={() => startEditing(todo.id, todo.text)} size="sm" variant="ghost" className="mr-2">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button onClick={() => deleteTodo(todo.id)} size="sm" variant="ghost">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </>
              )}
            </li>
          ))}
        </ul>
      </main>

      <footer className="bg-muted p-4 text-center">
        <p>&copy; 2025 Todo List App. All rights reserved.</p>
      </footer>
    </div>
  )
}

