import { useEffect, useState} from 'react'
import DataBox from '../components/dataBox'
import Navigation from '../components/navigation'

export default function AllArea() {
  // 国データをnationalDataに入れて一時管理
  const [nationalData, setNationalData] = useState([])
  useEffect(()=> {
    getAll()
  ,[]})

  // DBデータを全て取得する処理
  async function getAll () {
    const res = await fetch('/api/getAll')
    const allData = await res.json()
    setNationalData(allData)
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
