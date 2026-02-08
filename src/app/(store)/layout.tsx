import { TopBar, MainNav, Footer } from '@/features/navigation/components';

export default function StoreLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <TopBar />
            <MainNav />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </>
    );
}
