// app/layout.tsx
import './globals.css';
import React from 'react';

export const metadata = {
  title: 'Canary-Chat',
  description: 'A dynamic chat app with Firestore',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#1a1a2e", // Warna tema Tokyo Night Storm
          color: "#eaeaea",
        }}
      >
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
          {children}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
