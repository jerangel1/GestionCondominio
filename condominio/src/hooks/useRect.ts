import { useCallback, useState } from "react";
import { useWindowSize } from "usehooks-ts";

export const useRect = (deps: unknown[] = []):[rect: DOMRect | undefined, ref:(node: HTMLDivElement) => void] => {
  const [containerRect, setContainerRect] = useState<DOMRect>();
  const { width = 0 } = useWindowSize()

  const ref = useCallback((node: HTMLDivElement) => {
    if (!node || width == 0) return;
    setContainerRect(node.getBoundingClientRect());
  }, [width, ...deps]);

  return [containerRect, ref];
};
