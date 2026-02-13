export default function Navbar() {
  return (
    <div className="w-full border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
        <h1 className="text-xl font-bold">NGO Platform</h1>
        <div className="flex gap-6">
          <span>Home</span>
          <span>Campaigns</span>
          <span>About</span>
          <span>Login</span>
        </div>
      </div>
    </div>
  );
}
