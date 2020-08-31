import { useEffect, useState} from 'react'
import DataBox from './dataBox'
import Navigation from './navigation'

export default function GroupPage({group, funcs, nationalData}) {
  useEffect(()=> {
    funcs.selectGroup(group)
  ,[]})

  return (
    <>
      <Navigation/>

      {nationalData && (
          nationalData.map(d => (
            <DataBox
              d={d}
              key={d.data.id}
            />
          ))
      )}
    </>
  )
}
