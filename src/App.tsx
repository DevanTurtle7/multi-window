import { useEffect } from 'react';
import Plane from './components/Plane';

export const countKey = 'windowCount';
export const windowsKey = 'windows';
export const windowIdKey = 'windowId';

export default function App() {
  useEffect(() => {
    const updateWindowCount = (increment: number) => {
      const keyValue = Number(localStorage.getItem(countKey)) ?? 0;
      localStorage.setItem(countKey, String(keyValue + increment));
      window.dispatchEvent(new Event('storage'));
    };
    const onBeforeUnload = () => updateWindowCount(-1);

    updateWindowCount(1);
    window.addEventListener('beforeunload', onBeforeUnload);

    return () => {
      updateWindowCount(-1);
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  });

  useEffect(() => {
    if (sessionStorage.getItem(windowIdKey) == null) {
      const count = Number(localStorage.getItem(countKey)) ?? 0;
      const windows = JSON.parse(localStorage.getItem(windowsKey) ?? '{}');
      let id = count;

      while (id in windows) {
        id++;
      }

      windows[id] = {};
      sessionStorage.setItem(windowIdKey, String(id));
      localStorage.setItem(windowsKey, JSON.stringify(windows));
    }
  });

  useEffect(() => {
    const onResize = () => {
      const id = Number(sessionStorage.getItem(windowIdKey));

      if (id != null) {
        const windows = JSON.parse(localStorage.getItem(windowsKey) ?? '{}');
        const width = window.innerWidth;
        const height = window.innerHeight;

        windows[id] = {
          width,
          height,
        };

        localStorage.setItem(windowsKey, JSON.stringify(windows));
      }
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  });

  return (
    <>
      <Plane />
    </>
  );
}
