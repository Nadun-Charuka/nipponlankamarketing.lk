import { LogoLoader } from '@/shared/components/LogoLoader';

export default function Loading() {
    return (
        <div className="min-h-[50vh] flex items-center justify-center">
            <LogoLoader />
        </div>
    );
}
