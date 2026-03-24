type Props = {
  roundArray: number[]
}

/**
 * Header for the MP Results table
 */
export const MPHeader = (props: Props) => {
  const { roundArray } = props

  return (
    <div className="table-header-group bg-black text-white text-center uppercase text-xs font-medium tracking-wider">
      <div className="table-row">
        <div className="table-cell p-3 border-r border-gray-200">
          Player Name
        </div>
        {roundArray.map((_round, columnIndex: number) => (
          <div
            key={`tournament_headers_${columnIndex}`}
            className="table-cell p-3"
          >
            {`Game ${columnIndex + 1}`}
          </div>
        ))}
        <div className="table-cell p-3 border-l border-gray-200">Total</div>
      </div>
    </div>
  )
}
