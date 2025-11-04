import type { Todo } from '../models/types';
import { useState } from 'react';


interface Props {
    onCreate?: (todoData: Omit<Todo, 'id' | 'created_at'>) => void;
}

export default function TodoForm({ onCreate }: Props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const t = title.trim();
        if (t === '') {
            alert('Der Titel darf nicht leer sein.');
            return;
        }

        onCreate?.({
            title: t,
            description: description.trim() || undefined,
            status: 'offen',
        });

        setTitle('');
        setDescription('');
        alert('Aufgabe gespeichert!');
    }


    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h2 className="mb-2 text-gray-600 text-lg font-semibold">Aufgaben erstellen</h2>
            <div>
                <label className=" block mb-3 font-medium text-gray-700" htmlFor="title">
                    Titel*
                </label>
                <input
                    className="w-full text-gray-800 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Gib den Titel deiner Aufgabe ein"
                    required
                />  

            </div>

            <div>
                <label className="block mb-3 font-medium text-gray-700" htmlFor="description">
                    Beschreibung
                </label>
                <textarea
                    className="w-full text-gray-800 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="description"
                    name="description"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Gib eine Beschreibung für deine Aufgabe ein"
                ></textarea>
            </div>
            <small className="text-gray-500 self-start">* Pflichtfeld</small>

            <div className='flex flex-col gap-4 justify-center md:flex-row'>
                <button
                    type="submit"
                    className="self-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Speichern
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setTitle('');
                        setDescription('');
                    }}
                    className="self-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Zurücksetzen
                </button>
            </div>

        </form>
    );
}