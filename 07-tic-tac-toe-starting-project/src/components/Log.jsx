export default function Log({ turns }) {
  return (
    <ol id='log'>
      {turns.map((turn) => (
        <li key={`{${turn.square.rowIndex}${turn.square.colIndex}}`}>
          The player {turn.turnPlayer} selected [{turn.square.rowIndex}][{turn.square.colIndex}]
        </li>
      ))}
    </ol>
  );
}
