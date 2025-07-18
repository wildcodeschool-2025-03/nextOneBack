// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import { LoginProvider } from "./Auth/LoginContext.tsx";

/* ************************************************************************* */

// Import the main app component
import App from "./App";
import AdminPage from "./pages/AdminPage.tsx";
import Connexion from "./pages/Connexion";
import HomePage from "./pages/HomePage.tsx";
import LesArcadesPage from "./pages/LesArcadesPage.tsx";
import PlayerPage from "./pages/PlayerPage.tsx";
import SnakePage from "./pages/SnakePage.tsx";
import TarifsPage from "./pages/TarifsPage.tsx";
import TicTacToePage from "./pages/TicTacToePage.tsx";
import AdminProtected from "./pages/layout/AdminProtected.tsx";

// Import additional components for new routes
// Try creating these components in the "pages" folder

// import About from "./pages/About";
// import Contact from "./pages/Contact";

/* ************************************************************************* */

// Create router configuration with routes
// You can add more routes as you build out your app!
const router = createBrowserRouter([
  {
    element: <App />, // Renders the App component for the home page
    children: [
      { path: "/", element: <Connexion /> },
      {
        path: "/homePage", // The root path
        element: <HomePage />, // Renders the App component for the home page
      },
      {
        path: "/admin/", // The root path
        element: <AdminProtected />,
        children: [
          {
            path: "",
            element: <AdminPage />,
          },
        ], // Renders the App component for the home page
      },
      {
        path: "/arcades",
        element: <LesArcadesPage />,
      },
      {
        path: "/tarifs",
        element: <TarifsPage />,
      },
      {
        path: "/tictactoepage",
        element: <TicTacToePage />,
      },
      {
        path: "/snake", // The root path
        element: <SnakePage />, // Renders the App component for the home page
      },
      {
        path: "/player",
        element: <PlayerPage />,
      },
    ],
  },

  // The root path
  // Renders the App component for the home page

  // Try adding a new route! For example, "/about" with an About component
]);

/* ************************************************************************* */

// Find the root element in the HTML document
const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

// Render the app inside the root element
createRoot(rootElement).render(
  <StrictMode>
    <LoginProvider>
      <RouterProvider router={router} />
    </LoginProvider>
  </StrictMode>,
);

/**
 * Helpful Notes:
 *
 * 1. Adding More Routes:
 *    To add more pages to your app, first create a new component (e.g., About.tsx).
 *    Then, import that component above like this:
 *
 *    import About from "./pages/About";
 *
 *    Add a new route to the router:
 *
 *      {
 *        path: "/about",
 *        element: <About />,  // Renders the About component
 *      }
 *
 * 2. Try Nested Routes:
 *    For more complex applications, you can nest routes. This lets you have sub-pages within a main page.
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#nested-routes
 *
 * 3. Experiment with Dynamic Routes:
 *    You can create routes that take parameters (e.g., /users/:id).
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#url-params-in-loaders
 */
