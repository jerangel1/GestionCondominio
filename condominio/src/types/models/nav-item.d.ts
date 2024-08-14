import React from "react";

type NavItem = {
  icon?: string | React.ReactNode;
  label: string;
  url?: string;
  role?: "default" | "loggedin";
};
