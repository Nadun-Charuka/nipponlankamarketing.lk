'use client';

import { TopBar } from "@/features/navigation/components/TopBar";
import { MainNav } from "@/features/navigation/components/MainNav";

export function Navbar() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            <TopBar />
            <MainNav />
        </header>
    );
}
