import Head from 'next/head'
import {useEffect, useState} from 'react'
import styles from '../styles/Home.module.scss'

export default function Home() {
  const [nationalData, setNationalData] = useState([])

  useEffect(() => {
    async function getData () {
      const res = await fetch('/api/allData')
      const allData = res.json()
      setNationalData(allData)
    }
    console.log(nationalData)
    getData()
  }, [])

  async function renewData () {
    const response = await fetch('/api/addData')
    const data = response.json()
    setNationalData(data)
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
          <button onClick={renewData}>
             Renew Data
          </button>
        </div>
        {
          nationalData.length > 0 ? (
            nationalData.map(d => (
              <div className="flag-area">
                <p className="p">
                  {d.data.id}
                </p>
                <p className="p">
                  {d.data.group.id}
                </p>
                <p className="p">
                  {d.data.group.name}
                </p>
                <p className="p">
                  {d.data.favorite ? "☆" : "×"}
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
                  {d.data.timeLag}
                </p>
                <p className="p">
                  {d.data.sinse}
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
              Fetch Missed
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
