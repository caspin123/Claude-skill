import './globals.css';

export const metadata = {
  title: 'ALBAZON GAMES | Your Ultimate Game Store',
  description: 'Discover the best video games, consoles, and gaming gear at ALBAZON GAMES. PC, PlayStation, Xbox, Nintendo — all in one place with instant digital delivery.',
  keywords: 'albazon, games, gaming, video games, pc games, playstation, xbox, nintendo, game store',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
