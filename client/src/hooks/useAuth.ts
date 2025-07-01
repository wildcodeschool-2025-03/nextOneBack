export default function useAuth() {
  const user = localStorage.getItem("user");
  const role = localStorage.getItem("userRole");

  return {
    isAuthenticated: !!user,
    user: user ? JSON.parse(user) : null,
    role: role || null,
    isAdmin: () => role === "admin",
    isPlayer: () => role === "player",
  };
}
