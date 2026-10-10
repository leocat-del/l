export function Blocks({ blocks }) {
  return blocks.map((block, index) => <Block key={index} block={block} />);
}

export function RestrictedBlock({ block, documentId }) {
  return (
    <aside className="restricted-block">
      <span className="restricted-tag">RESTRICTED{documentId ? ` // ${documentId}` : ''}</span>
      <h4>{block.title}</h4>
      <Blocks blocks={block.blocks} />
    </aside>
  );
}

function Block({ block }) {
  switch (block.t) {
    case 'p':
      return <p>{block.text}</p>;
    case 'h':
      return <h4 className="doc-subheading">{block.text}</h4>;
    case 'ul':
      return (
        <>
          {block.lead && <p>{block.lead}</p>}
          <ul>
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      );
    case 'restricted':
      return <RestrictedBlock block={block} />;
    default:
      return <p className="doc-empty">RECORD INCOMPLETE // ДАННЫЕ ОТСУТСТВУЮТ</p>;
  }
}
