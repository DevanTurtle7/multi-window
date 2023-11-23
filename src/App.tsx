import {useEffect} from 'react';
import Plane from './plane';

export const keyName = 'windowCount';

export default function App() {
  useEffect(() => {
    const updateWindowCount = (increment: number) => {
      const keyValue = Number(localStorage.getItem(keyName)) ?? 0;
      localStorage.setItem(keyName, String(keyValue + increment));
      window.dispatchEvent(new Event('storage'));
    };

    updateWindowCount(1);
    window.onbeforeunload = () => updateWindowCount(-1);

    return () => {
      updateWindowCount(-1);
      window.onbeforeunload = () => {};
    };
  });

  return (
    <>
      <Plane />
    </>
  );
}
