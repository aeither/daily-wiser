import Link from "next/link";

export default function Footer() {
  return (
    <footer className="p-4 text-center text-sm">
      <nav className="flex flex-col space-y-2 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
        <Link href="/#" className="hover:underline">
          About Us
        </Link>
        <Link href="/#" className="hover:underline">
          Privacy Policy
        </Link>
        <Link href="/#" className="hover:underline">
          Terms of Service
        </Link>
        <Link href="/#" className="hover:underline">
          Contact
        </Link>
        <Link href="/#" className="hover:underline">
          FAQ
        </Link>
        <Link href="/#" className="hover:underline">
          Blog
        </Link>
      </nav>
    </footer>
  );
}