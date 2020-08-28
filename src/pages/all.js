import { useEffect } from 'react'
import DataBox from '../components/dataBox'
import Navigation from '../components/navigation'

export default function AllArea({funcs, nationalData}) {
  useEffect(()=> {
    funcs.getAll()
  ,[]})

  return (
    <>
      <Navigation/>

      {nationalData &&  (
        nationalData.map(d => (
          <DataBox d={d}/>
        ))
      )}
    </>
  )
}
