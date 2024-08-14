import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  PageItems,
  NavRoots,
  type NavigationMap,
  type Tab,
} from "@/shared/_pagesCatalog";

const getCurrentNav = (id: number | string): NavigationMap | undefined => {
  for (let i = 0; i < NavRoots.length; i++) {
    const rootKey = NavRoots[i];
    const root = PageItems[rootKey];

    if (root.id === id) return root;

    if (!root.subPath) continue;

    const subPaths = root.subPath;

    for (let j = 0; j < subPaths.length; j++) {
      const subPath = subPaths[j];

      if (subPath.id === id) return subPath;
    }
  }
};

export const useNavmap = (id: number | string) => {
  const [currentNav, setCurrentNav] = useState<NavigationMap | undefined>();
  const [currentTab, setCurrentTab] = useState<string | undefined>();
  const [currentTabIndex, setCurrentTabIndex] = useState<number>();
  const [tabs, setTabs] = useState<Tab[]>();
  const router = useRouter();

  useEffect(() => {
    const navObj = getCurrentNav(id);

    if (!navObj) return;

    setCurrentNav(navObj);
    setTabs(navObj.tabs);
  }, [id]);

  useEffect(() => {
    if (!tabs) return;

    const currentPath = router.asPath;
    const pathArray = currentPath.split("/");
    const currentTab = pathArray[4];
    setCurrentTab(currentTab);
  }, [router, tabs]);

  useEffect(() => {
    if (!currentTab) return;

    const currentTabObj = tabs?.find((tab) => tab.path === currentTab);

    if (!currentTabObj) return;

    const currentTabIndex = tabs?.indexOf(currentTabObj);
    setCurrentTabIndex(currentTabIndex);
  }, [currentTab]);

  return { currentNav, currentTab, currentTabIndex, tabs };
};
