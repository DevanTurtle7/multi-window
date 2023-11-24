import { useEffect } from 'react';
import { useLocalStorage, useSessionStorage } from 'usehooks-ts';
import Plane from './components/Plane';
import { Windows } from './types/types';

export const countKey = 'windowCount';
export const windowsKey = 'windows';
export const windowIdKey = 'windowId';

const pollingRate = 100;

export default function App() {
  const [count, setCount] = useLocalStorage<number>(countKey, 0);
  const [windows, setWindows] = useLocalStorage<Windows>(windowsKey, {});
  const [id, setId] = useSessionStorage<number | null>(windowIdKey, null);

  useEffect(() => {
    setCount(count + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onBeforeUnload = () => {
      setCount(count - 1);
    };

    window.addEventListener('beforeunload', onBeforeUnload);

    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [count, setCount]);

  useEffect(() => {
    if (id == null) {
      let tempId = count;

      while (tempId in windows) {
        tempId++;
      }

      setId(tempId);
      setWindows({
        ...windows,
        [tempId]: {
          x: window.screenX,
          y: window.screenY,
          height: window.innerHeight,
          width: window.innerWidth,
        },
      });
      window.dispatchEvent(new Event('storage'));
    }
  }, [id, setId, windows, setWindows, count]);

  useEffect(() => {
    const onResize = () => {
      if (id != null) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const currentWindow = windows[id];

        setWindows({
          ...windows,
          [id]: {
            ...currentWindow,
            width,
            height,
          },
        });

        window.dispatchEvent(new Event('storage'));
      }
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [id, windows, setWindows]);

  useEffect(() => {
    const checkPosition = () => {
      if (id != null) {
        const currentWindow = windows[id];
        const { x, y } = currentWindow;
        const screenX = window.screenX;
        const screenY = window.screenY;

        if (x != screenX || y != screenY) {
          setWindows({
            ...windows,
            [id]: {
              ...currentWindow,
              x: screenX,
              y: screenY,
            },
          });

          window.dispatchEvent(new Event('storage'));
        }
      }
    };

    const interval = setInterval(checkPosition, pollingRate);
    return () => clearInterval(interval);
  }, [id, windows, setWindows]);

  return (
    <>
      <Plane />
    </>
  );
}
