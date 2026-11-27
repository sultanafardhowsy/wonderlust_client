"use client";

import { Toast } from "@heroui/react";

export default function Providers({ children }) {
  return (
    <>
      <Toast.Provider placement="bottom end" />
      {children}
    </>
  );
}
