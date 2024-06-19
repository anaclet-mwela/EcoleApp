import React from "react";
import "./globals.css";

const RootLayout = ({ children }) => (
  <html lang="en">
    <body className="h-screen overflow-hidden">
      {children}</body>
  </html>
);

export default RootLayout;
