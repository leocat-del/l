import { useCallback, useEffect, useRef, useState } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Tabs from './components/Tabs.jsx';
import Lightbox from './components/Lightbox.jsx';
import SignalPage from './components/SignalPage.jsx';
import {
  DocumentsPanel,
  EvidencePanel,
  OverviewPanel,
  RecordsPanel,
  RestrictedPanel
} from './components/Panels.jsx';
import { archiveMeta, documents, tabs } from './data/archive.js';
import useRoute from './hooks/useRoute.js';
import { HOME_PATH, SIGNAL_PATH, isSignalPath } from './lib/paths.js';

const FADE_MS = 900;
const MESSAGE_MS = 1800;

export default function App() {
  const { pathname, navigate } = useRoute();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDocument, setSelectedDocument] = useState(documents[0].id);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [transition, setTransition] = useState('idle');
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const startTransition = useCallback(() => {
    setTransition('fading');
    timers.current.push(
      setTimeout(() => setTransition('message'), FADE_MS),
      setTimeout(() => {
        navigate(SIGNAL_PATH);
        setTransition('idle');
      }, FADE_MS + MESSAGE_MS)
    );
  }, [navigate]);

  const exitSignal = useCallback(() => navigate(HOME_PATH), [navigate]);

  const openDocument = useCallback((id) => {
    setSelectedDocument(id);
    setActiveTab('documents');
  }, []);

  if (isSignalPath(pathname)) {
    return <SignalPage onExit={exitSignal} />;
  }

  const lastRecord = documents[documents.length - 1];

  const panels = {
    overview: <OverviewPanel onOpenDocument={openDocument} />,
    documents: <DocumentsPanel selectedId={selectedDocument} onSelect={setSelectedDocument} />,
    records: <RecordsPanel onOpenDocument={openDocument} />,
    evidence: <EvidencePanel onOpenImage={setLightboxImage} />,
    restricted: <RestrictedPanel />
  };

  return (
    <>
      <div className="grid-backdrop" aria-hidden="true" />
      <div className="scan-line" aria-hidden="true" />
      <div className={`shell is-${transition}`}>
        <Header onSecret={startTransition} />
        <section className="hero">
          <h1 className="hero-title">CLASSIFIED ARCHIVE</h1>
          <p className="hero-sub">RESTRICTED ACCESS // UNKNOWN ORIGIN</p>
          <p className="hero-text">«{archiveMeta.intro}»</p>
          <dl className="meta-grid">
            <div><dt>ARCHIVE ID</dt><dd>{archiveMeta.archiveId}</dd></div>
            <div><dt>CLASSIFICATION</dt><dd>{archiveMeta.classification}</dd></div>
            <div><dt>FILE STATUS</dt><dd>{archiveMeta.fileStatus}</dd></div>
            <div><dt>LAST RECORD</dt><dd>{lastRecord.id}</dd></div>
            <div><dt>DOCUMENT COUNT</dt><dd>{String(documents.length).padStart(3, '0')}</dd></div>
          </dl>
        </section>
        <Tabs tabs={tabs} activeId={activeTab} onChange={setActiveTab} />
        <main
          className="panel"
          role="tabpanel"
          id={`panel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          key={activeTab}
        >
          {panels[activeTab]}
        </main>
        <Footer />
      </div>
      {transition !== 'idle' && (
        <div className={`transmission is-${transition}`} role="status">
          <span>UNKNOWN TRANSMISSION</span>
        </div>
      )}
      {lightboxImage && <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />}
    </>
  );
}
