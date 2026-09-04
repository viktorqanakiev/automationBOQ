import { useState } from "react";
import Header from "./components/layout/Header";
import HomePage from "./pages/HomePage";
import "./styles/global.css";

function PlaceholderPage({ title, description }) {
  return (
    <main className="page-shell placeholder-page">
      <div className="page-heading">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </main>
  );
}

function App() {
  const [activePage, setActivePage] = useState("home");

  const renderPage = () => {
    if (activePage === "settings") {
      return (
        <PlaceholderPage
          title="Settings"
          description="Product mapping settings will be added here later."
        />
      );
    }

    if (activePage === "help") {
      return (
        <PlaceholderPage
          title="Help"
          description="Instructions for using BOQ Automation will be added here later."
        />
      );
    }

    return <HomePage />;
  };

  return (
    <div className="app">
      <Header activePage={activePage} onNavigate={setActivePage} />
      {renderPage()}
      <button className="help-fab" type="button" aria-label="Open help">
        ?
      </button>
    </div>
  );
}

export default App;
