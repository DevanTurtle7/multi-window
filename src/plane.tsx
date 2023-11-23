import {useState} from 'react';
import {keyName} from './App';

export default function Plane() {
  const [windowCount, setWindowCount] = useState(0);

  window.addEventListener('storage', () => {
    const count = Number(localStorage.getItem(keyName));

    if (count != windowCount) {
      setWindowCount(count);
    }
  });

  return (
    <>
      <p>{windowCount}</p>
    </>
  );
}
