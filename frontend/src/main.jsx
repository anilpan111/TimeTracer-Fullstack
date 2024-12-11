import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import App from "./App.jsx";
import "./index.css";
import {
  RouterProvider,
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./Pages/Home.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import Profile from "./Components/Profile.jsx";
import CalendarPage from "./Pages/CalendarPage.jsx";
import TaskPage from "./Pages/TaskPage.jsx";
import DashboardPage from "./Pages/DashboardPage.jsx";
import ProfilePage from "./Pages/ProfilePage.jsx";
import ContactPage from "./Pages/ContactPage.jsx";
import AboutPage from "./Pages/AboutPage.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="calendar" element={<CalendarPage />} />
      <Route path="tasks" element={<TaskPage />} />
      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="profile" element={<Profile />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="contact" element={<ContactPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <NextUIProvider>
        <main className="dark text-foreground bg-background">
          <RouterProvider router={router} />
        </main>
      </NextUIProvider>
    </Provider>
  </React.StrictMode>
);
