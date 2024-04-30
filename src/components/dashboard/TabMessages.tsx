/* eslint-disable react/no-unescaped-entities */
"use client"

import { fetchFacts, fetchJokes, fetchQuotes, fetchSuggestion } from '@/utilities/ninjas-api'
import { Dice5, Flower2, Hash, Quote, Smile, User } from 'lucide-react'
import { Skeleton } from '../ui/skeleton'

import { useQuery } from '@tanstack/react-query'
import { Heading } from '@/templates/heading'



const TabMessages = (): JSX.Element => {
  // console.log("env", process.env.NEXT_PUBLIC_NINJA_API_KEY)

  const {
    data: quotes,
    isLoading: isQuotesLoading,
    error: quotesError,
    refetch: refetchQuotes } =
    useQuery(['quotes'], fetchQuotes, {
      // enabled: false,
      // biome-ignore lint/style/useNumberNamespace: <explanation>
      staleTime: Infinity
    });
  console.log("quotesError", quotesError)

  const {
    data: facts,
    isLoading: isFactsLoading,
    error: factsError,
    refetch: refetchFacts } =
    useQuery(['facts'], fetchFacts, {
      // enabled: false,
      // biome-ignore lint/style/useNumberNamespace: <explanation>
      staleTime: Infinity
    });
  // console.log("facts", facts)


  const {
    data: bucketList,
    isLoading: isBucketListLoading,
    error: bucketListError,
    refetch: refetchBucketList } =
    useQuery(['bucketList'], fetchSuggestion, {
      // enabled: false,
      // biome-ignore lint/style/useNumberNamespace: <explanation>
      staleTime: Infinity
    });
  // console.log("facts", facts)

  const {
    data: jokes,
    isLoading: isJokesLoading,
    error: jokesError,
    refetch: refetchJokes } =
    useQuery(['jokes'], fetchJokes, {
      // enabled: false,
      // biome-ignore lint/style/useNumberNamespace: <explanation>
      staleTime: Infinity
    });
  // console.log("jokes", jokes)


  const handleDiceClick = async (type: string) => {
    if (type === 'quotes') {
      refetchQuotes();
    }
    else if (type === 'facts') {
      refetchFacts();
    }
    else if (type === 'bucketList') {
      refetchBucketList();
    }
    else if (type === 'jokes') {
      refetchBucketList();
    }
  };




  return (
    <>
      <div className="flex items-start justify-start ">
        <Heading title="Messages" description="here are your messages" />
      </div>

      <section className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-start ">

        {/* bucketList */}
        <div className='w-full h-full p-3 rounded-2xl border bg-background/95 backdrop-blur'>
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-2xl text-white font-bold">Today's Recommend</h1>
            <Dice5
              onClick={() => handleDiceClick('bucketList')}
              className='transform transition-all duration-500 cursor-pointer hover:text-blue-600 hover:rotate-90 '
            />
          </div>

          {isBucketListLoading ?
            <Skeleton className="h-[80px] w-full mt-4" />
            :
            <p className="text-lg flex flex-row gap-x-1 items-start text-white w-full mt-4">
              <Flower2 />
              {bucketList}
            </p>
          }
        </div>

        {/* Facts */}
        <div className='w-full h-full p-3 rounded-2xl border bg-background/95 backdrop-blur'>
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-2xl text-white font-bold">Facts</h1>
            <Dice5
              onClick={() => handleDiceClick('facts')}
              className='transform transition-all duration-500 cursor-pointer hover:text-blue-600 hover:rotate-90 '
            />
          </div>

          {isFactsLoading ?
            <Skeleton className="h-[80px] w-full mt-4" />
            :
            <p className="text-lg flex flex-row gap-x-1 items-start text-white w-full mt-4">
              <Quote />
              {facts}
            </p>
          }
        </div>

        {/* Quotes */}
        <div className=' w-full h-full p-3 rounded-2xl border bg-background/95 backdrop-blur'>
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
                {quotes?.quote}
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
          }
        </div>

        {/* jokes */}
        <div className=' w-full h-full p-3 rounded-2xl border bg-background/95 backdrop-blur'>
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-2xl text-white font-bold">Joke</h1>
            <Dice5
              onClick={() => handleDiceClick('bucketList')}
              className='transform transition-all duration-500 cursor-pointer hover:text-blue-600 hover:rotate-90 '
            />
          </div>

          {isJokesLoading ?
            <Skeleton className="h-[80px] w-full mt-4" />
            :
            <p className="text-lg flex flex-row gap-x-1 items-start text-white w-full mt-4">
              <Smile />
              {jokes.joke}
            </p>
          }
        </div>

      </section>
    </>

  )
}

export default TabMessages