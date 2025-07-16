import React from "react";

export const metadata = {
  title: "Dedective Scam Map",
  description: "CryptoNest Dolandırıcılık Dedektif Şeması",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
} 