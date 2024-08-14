import { useEffect, useState, useRef } from "react";
import { useScrollLock } from "@/hooks/useScrollLock";
// import { useMediaQuery } from '@/hooks/useMediaQuery';

const keyframes = [
  { transform: "translate(-100%, 0px)" },
  { transform: "translate(0%, 0px)" },
];

// eslint-disable-next-line no-undef
const options: KeyframeEffectOptions = {
  duration: 250,
  easing: "cubic-bezier(.41,0,.53,1)",
  fill: "forwards",
};

export function useMobileNavbar(initialState = false) {
  const navbarRef = useRef<HTMLDivElement>(null);
  const { lock, unlock } = useScrollLock({
    autoLock: false,
  });
  // const matchDesktop = useMediaQuery('(min-width: 768px)');
  const [mobileIsOpen, setMobileIsOpen] = useState(initialState);
  const [animation, setAnimation] = useState<Animation | null>(null);

  const openNavbar = () => {
    if (!navbarRef.current || !animation) return;
    if (animation.playState === "running") return;

    lock();
    animation.playState != "idle" ? animation.reverse() : animation.play();
    animation.finished.catch((error) => {
      console.error(error);
      navbarRef.current!.style.transform = "translate(0%, 0px)";
    });
  };

  const closeNavbar = () => {
    if (!navbarRef.current || !animation) return;
    if (animation.playState === "running") return;

    animation.reverse();
    animation.finished
      .then(() => {
        unlock();
      })
      .catch((error) => {
        console.error(error);
        navbarRef.current!.style.transform = "translate(-100%, 0px)";
      });
  };

  // useEffect(() => {
  //   if (matchDesktop && mobileIsOpen) {
  //     setMobileIsOpen(false);
  //   }
  // }, [matchDesktop]);

  useEffect(() => {
    if (!navbarRef.current) return;
    setAnimation(
      new Animation(new KeyframeEffect(navbarRef.current, keyframes, options))
    );
  }, [navbarRef.current]);

  useEffect(() => {
    mobileIsOpen ? openNavbar() : closeNavbar();
  }, [mobileIsOpen]);

  return {
    navbarRef,
    mobileIsOpen,
    setMobileIsOpen,
  };
}
