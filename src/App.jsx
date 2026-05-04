import { useState } from 'react';
import { adminUsers } from './adminUsers.js';

// ── Constants ─────────────────────────────────────────────────────────────
const LOGIN_URL_KEY = 'isLoggedIn';
const ADMIN_ROLE_KEY = 'nalvel-admin-auth-role'; // read by logistics AuthContext

const DESTINATIONS = [
  {
    id: 'billing',
    label: 'Billing',
    sub: 'Consignment & LR management',
    path: '/billing',
    iconType: 'billing',
  },
  {
    id: 'logistics',
    label: 'Logistics',
    sub: 'Fleet & trip operations',
    path: '/logistics',
    iconType: 'logistics',
  },
];

// Unique active roles for the logistics role selector
const ROLE_OPTIONS = [
  ...new Set(
    adminUsers
      .filter((u) => u.status === 'Active')
      .map((u) => u.role),
  ),
];

const ROLE_DISPLAY = {
  'Operations Manager': 'Operational Manager',
  Finance: 'Finance Manager',
};

function formatRole(role) {
  return ROLE_DISPLAY[role] ?? role;
}

// ── Icons ─────────────────────────────────────────────────────────────────
function BillingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

function LogisticsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="1" y="3" width="15" height="13" rx="1" />
      <path d="M16 8h4l3 5v4h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

function NalvelLogoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
      style={{ width: 14, height: 14 }}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

// ── Destination Card ──────────────────────────────────────────────────────
function DestCard({ dest, selected, onSelect }) {
  const Icon = dest.iconType === 'billing' ? BillingIcon : LogisticsIcon;
  return (
    <button
      id={`dest-${dest.id}`}
      type="button"
      className={`dest-btn${selected ? ' selected' : ''}`}
      onClick={() => onSelect(dest.id)}
      aria-pressed={selected}
    >
      <span className={`dest-btn-icon ${dest.iconType}`}>
        <Icon />
      </span>
      <span className="dest-btn-label">{dest.label}</span>
      <span className="dest-btn-sub">{dest.sub}</span>
    </button>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────
export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [destination, setDestination] = useState('billing');
  const [adminRole, setAdminRole] = useState(ROLE_OPTIONS[0] ?? '');

  function handleLogin(event) {
    event.preventDefault();

    // Set the shared gate flag
    localStorage.setItem(LOGIN_URL_KEY, 'true');

    if (destination === 'logistics') {
      // Store selected admin role so the logistics app auto-authenticates
      // without showing its internal login screen.
      localStorage.setItem(ADMIN_ROLE_KEY, adminRole);
      // Also set the logistics internal auth flag
      localStorage.setItem('nalvel-admin-auth', 'true');
    } else {
      // Clear any stale logistics role when going to billing
      localStorage.removeItem(ADMIN_ROLE_KEY);
      localStorage.removeItem('nalvel-admin-auth');
      localStorage.removeItem('nalvel-admin-user-id');
    }

    const dest = DESTINATIONS.find((d) => d.id === destination);
    window.location.href = dest ? dest.path : '/billing';
  }

  return (
    <>
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />
      <div className="orb orb-3" aria-hidden="true" />

      <div className="page">
        {/* Brand */}
        <header className="brand">
          <div className="brand-logo">
            <NalvelLogoIcon />
          </div>
          <span className="brand-name">Nalvel</span>
          <span className="brand-tagline">Unified Operations Portal</span>
        </header>

        {/* Card */}
        <main>
          <div className="card" role="main">
            <div className="card-header">
              <h1 className="card-title">Welcome back</h1>
              <p className="card-subtitle">
                Choose your workspace and sign in to continue
              </p>
            </div>

            <form className="form" onSubmit={handleLogin} noValidate>
              {/* Username */}
              <div className="field">
                <label htmlFor="login-username">Username</label>
                <input
                  id="login-username"
                  type="text"
                  autoComplete="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              {/* Password */}
              <div className="field">
                <label htmlFor="login-password">Password</label>
                <input
                  id="login-password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Workspace selector */}
              <div className="divider"><span>Choose workspace</span></div>

              <div className="dest-grid">
                {DESTINATIONS.map((dest) => (
                  <DestCard
                    key={dest.id}
                    dest={dest}
                    selected={destination === dest.id}
                    onSelect={setDestination}
                  />
                ))}
              </div>

              {/* Admin role selector — only for Logistics */}
              {destination === 'logistics' && (
                <div className="field role-field" style={{ animation: 'fadeUp 0.25s ease both' }}>
                  <label htmlFor="login-admin-role">Admin Role</label>
                  <div className="select-wrapper">
                    <select
                      id="login-admin-role"
                      value={adminRole}
                      onChange={(e) => setAdminRole(e.target.value)}
                    >
                      {ROLE_OPTIONS.map((role) => (
                        <option key={role} value={role}>
                          {formatRole(role)}
                        </option>
                      ))}
                    </select>
                    <ChevronIcon />
                  </div>
                </div>
              )}

              {/* Dev notice */}
              <div className="notice" role="note">
                <InfoIcon />
                <span>
                  <strong>Testing mode:</strong> credentials are not validated.
                </span>
              </div>

              {/* Submit */}
              <button id="login-submit" type="submit" className="submit-btn">
                Sign In →
              </button>
            </form>
          </div>
        </main>

        <footer className="footer">
          © {new Date().getFullYear()} Nalvel. Internal use only.
        </footer>
      </div>
    </>
  );
}
