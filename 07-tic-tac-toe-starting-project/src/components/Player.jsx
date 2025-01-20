import { useState } from 'react';

export default function Player({ name, symbol, isActive, onPlayerNameUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);

  function handleClick() {
    setIsEditing((editing) => !editing);
    isEditing ? onPlayerNameUpdate(symbol, name) : undefined;
  }

  function handleChange(ev) {
    setPlayerName(ev.target.value);
  }
  return (
    <li className={isActive ? 'active' : null}>
      <span>
        {isEditing ? (
          <input
            type='text'
            required
            value={playerName}
            onChange={handleChange}
          />
        ) : (
          <span className='player-name'>{playerName}</span>
        )}
        <span className='player-symbol'>{symbol}</span>
      </span>
      <button onClick={handleClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  );
}
