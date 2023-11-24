import { countKey, windowIdKey, windowsKey } from '../App';
import { useLocalStorage, useSessionStorage } from 'usehooks-ts';
import { Windows } from '../types/types';

export default function Plane() {
  const [count] = useLocalStorage<number>(countKey, 0);
  const [windows] = useLocalStorage<Windows>(windowsKey, {});
  const [id] = useSessionStorage<number | null>(windowIdKey, null);
  let x = null;
  let y = null;
  let height = null;
  let width = null;

  if (windows != null && id != null) {
    if (id in windows) {
      const window = windows[id];
      x = window.x;
      y = window.y;
      height = window.height;
      width = window.width;
    }
  }

  return (
    <>
      <p>Count: {count}</p>
      <p>Id: {id}</p>
      <p>X: {x}</p>
      <p>Y: {y}</p>
      <p>Height: {height}</p>
      <p>Width: {width}</p>
    </>
  );
}
