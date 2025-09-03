import Link from "next/link";
export default function LanguageSwitcher() {
    return (
        <nav className="flex gap-2">
            <Link href="/en">EN</Link>
            <span>|</span>
            <Link href="/ar">AR</Link>
        </nav>
    );
}
