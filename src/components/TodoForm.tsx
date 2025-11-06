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
            <h2 className="mb-2">Aufgaben erstellen</h2>
            <div>
                <label className=" block mb-4" htmlFor="title">
                    Titel*
                </label>
                <input
                    className="animate-glow"
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
                <label className="block mb-4" htmlFor="description">
                    Beschreibung
                </label>
                <textarea
                    className="animate-glow"
                    id="description"
                    name="description"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Gib eine Beschreibung für deine Aufgabe ein"
                ></textarea>
            </div>
            <small className="text-purple self-start">* Pflichtfeld</small>

            <div className='flex flex-col gap-4 justify-center md:flex-row'>
                <button
                    type="submit"
                    className="self-center animate-glow"
                >
                    Speichern
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setTitle('');
                        setDescription('');
                    }}
                    className="self-center animate-glow"
                >
                    Zurücksetzen
                </button>

            </div>

        </form>
    );
}