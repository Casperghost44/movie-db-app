export default function Create() {
  return (
    <main className="bg-[#121212] min-h-screen p-24">
      <from className="flex flex-col gap-4">
        <label htmlFor="title">Movie Title</label>
        <input type="text" name="title" className="p-4 bg-[#000]" />
        <label htmlFor="genre">Movie Genre</label>
        <input type="text" name="genre" className="p-4 bg-[#000]" />
        <label htmlFor="dor">Movie Release date</label>
        <input type="date" name="dor" className="p-4 bg-[#000]" />
        <label htmlFor="length">Movie Lenght (in minutes)</label>
        <input type="number" name="length" className="p-4 bg-[#000]" />
        <button type="submit">Create</button>
      </from>
    </main>
  );
}
