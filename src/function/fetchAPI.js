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

const funcsList = {
    getAll: getAll,
    searchTerm: searchTerm

}



export default funcsList