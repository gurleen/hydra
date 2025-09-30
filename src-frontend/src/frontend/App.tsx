"use client";

import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import "./index.css";

import { Button } from "@blueprintjs/core";
import Renderer from "./pages/Renderer";
import SocketTestPage from "./pages/TestControls";
import DebugView from "./pages/DebugView";

function About() {
  return (
    <div>
      <h1>About</h1>
      <p>This is the about page.</p>
    </div>
  );
}

function Navigation() {
  return (
    <nav
      style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}
      className="flex gap-2"
    >
      <Link to="/app">Home</Link>
      <Link to="/app/about">About</Link>
      <Link to="/app/test-controls">Controls</Link>
    </nav>
  );
}

function AppContent() {
  const location = useLocation();
  const fullViewRouteList = ["/app/debug", "/app/renderer"];
  const hideNavigation = fullViewRouteList.includes(location.pathname);

  return (
    <div className="App">
      {!hideNavigation && <Navigation />}
      <div style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/app/" element={<div />} />
          <Route path="/app/about" element={<About />} />
          <Route path="/app/renderer" element={<Renderer />} />
          <Route path="/app/test-controls" element={<SocketTestPage />} />
          <Route path="/app/debug" element={<DebugView />} />
        </Routes>
      </div>
    </div>
  );
}

export function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
