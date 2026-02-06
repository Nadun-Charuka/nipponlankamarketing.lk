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
            {children}
            <Footer />
        </>
    );
}
