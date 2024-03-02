import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <GlobeAltIcon className="h-8 w-8 rotate-[15deg]" />
      <h1 className={"text-3xl font-bold"}>Acme</h1>
    </div>
  );
}