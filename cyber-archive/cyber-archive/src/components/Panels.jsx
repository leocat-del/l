import { archiveMeta, documents, images } from '../data/archive.js';
import ImageFrame from './ImageFrame.jsx';
import { Blocks, RestrictedBlock } from './DocumentBlocks.jsx';

export function OverviewPanel({ onOpenDocument }) {
  const featured = documents[documents.length - 1];
  return (
    <div className="overview">
      <div className="overview-text">
        <h3 className="panel-title">Обзор архива</h3>
        <p>{archiveMeta.intro}</p>
        <p className="muted">Материалы добавляются в файле src/data/archive.js.</p>
      </div>
      <div className="featured">
        <span className="featured-tag">LAST RECORD // {featured.id}</span>
        <h4>{featured.title}</h4>
        <p>{featured.summary}</p>
        <button type="button" className="featured-link" onClick={() => onOpenDocument(featured.id)}>
          OPEN DOCUMENT
        </button>
      </div>
    </div>
  );
}

export function DocumentsPanel({ selectedId, onSelect }) {
  const current = documents.find((doc) => doc.id === selectedId) || documents[0];
  return (
    <div className="documents">
      <ul className="doc-list">
        {documents.map((doc) => (
          <li key={doc.id}>
            <button
              type="button"
              className="doc-list-item"
              aria-current={doc.id === current.id}
              onClick={() => onSelect(doc.id)}
            >
              <span className="mono">{doc.id}</span>
              <span>{doc.title}</span>
            </button>
          </li>
        ))}
      </ul>
      <article className="doc-reader" key={current.id}>
        <div className="doc-meta mono">
          <span>{current.id}</span>
          <span>DATE: {current.date}</span>
          <span>CLASS: {current.classification}</span>
          <span>STATUS: {current.status}</span>
        </div>
        <h3 className="doc-title">{current.title}</h3>
        {current.sections.map((section) => (
          <section className="doc-section" key={section.title}>
            <h4 className="doc-heading">{section.title}</h4>
            <Blocks blocks={section.blocks} />
          </section>
        ))}
      </article>
    </div>
  );
}

export function RecordsPanel({ onOpenDocument }) {
  return (
    <div className="records">
      <div className="record-row record-head mono">
        <span>ID</span>
        <span>TITLE</span>
        <span>DATE</span>
        <span>STATUS</span>
      </div>
      {documents.map((doc) => (
        <button type="button" className="record-row" key={doc.id} onClick={() => onOpenDocument(doc.id)}>
          <span className="mono">{doc.id}</span>
          <span>{doc.title}</span>
          <span className="mono">{doc.date}</span>
          <span className="mono">{doc.status}</span>
        </button>
      ))}
    </div>
  );
}

export function EvidencePanel({ onOpenImage }) {
  return (
    <div className="evidence">
      {images.map((image) => (
        <ImageFrame key={image.name} name={image.name} number={image.number} onOpen={onOpenImage} />
      ))}
    </div>
  );
}

export function RestrictedPanel() {
  const entries = documents.flatMap((doc) =>
    doc.sections.flatMap((section) =>
      section.blocks.filter((block) => block.t === 'restricted').map((block) => ({ block, documentId: doc.id }))
    )
  );
  return (
    <div className="restricted-panel">
      {entries.length === 0 && <p className="doc-empty">NO RESTRICTED RECORDS AVAILABLE</p>}
      {entries.map(({ block, documentId }) => (
        <RestrictedBlock key={`${documentId}-${block.title}`} block={block} documentId={documentId} />
      ))}
    </div>
  );
}
