import { useState } from 'react';
import { countKey } from '../App';

export default function Plane() {
  const [windowCount, setWindowCount] = useState(0);

  window.addEventListener('storage', () => {
    const count = Number(localStorage.getItem(countKey));

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
