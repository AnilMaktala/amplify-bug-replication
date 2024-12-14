import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    // client.models.Todo.observeQuery().subscribe({
    //   next: (data) => setTodos([...data.items]),
    // });
    const fetchListings = async () => {
     // setIsLoading(true);
      try {
        let filter = {};
        if (query) {
          filter = {
            or: [
              { make: { contains: query } },
              { model: { contains: query } },
              { year: { eq: parseInt(query) || 0 } },
            ],
          };
        }

        const { data: cars, errors } = await client.models.CarListing.list({
          filter: filter,
          limit: 100, // Adjust this value based on your needs
        });
        console.log(errors);
        console.log(cars);
      } catch (error) {
        console.error("Error fetching listings:", error);
        // Handle error (e.g., show error message to user)
      } finally {
        //setIsLoading(false);
      }
    };

    fetchListings();
  }, [query]);

  function createTodo() {
   // client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  return (
    <main>
      <h1>My todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
    </main>
  );
}

export default App;
