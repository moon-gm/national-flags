import { useEffect, useState} from 'react'
import DataBox from '../components/dataBox'
import Navigation from '../components/navigation'

export default function SouthAmerica() {
  useEffect(()=> {
    selectGroup('southAmerica')
  ,[]})

  // 国データをnationalDataに入れて一時管理
  const [nationalData, setNationalData] = useState([])

  async function selectGroup (selectGroup) {
    const res = await fetch(`/api/search/byGroup/${selectGroup}`)
    const groupData = await res.json()
    setNationalData(groupData)
  }

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
