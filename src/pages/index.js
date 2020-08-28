import {useEffect, useState} from 'react'
import styles from '../styles/Home.module.scss'
import Functions from '../function/fetchAPI'

export default function Home() {
  // 国データをnationalDataに入れて一時管理
  const [nationalData, setNationalData] = useState([])

  return (
    <>

      <div className="searchArea">
          <form name="formOfSearch">
            <lavel><input type="radio" name="searchWord" id="nationalName" value="nationalName"/>国名（カタカナ or 漢字）</lavel>
            <lavel><input type="radio" name="searchWord" id="capital" value="capital"/>首都名（カタカナ or 漢字）</lavel>
            <lavel><input type="radio" name="searchWord" id="currency" value="currency"/>通貨名（カタカナ or 漢字）</lavel>
            <input type="text" name="searchByName" id="searchByName" placeholder="検索種別にチェックを入れて入力"/>
            <input type="button" onClick={Functions.searchTerm} value="Search"/>
          </form>
      </div>

      <div className={styles.grid}>
        <a href="https://nextjs.org/docs" className={styles.card}>
          <h3>アジア &rarr;</h3>
        </a>

        <a href="https://nextjs.org/learn" className={styles.card}>
          <h3>ヨーロッパ &rarr;</h3>
        </a>

        <a
          href="https://github.com/vercel/next.js/tree/master/examples"
          className={styles.card}
        >
          <h3>中東 &rarr;</h3>
        </a>

        <a
          href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          className={styles.card}
        >
          <h3>アフリカ &rarr;</h3>
        </a>
        <a
          href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          className={styles.card}
        >
          <h3>オセアニア &rarr;</h3>
        </a>
        <a
          href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          className={styles.card}
        >
          <h3>北アメリカ &rarr;</h3>
        </a>
        <a
          href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          className={styles.card}
        >
          <h3>中央アメリカ &rarr;</h3>
        </a>
        <a
          href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          className={styles.card}
        >
          <h3>南アメリカ &rarr;</h3>
        </a>
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
