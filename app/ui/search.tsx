'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchparams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const inputvalue = searchparams.get('query')?.toString();

  const handleSearch = useDebouncedCallback((value:string) => {
    const paramsdata = new URLSearchParams(searchparams);
    paramsdata.set('page', '1');
    if(value) paramsdata.set('query', value);
    else paramsdata.delete('query');
    router.replace(`${pathname}?${paramsdata.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(evnt) => handleSearch(evnt.target.value)}
        defaultValue={inputvalue}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
