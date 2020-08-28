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
