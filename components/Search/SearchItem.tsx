export default function SearchItem({ hit, components }: any) {
  return (
    <a href={hit.url} className="aa-ItemLink">
      <div className="aa-ItemContent">
        <div className="aa-ItemTitle">
          {components && <components.Highlight hit={hit} attribute="name" />}
          <h1>{hit.name}</h1>
        </div>
      </div>
    </a>
  )
}
