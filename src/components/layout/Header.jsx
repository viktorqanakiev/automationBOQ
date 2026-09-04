import { CircleHelp, Home, Settings, Layers3 } from 'lucide-react';

function Header({ activePage, onNavigate }) {
  return (
    <header className="app-header">
      <div className="brand" onClick={() => onNavigate('home')}>
        <div className="brand-icon">
          <Layers3 size={21} strokeWidth={2.2} />
        </div>
        <span>BOQ Automation</span>
      </div>

      <nav className="main-nav" aria-label="Main navigation">
        <button
          className={`nav-item ${activePage === 'home' ? 'active' : ''}`}
          onClick={() => onNavigate('home')}
        >
          <Home size={16} />
          <span>Home</span>
        </button>

        <button
          className={`nav-item ${activePage === 'settings' ? 'active' : ''}`}
          onClick={() => onNavigate('settings')}
        >
          <Settings size={16} />
          <span>Settings</span>
        </button>

        <button
          className={`nav-item ${activePage === 'help' ? 'active' : ''}`}
          onClick={() => onNavigate('help')}
        >
          <CircleHelp size={16} />
          <span>Help</span>
        </button>
      </nav>
    </header>
  );
}

export default Header;