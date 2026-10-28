export const metadata = {
  title: 'T3x Steam Demo',
  description: 'Steam-ready demo for T3x',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
