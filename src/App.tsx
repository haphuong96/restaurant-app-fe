// import { useState } from 'react'
import "./App.css";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";

// The App component is a placeholder for the root route of the application.
const App = () => {
  return (
    <Suspense>
      <Outlet />
    </Suspense>
  );
};
export default App;
