import React from 'react'
import BarLoader from '../../../../../components/loaders/BarLoader'
import { useEffect } from 'react'
import { generateCrossword } from '../../../../../BackendProxy/ai_api_connection/ai_api_connection'

const FetchGameApi = ({materialId}) => {




  return (
    <div className='h-[250px] bg-stone-50 flex items-center justify-center'>
        <BarLoader/>
    </div>
  )
}

export default FetchGameApi