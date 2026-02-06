import { LogoLoader } from '@/shared/components/LogoLoader';

export default function Loading() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
            <LogoLoader />
        </div>
    );
}
