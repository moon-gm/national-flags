// import {useEffect, useState} from 'react'
// import styles from '../styles/Home.module.scss'

export default function UpdataDB() {
  // const [nationalData, setNationalData] = useState([])

  async function update () {
    await fetch('/api/addData')
    // const data = await response.json()
    // setNationalData(data)
    // console.log({reNewBtn: nationalData})
  }

  return (
    <div className="flag-area">
        <p>DBのデータを更新<button onClick={update}>Update</button></p>
    </div>
  )
}
