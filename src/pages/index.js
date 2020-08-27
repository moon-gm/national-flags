import Head from 'next/head'
import {useEffect, useState} from 'react'
import styles from '../styles/Home.module.scss'

export default function Home() {
  const [nationalData, setNationalData] = useState([])

  useEffect(() => {
    async function getData () {
      const res = await fetch('/api/getAll')
      const allData = await res.json()
      setNationalData(allData)
    }
    getData()
    console.log({useEffect: nationalData})
  }, [])

  async function update () {
    const response = await fetch('/api/addData')
    const data = await response.json()
    setNationalData(data)
    console.log({reNewBtn: nationalData})
  }

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
    console.log({searchData: nationalData})
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <div className="flag-area">
            <p>DBのデータを更新<button onClick={update}>Update</button></p>
          <form name="formOfSearch">
            <lavel><input type="radio" name="searchWord" id="nationalName" value="nationalName"/>国名（カタカナ or 漢字）</lavel>
            <lavel><input type="radio" name="searchWord" id="capital" value="capital"/>首都名（カタカナ or 漢字）</lavel>
            <lavel><input type="radio" name="searchWord" id="currency" value="currency"/>通貨名（カタカナ or 漢字）</lavel>
            <input type="text" name="searchByName" id="searchByName" placeholder="検索種別にチェックを入れて入力"/>
            <input type="button" onClick={searchTerm} value="Search"/>
          </form>

        </div>
        {
          nationalData.length > 0 ? (
            nationalData.map(d => (
              <div className="flag-area">
                <p className="p" id={d.data.id}>
                  {d.data.id}
                </p>
                <p className="p">
                  {d.data.group.id}
                </p>
                <p className="p">
                  {d.data.group.name}
                </p>
                <p className="p">
                  {d.data.name.katakana}
                </p>
                <p className="p">
                  {d.data.name.kanji}
                </p>
                <p className="p">
                  {
                    d.data.language.map(l => (
                      `${l} / `
                    ))
                  }
                </p>
                <p className="p">
                  {d.data.currency}
                </p>
                <p className="p">
                  {d.data.capital}
                </p>
                <p className="p">
                  {d.data.area}k㎡
                </p>
                <p className="p">
                  {d.data.population}人
                </p>
                <p className="p">
                  {d.data.timeLag}時間
                </p>
                <p className="p">
                  {d.data.sinse}年
                </p>
                <p className="p">
                  {d.data.origin.name}
                </p>
                <p className="p">
                  {d.data.origin.flag}
                </p>
                <p className="p">
                  {d.data.knowledge.title}
                </p>
                <p className="p">
                  {d.data.knowledge.contents}
                </p>
              </div>
            ))
          ) : (
            <div>
              Loading...
            </div>
          )
        }
        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
