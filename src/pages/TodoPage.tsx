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
        <div className="container mx-auto bg-gray-100 p-10 mt-10 rounded-2xl " >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

                {/* To-Do Liste */}
                <aside className="rounded-2xl bg-white p-4 shadow-lg h-auto md:h-[80vh] md:flex md:flex-col">
                    <h2 className="mb-2">Deine Aufgaben</h2>

                    {/* für leere Liste */}
                    <div className="mt-2 md:flex-1 md:overflow-auto custom-scrollbar">
                        <div className="grid gap-2 px-2 py-2">
                            {todos.map((todo, index) => (
                               <div
                               key={todo.id}
                               className={`todo-item ${
                                 index % 2 === 0
                                   ? "bg-linear-to-br from-light-blue to-marine"
                                   : "bg-linear-to-br from-light-rosa to-purple"
                               }`}
                             >
                               <h3>Titel: {todo.title}</h3>
                               <p>
                                 Beschreibung:<br />
                                 {todo.description}
                               </p>
                             </div>
                            ))}
                        </div>
                        {todos.length === 0 && (
                            <div className="text-lg text-gray-500">Noch nichts eingetragen.</div>
                        )}
                    </div>
                </aside>

                {/* Aufgaben erstellen */}
                <main className="rounded-2xl shadow-lg bg-white p-6 shadow">
                    <TodoForm onCreate={handleCreate} />
                </main>
            </div>
        </div>
    );
}