"use client"

import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { factCategories } from '@/lib/data'
import axios from 'axios'
import { fetchFacts, fetchQuotes } from '@/utilities/ninjas-api'
import { Dice5, Hash, Quote, User } from 'lucide-react'
import { Skeleton } from '../ui/skeleton'
import { useQuery } from '@tanstack/react-query'



// biome-ignore lint/suspicious/noRedeclare: <explanation>
interface Quote {
  quote: string;
  author: string;
  category: string;
}




const TabMessages = (): JSX.Element => {


  // const { data: quotes, isLoading: quotesLoading } = useQuery(['quotes'], fetchQuotes)
  // const { data: facts, isLoading: factsLoading } = useQuery(['facts'], fetchFacts)

  const fetchFacts = async () => {
    const response = await axios.get('https://api.api-ninjas.com/v1/facts', {
      headers: {
        'X-Api-Key': "7dK5WLtwDyExnmGrGyrIyg==CxiwhXya1srNi0AF",
      },
    });
    return response.data.map((fact: { fact: any; }) => fact.fact);
  };



  const fetchQuotes = async () => {
    const response = await axios.get('https://api.api-ninjas.com/v1/quotes', {
      headers: {
        'X-Api-Key': "7dK5WLtwDyExnmGrGyrIyg==CxiwhXya1srNi0AF",
      },
    });
    return response.data.map((quote: { quote: any; }) => quote);
  };



  const { data: quotes, isLoading: isQuotesLoading, error: quotesError, refetch: refetchQuotes } = useQuery(['quotes'], fetchQuotes);
  console.log("quotes", quotes)
  const { data: facts, isLoading: isFactsLoading, error: factsError, refetch: refetchFacts } = useQuery(['facts'], fetchFacts);
  console.log("facts", facts)





  const handleDiceClick = async (type: string) => {
    if (type === 'quotes') {
      refetchQuotes();
    } else if (type === 'facts') {
      refetchFacts();
    }
  };






  return (

    <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-8">

      {/* Quotes */}
      <div className='min-h-[180px] h-fit p-3 rounded-2xl border bg-background/95 backdrop-blur'>
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-2xl text-white font-bold">Quotes</h1>
          <Dice5
            onClick={() => handleDiceClick('quotes')}
            className='transform transition-all duration-500 cursor-pointer hover:text-blue-600 hover:rotate-90 '
          />
        </div>


        {isQuotesLoading ?
          <>
            <Skeleton className="h-[80px] w-full mt-4" />
            <Skeleton className="h-[20px] w-full my-2" />
            <Skeleton className="h-[20px] w-full" />
          </>
          :
          <>
            <p className="text-lg flex flex-row gap-x-1 items-start text-white w-full mt-4">
              <Quote />
              {quotes[0]?.quote}
            </p>
            <p className="text-sm flex flex-row gap-x-1 items-center text-zinc-500 w-full my-2">
              <User size={16} />
              {quotes[0]?.author}
            </p>
            <p className="text-xs flex flex-row gap-x-1 items-center text-zinc-500 w-full">
              <Hash size={16} />
              {quotes[0]?.category}
            </p>
          </>
        }
      </div>

      {/* Facts */}
      <div className='min-h-[180px] h-fit p-3 rounded-2xl border bg-background/95 backdrop-blur'>
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-2xl text-white font-bold">Facts</h1>
          <Dice5
            onClick={() => handleDiceClick('facts')}
            className='transform transition-all duration-500 cursor-pointer hover:text-blue-600 hover:rotate-90 '
          />
        </div>

        {isFactsLoading
          ?
          <Skeleton className="h-[80px] w-full mt-4" />
          :
          <p className="text-lg flex flex-row gap-x-1 items-start text-white w-full mt-4">
            <Quote />
            {facts}
          </p>
        }
      </div>
    </section>
  )
}

export default TabMessages