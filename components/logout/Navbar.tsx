function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/auth/login";
  }

  <button
  onClick={handleLogout}
  className="ml-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
>
  Logout
</button>
