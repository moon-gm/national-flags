import { useEffect, useState} from 'react'
import DataBox from './dataBox'
import Navigation from './navigation'
import Functions from '../functions/fetchAPI'

export default function GroupPage({group}) {
  useEffect(()=> {
    Functions.selectGroup(group)
  ,[]})

  return (
    <>
      <Navigation/>

      {nationalData.length > 0 ? (
          nationalData.map(d => (
            <DataBox d={d}/>
          ))
        ) : (
          <div>
            Loading...
          </div>
        )}
    </>
  )
}
