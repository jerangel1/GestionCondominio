import { useState, useCallback } from "react";

// use-disclosure hook manages boolean state. It provides open, close and toggle
// handlers and accepts optional onOpen and onClose callbacks. It can be used to
// manage controlled modals, popovers and other similar components.

export function useDisclosure(
  initialState = false,
  callbacks?: {
    onOpen?: () => void;
    onClose?: () => void;
  }
) {
  const { onOpen, onClose } = callbacks || {};
  const [opened, setOpened] = useState(initialState);

  const open = useCallback(() => {
    setOpened((isOpened) => {
      if (!isOpened) {
        onOpen?.();
        return true;
      }
      return isOpened;
    });
  }, [onOpen]);

  const close = useCallback(() => {
    setOpened((isOpened) => {
      if (isOpened) {
        onClose?.();
        return false;
      }
      return isOpened;
    });
  }, [onClose]);

  const toggle = useCallback(() => {
    opened ? close() : open();
  }, [close, open, opened]);

  return [opened, { open, close, toggle }] as const;
}
