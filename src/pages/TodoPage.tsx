import { useState } from 'react';
import TodoForm from '../components/TodoForm';
import type { Todo } from '../models/types';


export default function TodoPage() {
    const [todos, setTodos] = useState<Todo[]>([]);

    function handleCreate(todoData: Omit<Todo, 'id' | 'created_at'>) {
        const newTodo: Todo = {
            id: crypto.randomUUID(),
            created_at: new Date().toISOString(),
            ...todoData,
        };
        setTodos((prevTodos) => [newTodo, ...prevTodos]);
    }

    return (
        <div className=" bg-gray-50 p-10 rounded-2xl " >
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-[400px_minmax(0,1fr)]">

                {/* To-Do Liste */}
                <aside className="rounded-2xl bg-white p-4 shadow h-auto md:h-[80vh] md:flex md:flex-col">
                    <h2 className="mb-2 text-gray-600 text-lg font-semibold">Deine Aufgaben</h2>

                    {/* für leere Liste */}
                    <div className="mt-2 md:flex-1 md:overflow-auto">
                        <div className="grid gap-2 px-2 py-2">
                            {todos.map(todo => (
                                <div className='bg-sky-600 rounded-lg p-4 text-left' key={todo.id}>
                                    <h3>Titel: {todo.title}</h3>
                                    <p>Bschreibung: <br />{todo.description}</p>
                                </div>
                            ))}
                        </div>
                        {todos.length === 0 && (
                            <div className="text-lg text-gray-500">Noch nichts eingetragen.</div>
                        )}
                    </div>
                </aside>

                {/* Aufgaben erstellen */}
                <main className="rounded-2xl bg-white p-6 shadow">
                    <TodoForm onCreate={handleCreate} />
                </main>
            </div>
        </div>
    );
}