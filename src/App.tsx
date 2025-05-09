import "./App.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const POSTS: any = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
];

function App() {
  const queryClient = useQueryClient();

  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(() => [...POSTS]),
    // queryFn: () => Promise.reject("ERROR"),
  });

  const newPostMutation = useMutation({
    mutationFn: (title: any) => {
      return wait(1000).then(() => POSTS.push({ id: crypto.randomUUID(), title }));
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  if (postsQuery.isLoading) return <h1>Loading...</h1>;
  if (postsQuery.error) return <pre>{JSON.stringify(postsQuery.error)}</pre>;

  return (
    <div>
      {postsQuery.data?.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}

      <button disabled={newPostMutation.isPending} onClick={() => newPostMutation.mutate("New Post")}>
        Add New
      </button>
    </div>
  );
}

function wait(duration: any) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export default App;
