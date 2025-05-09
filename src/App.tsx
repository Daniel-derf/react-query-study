import "./App.css";
import { useQuery, useMutation } from "@tanstack/react-query";

const POSTS = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
];

function App() {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(() => [...POSTS]),
    // queryFn: () => Promise.reject("ERROR"),
  });

  if (postsQuery.isLoading) return <h1>Loading...</h1>;
  if (postsQuery.error) return <pre>{JSON.stringify(postsQuery.error)}</pre>;

  return (
    <div>
      {postsQuery.data?.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}

function wait(duration: any) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export default App;
