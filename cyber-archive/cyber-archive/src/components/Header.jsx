import { useMemo } from 'react';
import SecretDot from './SecretDot.jsx';

export default function Header({ onSecret }) {
  const sessionId = useMemo(() => Math.random().toString(16).slice(2, 10).toUpperCase(), []);

  return (
    <header className="site-header">
      <div className="brand">
        <span className="brand-name">CYBER ARCHIVE</span>
        <span className="brand-sub">RESTRICTED INFORMATION SYSTEM</span>
      </div>
      <dl className="status-list">
        <div className="status-item">
          <dt>SYSTEM STATUS</dt>
          <dd>
            ACTIVE
            <SecretDot onActivate={onSecret} />
          </dd>
        </div>
        <div className="status-item">
          <dt>ACCESS LEVEL</dt>
          <dd>RESTRICTED</dd>
        </div>
        <div className="status-item">
          <dt>SESSION</dt>
          <dd>{sessionId}</dd>
        </div>
      </dl>
    </header>
  );
}
