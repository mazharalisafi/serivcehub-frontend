import './globals.css';
import Header from '@/components/Navbar'; // Adjust path if your file is in another folder
import Footer from '@/components/Footer';

export const metadata = {
  title: 'ServiceHub - Book Home Services Easily',
  description: 'Reliable, fast, and professional home services.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased min-h-screen flex flex-col justify-between">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}