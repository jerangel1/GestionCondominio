import { type ReactNode, useCallback, useState, forwardRef, useMemo, ForwardedRef } from "react";
import { CSSTransition } from "react-transition-group";
import clsx from "clsx";
import { createPortal } from "react-dom";
import { useWindowSize } from "usehooks-ts";

export type DropdownContainerProps = {
  children: ReactNode;
  isOpen: boolean;
  as?: keyof JSX.IntrinsicElements;
  onScroll?: (e: UIEvent) => void;
  className?: string;
  width?: number
};

export const DropdownContainer = forwardRef<
  HTMLDivElement,
  DropdownContainerProps
>(({ children, isOpen,  as: Tag = "ul", onScroll, width, className }, nodeRef : ForwardedRef<HTMLDivElement>) => {
 
  const [rect, setRect] = useState<DOMRect>();
  const [distanceY, setDistanceY] = useState<number>();
 
  const { width:windowWidth = 0 } = useWindowSize();

  const ref = useCallback((node: HTMLDivElement) => {
    if (!node) return;
    
    const clientRect = node.getBoundingClientRect();

    setRect(clientRect);
    setDistanceY(clientRect.y + Number(window.scrollY));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const offsetX = useMemo(() => {
    if(!nodeRef || typeof nodeRef == "function") return 0;

    const element =  nodeRef.current;
    if(!element) return 0;

    const elementWidth = element.getBoundingClientRect().width;
    const elementLeft = rect?.x || 0;
    const borderPaddingX = 16; // 1rem

    const offset = windowWidth - elementLeft - elementWidth;

    return Math.min(offset - borderPaddingX, 0);
  },[nodeRef, rect, windowWidth]);

  return (
    <div ref={ref}>
      <CSSTransition
        in={isOpen}
        unmountOnExit
        timeout={300}
        classNames="dropdown-select"
        // onScroll={onScroll}
      >
        <>
          {rect
            ? createPortal(
                <>
                  <div
                    
                    className="z-[10000] flex absolute"
                    style={{
                      left:
                        window.scrollX + rect.x + offsetX,
                      top: distanceY,
                      width: width ? `${width}px` : undefined
                    }}
                  >
                    {/*@ts-expect-error: its not a problem, its for the version of typescript */}
                    <Tag onScroll={onScroll} ref={nodeRef} className={clsx(
                        className,
                        "max-h-[400px] z-[100] w-full overflow-scroll bg-white border-zinc-300 border border-solid rounded-lg shadow-lg"
                      )}
                    >
                      {children}
                    </Tag>
                  </div>
                </>,
                document.body
              )
            : null}
        </>
      </CSSTransition>
    </div>
  );
});

DropdownContainer.displayName = "DropdownContainer";
