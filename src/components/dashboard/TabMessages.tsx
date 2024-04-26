"use client"

import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { factCategories } from '@/lib/data'
import axios from 'axios'
import { getFacts, getQuotes, useFacts, useQuotes } from '@/utilities/ninjas-api'
import { Dice5, Hash, Quote, User } from 'lucide-react'
import { Skeleton } from '../ui/skeleton'
import { useQuery } from '@tanstack/react-query'



interface Quote {
  quote: string;
  author: string;
  category: string;
}

interface Facts {
  fact: string;
}



const TabMessages = (): JSX.Element => {
  // const [quotes, setQuotes] = useState<Quote>([]);
  // const [facts, setFacts] = useState<Facts>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchQuotes = async () => {
  //     try {
  //       const response = await getQuotes()
  //       console.log("fetchQuotes ---->", response[0].quote);
  //       setQuotes(response[0]);
  //       setLoading(false);

  //       console.log("quotes", quotes)
  //     } catch (error) {
  //       console.error('Error:', error);
  //       setQuotes([]);
  //     }
  //   };

  //   const fetchFacts = async () => {
  //     try {
  //       const response = await getFacts()
  //       console.log("fetchFacts --->", response[0].quote);
  //       setFacts(response[0]);
  //       setLoading(false);

  //       console.log("quotes", quotes)
  //     } catch (error) {
  //       console.error('Error:', error);
  //       setFacts([]);
  //     }
  //   };

  //   fetchQuotes();
  //   fetchFacts();
  // }, []);



  // const handleDiceClick = async () => {
  //   setLoading(true); // Show the loading skeleton while fetching a new quote
  //   try {
  //     const response = await getQuotes();
  //     setQuotes(response[0]);
  //   } catch (error) {
  //     console.error('Error:', error);
  //     setQuotes([]);
  //   }
  //   setLoading(false); // Hide the loading skeleton after fetching the new quote
  // };


  const { data: quotes, isLoading: quotesLoading, error: quotesError, refetch: refetchQuotes } = useQuotes();
  const { data: facts, isLoading: factsLoading, error: factsError, refetch: refetchFacts } = useFacts();

  useEffect(() => {
    refetchQuotes();
    refetchFacts();
  }, []);

  const handleDiceClick = async (type: string) => {
    if (type === 'quotes') {
      refetchQuotes();
    } else if (type === 'facts') {
      refetchFacts();
    }
  };






  return (

    <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-10">

      {/* Quotes */}
      <div className='min-h-[180px] h-fit p-3 rounded-2xl border bg-background/95 backdrop-blur'>
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-2xl text-white font-bold">Quotes</h1>
          <Dice5
            // onClick={handleDiceClick}
            onClick={() => handleDiceClick('quotes')}
            className='transform transition-all duration-500 cursor-pointer hover:text-blue-600 hover:rotate-90 '
          />
        </div>


        {quotes?.author ? (
          <>
            <p className="text-lg flex flex-row gap-x-1 items-start text-white w-full mt-4">
              <Quote />
              {quotes?.quote}
              {/* <Quote className='self-end' /> */}
            </p>
            <p className="text-sm flex flex-row gap-x-1 items-center text-zinc-500 w-full my-2">
              <User size={16} />
              {quotes?.author}
            </p>
            <p className="text-xs flex flex-row gap-x-1 items-center text-zinc-500 w-full">
              <Hash size={16} />
              {quotes?.category}
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

      {/* Facts */}
      <div className='min-h-[180px] h-fit p-3 rounded-2xl border bg-background/95 backdrop-blur'>
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-2xl text-white font-bold">Facts</h1>
          <Dice5
            // onClick={handleDiceClick}
            onClick={() => handleDiceClick('facts')}
            className='transform transition-all duration-500 cursor-pointer hover:text-blue-600 hover:rotate-90 '
          />
        </div>


        {facts?.fact ? (
          <>
            <p className="text-lg flex flex-row gap-x-1 items-start text-white w-full mt-4">
              <Quote />
              {facts.fact}
            </p>

          </>
        ) : (
          <>
            <Skeleton className="h-[80px] w-full mt-4" />

          </>
        )}




      </div>
    </section>
  )
}

export default TabMessages