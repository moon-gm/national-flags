import { useEffect } from 'react'
import DataBox from '../components/dataBox'
import Navigation from '../components/navigation'
import Functions from '../functions/fetchAPI'

export default function AllArea() {
  useEffect(()=> {
    Functions.getAll
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
