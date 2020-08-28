import { useEffect, useState} from 'react'
import Link from 'nextg/link'
import styles from '../styles/Home.module.scss'

export default function Home() {
  useEffect(()=> {
    selectGroup('europe')
  ,[]})

  // 国データをnationalDataに入れて一時管理
  const [nationalData, setNationalData] = useState([])

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

      <div className={styles.grid}>
        <Link href="/asia" className={styles.card}>
          <h3>アジア &rarr;</h3>
        </Link>

        <Link href="/europe" className={styles.card}>
          <h3>ヨーロッパ &rarr;</h3>
        </Link>

        <Link
          href="/middleEast"
          className={styles.card}
        >
          <h3>中東 &rarr;</h3>
        </Link>

        <Link
          href="/africa"
          className={styles.card}
        >
          <h3>アフリカ &rarr;</h3>
        </Link>
        <Link
          href="/oceania"
          className={styles.card}
        >
          <h3>オセアニア &rarr;</h3>
        </Link>
        <Link
          href="/northAmerica"
          className={styles.card}
        >
          <h3>北アメリカ &rarr;</h3>
        </Link>
        <Link
          href="/centralAmerica"
          className={styles.card}
        >
          <h3>中央アメリカ &rarr;</h3>
        </Link>
        <Link
          href="/southAmerica"
          className={styles.card}
        >
          <h3>南アメリカ &rarr;</h3>
        </Link>
        <Link
          href="/all"
          className={styles.card}
        >
          <h3>全て &rarr;</h3>
        </Link>
      </div>

      {nationalData.length > 0 ? (
          nationalData.map(d => (
            <div className="dataArea">

              {/* 画像 */}
              <p className="p" id={d.data.id}>
                <img src={`/${d.data.id}.png`} alt={d.data.name.katakana}/>
              </p>

              {/* 国名（略式） */}
              <p className="p">
                {d.data.name.katakana}
              </p>

              {/* 国名（正式） */}
              <p className="p">
                {d.data.name.official}
              </p>

              {/* 国名（漢字） */}
              <p className="p">
                {d.data.name.kanji}
              </p>

              {/* 言語 */}
              <p className="p">
                {d.data.language.map(l => {
                  if (l === d.data.language.slice(-1)[0]) {
                    return (
                      l
                    )
                  } else {
                    return(
                      `${l} / `
                    )
                  }
                })}
              </p>

              {/* 通貨 */}
              <p className="p">
                {d.data.currency}
              </p>

              {/* 首都 */}
              <p className="p">
                {d.data.capital}
              </p>

              {/* 面積 */}
              <p className="p">
                {d.data.area}k㎡
              </p>

              {/* 人口 */}
              <p className="p">
                {d.data.population}人
              </p>

              {/* 時差 */}
              <p className="p">
                {d.data.timeLag}時間
              </p>

              {/* 建国年 */}
              <p className="p">
                {d.data.since}年
              </p>

              {/* 国名由来 */}
              <p className="p">
                {d.data.origin.name}
              </p>

              {/* 国旗の由来 */}
              <p className="p">
                {d.data.origin.flag}
              </p>

              {/* 豆知識（タイトル） */}
              <p className="p">
                {d.data.knowledge.title}
              </p>
              {/* 豆知識（コンテンツ」） */}
              <p className="p">
                {d.data.knowledge.contents}
              </p>

            </div>
          ))
        ) : (
          <div>
            Loading...
          </div>
        )}
    </>
  )
}
