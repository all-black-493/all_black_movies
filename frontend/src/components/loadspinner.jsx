import React from 'react'
import { Spinner } from "flowbite-react"

export const Loadspinner = () => {
  return (
    <div>
      <Spinner className='w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-indigo-600' color='indigo' />
    </div>
  )
}

