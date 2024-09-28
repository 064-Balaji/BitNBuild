'use client'

import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { SearchIcon } from 'lucide-react';

const Search = ({placeholder = 'Search Title...'}:{placeholder?:string}) => {
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  let newUrl ='';
  
  useEffect(()=>{
    const delayDebounceFn = setTimeout(() => {
      if(query){
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key:'query',
          value:query
        })
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove:['query'],
        })
      }
      router.push(newUrl,{scroll:false});
    },100)
    return () => clearTimeout(delayDebounceFn);
  },[query,searchParams,router]);

  return (
    <div className='flex-center min-h-[54px] w-full overflow-hidden rounded-lg bg-red-500 px-4 py-2'>
      <SearchIcon 
      className='bg-transparent text-white' />
      <Input 
      type='text'
      placeholder={placeholder}
      onChange={(e)=>setQuery(e.target.value)}
      className='p-regular-16 border-0 bg-red-500 text-white outline-offset-0 placeholder:text-white focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0'
      />
    </div>
  )
}

export default Search