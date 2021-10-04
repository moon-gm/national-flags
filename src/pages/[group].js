import {useState, useEffect} from 'react'
import styles from '../styles/components/groupPage.module.scss'
import Link from 'next/link'
import DataBox from '../components/dataBox'

// 国データを表示するボックスと一覧のパーツ
const Group = () => {

	// ----- 1-1.国名一覧・ランキングボックスの表示を管理するstateを作成 -----
	const [list, setList] = useState(false)
	const [rank, setRank] = useState(false)
	const [way, setWay] = useState()
	const [type, setType] = useState()

	// ----- 1-2.国名一覧の表示の処理 -----
	const showList = () => list ? setList(false) : setList(true)

	// ----- 1-3.ランキングボックスの表示の処理 -----
	const showRankBox = () => rank ? setRank(false) : setRank(true)

	// ----- 2-1.取得したデータを管理する「state(data)」を作成 -----
	const [data, setData] = useState([])
    const [path, setPath] = useState('')

	// ----- 2-2.DBデータ取得：「groupName」の値によるエリア別データ -----
	const selectGroup = async (groupName) => {
        let res = []
        if (groupName === "all") {
            res = await fetch('/api/getAll')
        } else {
            res = await fetch(`/api/search/national_data_search_by_group-${groupName}`)
        }
		const groupData = await res.json()
		
		// groupDataを五十音順（昇順）に並び替え
		setData(sortAscendByName(groupData))
	}

	// ----- 2-3.DBデータ取得API実行 -----
	useEffect(()=>{
        const pathName = window.location.pathname
        const splitPath = pathName.split('/')
        setPath(splitPath[1])
		selectGroup(path)
	}, [path])

	// ----- 2-4.取得したdataを名前順（昇順）に並び替え -----
	const sortAscendByName = (data) => {
		return data.sort((prev, next) => {// 比較値：prevは前の値、nextは次の値
			let prevWord = prev.data.name.katakana.toUpperCase(); // 大文字と小文字を無視する
			let nextWord = next.data.name.katakana.toUpperCase(); // 大文字と小文字を無視する
			if (prevWord < nextWord) { return -1 }
			if (prevWord > nextWord) { return 1 }
			return 0 // names must be equal
		})
	}

	// ----- 2-6.取得したdataを昇順に並び替え -----
	const sortByNumber = (data, type, sort) => {
		return data.sort((prev, next) => {

            let prevData = Number()
            let nextData = Number()

			// 1.ソート種類条件分岐
			switch(type) {

				// A.時差でソートの場合
				case "timeLag":

					// 比較値：絶対値を取得
					prevData = Math.abs(prev.data.timeLag)
					nextData = Math.abs(next.data.timeLag)

				break

				// B.面積・人口でソートの場合
				case "area":
				case "population":

					// オリジナル値を取得
                    let originalPrev = String()
					let originalNext = String()
					if (type === "area") {
						originalPrev = prev.data.area
						originalNext = next.data.area
					}
					else if (type === "population") {
						originalPrev = prev.data.population
						originalNext = next.data.population
					}

					// 「万」で文字列を分ける
					const splitManPrev = originalPrev.split("万")
					const splitManNext = originalNext.split("万")

					// 「万」以降の文字数を取得
                    let afterManLengthPrev = String()
					let afterManLengthNext = String()
					if (!splitManPrev[1]) { afterManLengthPrev = 0 } else { afterManLengthPrev = splitManPrev[1].length }
					if (!splitManNext[1]) { afterManLengthNext = 0 } else { afterManLengthNext = splitManNext[1].length }

					// 「万」を数値に置き換える処理
					const replaceMan = (length, replace) => {
						switch(length){
							case 0: return replace.replace("万", "0000")
							case 1: return replace.replace("万", "000")
							case 2: return replace.replace("万", "00")
							case 3: return replace.replace("万", "0")
							case 4: return replace.replace("万", "")
						}
					}

					// 「万」で分けた文字列の整形値
					const originalManPrev = replaceMan(afterManLengthPrev, originalPrev)
					const originalManNext = replaceMan(afterManLengthNext, originalNext)

					// 「億」で文字列を分ける
					const splitOkuPrev = originalManPrev.split("億")
					const splitOkuNext = originalManNext.split("億")

					// 「億」以降の文字数を取得
                    let afterOkuLengthPrev = Number()
                    let afterOkuLengthNext = Number()
					if (!splitOkuPrev[1]) { afterOkuLengthPrev = 0 } else { afterOkuLengthPrev = splitOkuPrev[1].length }
					if (!splitOkuNext[1]) { afterOkuLengthNext = 0 } else { afterOkuLengthNext = splitOkuNext[1].length }

					// 「億」を数値に置き換える処理
					const replaceOku = (length, replace) => {
						switch(length){
							case 0: return replace.replace("億", "00000000")
							case 1: return replace.replace("億", "00000000")
							case 2: return replace.replace("億", "000000")
							case 3: return replace.replace("億", "00000")
							case 4: return replace.replace("億", "0000")
							case 5: return replace.replace("億", "000")
							case 6: return replace.replace("億", "00")
							case 7: return replace.replace("億", "0")
							case 8: return replace.replace("億", "")
						}
					}

					// 比較値：数値化
					prevData = Number(replaceOku(afterOkuLengthPrev, originalManPrev))
					nextData = Number(replaceOku(afterOkuLengthNext, originalManNext))

				break

				// C.建国年でソートの場合
				case "since":

					// 比較値：数値化
					prevData = Number(prev.data.since)
					nextData = Number(next.data.since)

				break

			}

			// 2.ソート方法条件分岐
			switch(sort) {
				case "descend": return nextData - prevData // 降順の場合
				default: return prevData - nextData // 昇順の場合
			}

		})
	}

	// ----- 2-7.ランキングソート実行処理 -----
	const rankingSort = async () => {

		// formのinputでname属性が[sortWay, sortType]の要素を取得
		const element = {
            sortWay: undefined,
            sortType: undefined
        }
		if (document.formOfRanking.sortWay !== undefined) element.sortWay = document.formOfRanking.sortWay
		if (document.formOfRanking.sortType !== undefined) element.sortType = document.formOfRanking.sortType

		// 選択されたラジオボタンのvalueをselectWay, selectTypeに代入
		const value = {
            selectWay: "descend",
            selectType: undefined
        }
		for (let idx = 0; idx < element.sortWay.length; idx++) {
			if (element.sortWay[idx].checked) value.selectWay = element.sortWay[idx].value
		}
		for (let idx = 0; idx < element.sortType.length; idx++) {
			if (element.sortType[idx].checked) value.selectType = element.sortType[idx].value
		}

		// 取得データを元にソート実行
		const sortData = sortByNumber(data, value.selectType, value.selectWay)

		// ソート方法セット（ソート方法のラジオボタンのみ選択時に再レンダリングを走らせるため）
		setWay(value.selectWay)

		// ソート種類セット（ランキングタイトル表示のため）
		setType(value.selectType)

		// 取得したデータをセット（表示データを書き換えるため）
		setData(sortData)
	}

	return path && (
		<>
			{/***** 1.国名一覧・ランキングボックス -- start -- *****/}
				<div className={styles.fixedBox}>

					{/***** 1-1.国名一覧・ランキングボックス表示ボタン -- start -- *****/}
						<span
							className={`${styles.card} ${styles.listBtn}`}
							onClick={showList}
						>
							{list ? "国名一覧 →" : "← 国名一覧"}
						</span>
						<span
							className={`${styles.card} ${styles.listBtn}`}
							onClick={showRankBox}
						>
							{rank ? "ランキング →" : "← ランキング"}
						</span>
					{/***** 1-1.国名一覧・ランキングボックス表示ボタン -- end -- *****/}

					{/***** 1-2.ランキングボックス -- start -- *****/}
						{rank && (
							<ul className={styles.navListArea}>
								<form name="formOfRanking">

									<li className={`${styles.card} ${styles.cardTitle}`}>
										<span className={styles.cardWrap}>
											- ソート方法 -
										</span>
									</li>

									<li className={styles.card} onClick={rankingSort}>
										<input type="radio" name="sortWay" value="ascend" id="ascend" hidden/>
										<label htmlFor="ascend">小さい順</label>
									</li>
									<li className={styles.card} onClick={rankingSort}>
										<input type="radio" name="sortWay" value="descend" id="descend" hidden/>
										<label htmlFor="descend">大きい順</label>
									</li>

									<li className={`${styles.card} ${styles.cardTitle}`}>
										<span className={styles.cardWrap}>
											- ソートの種類 -
										</span>
									</li>

									<li className={styles.card} onClick={rankingSort}>
										<input type="radio" name="sortType" value="area" id="area" hidden/>
										<label htmlFor="area">面積</label>
									</li>
									<li className={styles.card} onClick={rankingSort}>
										<input type="radio" name="sortType" value="population" id="population" hidden/>
										<label htmlFor="population">人口</label>
									</li>
									<li className={styles.card} onClick={rankingSort}>
										<input type="radio" name="sortType" value="timeLag" id="timeLag" hidden/>
										<label htmlFor="timeLag">時差</label>
									</li>
									<li className={styles.card} onClick={rankingSort}>
										<input type="radio" name="sortType" value="since" id="since" hidden/>
										<label htmlFor="since">建国年</label>
									</li>

								</form>
							</ul>
						)}
					{/***** 1-2.ランキングボックス -- start -- *****/}

					{/***** 1-3.国名一覧 -- start -- *****/}
						{list && (
							<ul className={styles.navListArea}>
								{data.map(item => {
									return (
										<Link
											href={`/${path}#${item.data.id}`}
											key={`listOf${item.data.id}`}
										>
											<li className={styles.card}>
												<span className={styles.cardWrap}>
													{data.indexOf(item) + 1}. {item.data.name.katakana}
												</span>
											</li>
										</Link>
									)
								})}
							</ul>
						)}
					{/***** 1-3.国名一覧 -- end -- *****/}

				</div>
			{/***** 1.国名一覧・ランキングボックス -- end -- *****/}

			{/***** 1.ランキングタイトル -- start -- *****/}
				{type === "area" && <h1 className={styles.rankingTitle}>面積ランキング</h1>}
				{type === "population" && <h1 className={styles.rankingTitle}>人口ランキング</h1>}
				{type === "timeLag" && <h1 className={styles.rankingTitle}>時差ランキング</h1>}
				{type === "since" && <h1 className={styles.rankingTitle}>建国年ランキング</h1>}
			{/***** 1.ランキングタイトル -- end -- *****/}

			{/***** 2.国データ表示ボックス -- start -- *****/}
				{data && (
					data.map(item => (
						<DataBox
							data={data}
							d={item}
							key={item.data.id}
						/>
					))
				)}
			{/***** 2.国データ表示ボックス -- end -- *****/}

		</>
	)
}
export default Group
