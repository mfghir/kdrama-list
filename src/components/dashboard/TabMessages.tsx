"use client"

import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { factCategories } from '@/lib/data'
import axios from 'axios'
import { getQuotes } from '@/utilities/quote-api'
import { Dice5, Hash, User } from 'lucide-react'
import { Skeleton } from '../ui/skeleton'



interface Quote {
  quote: string;
  author: string;
  category: string;
}




const TabMessages = (): JSX.Element => {
  const [quotes, setQuotes] = useState<Quote>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getQuotes()
        console.log("sssss", response[0].quote);
        setQuotes(response[0]);
        setLoading(false);

        console.log("quotes", quotes)
      } catch (error) {
        console.error('Error:', error);
        setQuotes([]);
      }
    };

    fetchData();
  }, []);



  const handleDiceClick = async () => {
    setLoading(true); // Show the loading skeleton while fetching a new quote
    try {
      const response = await getQuotes();
      setQuotes(response[0]);
    } catch (error) {
      console.error('Error:', error);
      setQuotes([]);
    }
    setLoading(false); // Hide the loading skeleton after fetching the new quote
  };



  return (

    <section className="w-full flex items-center justify-between space-y-2">


      <div className='w-2/5 min-h-[180px] h-fit p-3 border bg-background/95 backdrop-blur'>
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-2xl text-white font-bold">Quotes</h1>
          <Dice5
            onClick={handleDiceClick}
            className='transform transition-all duration-500 cursor-pointer hover:text-blue-600 hover:rotate-90 '
          />
        </div>


        {quotes.author ? (
          <>
            <p className=" text-lg text-white w-full mt-4">{quotes?.quote}</p>
            <p className="text-sm flex flex-row gap-x-1 items-center text-zinc-500 w-full my-2">
              <User size={16} />
              {quotes?.author}</p>
            <p className="text-xs flex flex-row gap-x-1 items-center text-zinc-500 w-full">
              <Hash size={16} />{quotes?.category}
            </p>
          </>
        ) : (
          <>
            <Skeleton className="h-[80px] w-full mt-4" />
            <Skeleton className="h-[20px] w-full my-2" />
            <Skeleton className="h-[20px] w-full" />
          </>
        )}




      </div>
    </section>
  )
}

export default TabMessages