export default function Login() {
  return (
    <main className="bg-[#121212] min-h-screen p-24">
      <from className="flex flex-col gap-4">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" className="p-4 bg-[#000]" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" className="p-4 bg-[#000]" />
        <button type="submit">Login</button>
      </from>
    </main>
  );
}
