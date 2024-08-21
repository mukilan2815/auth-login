import { createSignal, onMount } from "solid-js";
import { initAuth0 } from "./authConfig";

function AuthButtons() {
  const [auth0, setAuth0] = createSignal(null);
  const [isAuthenticated, setIsAuthenticated] = createSignal(false);
  const [user, setUser] = createSignal(null);

  onMount(async () => {
    const auth0Client = await initAuth0();
    setAuth0(auth0Client);

    const isAuthenticated = await auth0Client.isAuthenticated();
    setIsAuthenticated(isAuthenticated);

    if (isAuthenticated) {
      const userProfile = await auth0Client.getUser();
      setUser(userProfile);
    }
  });

  const handleLogin = async () => {
    try {
      await auth0().loginWithRedirect();
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await auth0().logout({
        returnTo: window.location.origin,
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div class="p-4">
      {!isAuthenticated() ? (
        <button
          class="bg-blue-500 text-white px-4 py-2 rounded shadow"
          onClick={handleLogin}
        >
          Login
        </button>
      ) : (
        <div>
          <p>Welcome, {user()?.name}</p>
          <button
            class="bg-red-500 text-white px-4 py-2 rounded shadow mt-4"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default AuthButtons;
