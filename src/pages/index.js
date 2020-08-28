import {useState} from 'react'
import DataBox from '../components/dataBox'
import Navigation from '../components/navigation'

export default function Home() {
  // 国データをnationalDataに入れて一時管理
  const [nationalData, setNationalData] = useState([])

  // DBデータを全て取得する処理
  async function getAll () {
    const res = await fetch('/api/getAll')
    const allData = await res.json()
    setNationalData(allData)
  }

  // DBデータをワード検索して取得する処理
  async function searchTerm () {
    // formのinputでname属性が[serchWord]の要素を取得
    const elements = document.formOfSearch.searchWord

    // 選択されたラジオボタンのvalueをselectValueに代入
    for (var i = 0; i < elements.length; i++) {
      if (elements[i].checked){
        var selectValue = elements[i].value
      }
    }

    // 入力値の取得
    const searchTerm = document.getElementById('searchByName').value

    // selectValueの値によって処理を分ける
    if (selectValue === "nationalName") {

      // 国名検索の場合
      const res = await fetch(`/api/search/byName/${searchTerm}`)
      const searchData = await res.json()
      setNationalData(searchData)

    } else if (selectValue === "capital") {

      // 首都名検索の場合
      const res = await fetch(`/api/search/byCapital/${searchTerm}`)
      const searchData = await res.json()
      setNationalData(searchData)

    } else if (selectValue === "currency") {

      // 通貨名検索の場合
      const res = await fetch(`/api/search/byCurrency/${searchTerm}`)
      const searchData = await res.json()
      setNationalData(searchData)
      
    }
  }

  async function selectGroup (selectGroup) {
    const res = await fetch(`/api/search/byGroup/${selectGroup}`)
    const groupData = await res.json()
    setNationalData(groupData)
  }

  return (
    <>

      <div className="searchArea">
          <form name="formOfSearch">
            <lavel><input type="radio" name="searchWord" id="nationalName" value="nationalName"/>国名（カタカナ or 漢字）</lavel>
            <lavel><input type="radio" name="searchWord" id="capital" value="capital"/>首都名（カタカナ or 漢字）</lavel>
            <lavel><input type="radio" name="searchWord" id="currency" value="currency"/>通貨名（カタカナ or 漢字）</lavel>
            <input type="text" name="searchByName" id="searchByName" placeholder="検索種別にチェックを入れて入力"/>
            <input type="button" onClick={searchTerm} value="Search"/>
          </form>
      </div>

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
