import Link from "next/link";

const footerLinks = [
  { href: "https://twitter.com/AITutor3", label: "Twitter" },
  { href: "/privacy-policy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  // { href: "/#contact", label: "Contact" },
  { href: "/changelog", label: "Changelog" },
];

export default function Footer() {
  return (
    <footer className="pt-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <nav className="flex flex-wrap justify-center gap-4">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-gray-300 pt-2 mt-2">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} DailyWiser. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
