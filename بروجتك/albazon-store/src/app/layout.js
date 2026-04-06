import './globals.css';

export const metadata = {
  title: 'ALBAZON STORE | Premium Shopping Experience',
  description: 'Discover premium products at ALBAZON STORE. Electronics, fashion, home & living — all in one place with fast shipping worldwide.',
  keywords: 'albazon, store, shopping, electronics, fashion, premium',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
