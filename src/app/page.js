import MovieCard from "../components/MovieCard";
import CreateButton from "../components/CreateButton";

export default function Home() {
  return (
    <main className="bg-[#121212] min-h-screen p-24">
      <MovieCard />
      <CreateButton />
    </main>
  );
}
