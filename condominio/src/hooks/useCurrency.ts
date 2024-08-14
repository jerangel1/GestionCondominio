import { useState, useEffect, useMemo } from "react";
import Cookies from "js-cookie";
import { currencyUtils } from "@/utils/currencyUtils";

export default function useCurrency() {
  const [dbName, setDbName] = useState<string>();

  useEffect(() => {
    setDbName(Cookies.get("currency"));
  }, []);

  const utils = useMemo(() => {
    return currencyUtils.filter((utils) => utils.dbName == dbName)[0];
  }, [dbName]);

  return utils;
}
