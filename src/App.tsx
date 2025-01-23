import type { Schema } from '../amplify/data/resource';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';
import { DataStore } from 'aws-amplify';
import { Todo } from '../models'; // Assuming your model is named `Todo`

function App() {
  const { signOut } = useAuthenticator();
  const [todos, setTodos] = useState([]);

  // Fetch todos on mount
  useEffect(() => {
    const fetchTodos = async () => {
      const result = await DataStore.query(Todo);
      setTodos(result);
    };
    fetchTodos();

    // Optional: set up subscription for real-time updates
    const subscription = DataStore.observe(Todo).subscribe(() => {
      fetchTodos();
    });

    return () => subscription.unsubscribe(); // Cleanup subscription on unmount
  }, []);

  // Create a new todo
  const createTodo = async () => {
    await DataStore.save(new Todo({ content: 'New todo item' }));
    const result = await DataStore.query(Todo);
    setTodos(result);
  };

  // Delete a todo
  const deleteTodo = async (id: string) => {
    const toDelete = await DataStore.query(Todo, id);
    if (toDelete) {
      await DataStore.delete(toDelete);
      const result = await DataStore.query(Todo);
      setTodos(result);
    }
  };

  return (
    <main>
      <h1>My todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map(todo => (
          <li
            onClick={() => deleteTodo(todo.id)}
            key={todo.id}
          >
            {todo.content}
          </li>
        ))}
      </ul>
      <button onClick={signOut}>Sign out</button>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/">Review the next step of this tutorial.</a>
      </div>
    </main>
  );
}

export default App;

