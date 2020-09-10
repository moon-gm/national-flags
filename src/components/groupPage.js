import {useState, useEffect} from 'react'
import styles from '../styles/components/groupPage.module.scss'
import Link from 'next/link'
import DataBox from './dataBox'

// 国データを表示するボックスと一覧のパーツ
export default function GroupPage({group}) {

	// ----- 1-1.国名一覧・ランキングボックスの表示を管理するstateを作成 -----
	const [list, setList] = useState(false)
	const [rank, setRank] = useState(false)
	const [way, setWay] = useState()
	const [type, setType] = useState()

	// ----- 1-2.国名一覧の表示の処理 -----
	function showList() {
		if (list) {
			setList(false)
		} else {
			setList(true)
		}
	}

	// ----- 1-3.ランキングボックスの表示の処理 -----
	function showRankBox() {
		if (rank) {
			setRank(false)
		} else {
			setRank(true)
		}
	}

	// ----- 2-1.取得したデータを管理する「state(data)」を作成 -----
	const [data, setData] = useState([])

	// ----- 2-2.DBデータ取得：「groupName」の値によるエリア別データ -----
	async function selectGroup (groupName) {
		const res = await fetch(`/api/search/national_data_search_by_group-${groupName}`)
		const groupData = await res.json()

		// groupDataを五十音順（昇順）に並び替え
		var sortData = sortAscendByName(groupData)

		setData(sortData)
	}

	// ----- 2-3.DBデータ取得：全てのデータ -----
	async function getAll () {
		const res = await fetch('/api/getAll')
		const allData = await res.json()

		// allDataを五十音順に並び替え
		var sortData = sortAscendByName(allData)

		setData(sortData)
	}

	// ----- 2-5.DBデータ取得API実行 -----
	useEffect(()=>{
		if(group === "all") {
			getAll()
		} else {
			selectGroup(group)
		}
	}, [])

	// ----- 2-6.取得したdataを名前順（昇順）に並び替え -----
	function sortAscendByName(data) {
		const sortData = data.sort(function(a, b) {
			var nameA = a.data.name.katakana.toUpperCase(); // 大文字と小文字を無視する
			var nameB = b.data.name.katakana.toUpperCase(); // 大文字と小文字を無視する
			if (nameA < nameB) {
			  return -1;
			}
			if (nameA > nameB) {
			  return 1;
			}

			// names must be equal
			return 0;
		})
		return sortData
	}

	// ----- 2-7.取得したdataを昇順に並び替え -----
	function sortByNumber(data, type, sort) {
		const sortData = data.sort(function(a, b) {

			// 時差でソートの場合
			if (type === "timeLag") {
				// 比較値：絶対値を取得
				var nameA = Math.abs(a.data.timeLag);
				var nameB = Math.abs(b.data.timeLag);
			}

			// 面積・人口でソートの場合
			else if (type === "area" || type === "population") {

				// 「,」を削除
				if (type === "area") {
					var correctWordA = a.data.area;
					var correctWordB = b.data.area;
				}
				else if (type === "population") {
					var correctWordA = a.data.population;
					var correctWordB = b.data.population;
				}

				// 「万」で文字列を分ける
				const splitWordA = correctWordA.split("万");
				const splitWordB = correctWordB.split("万");

				// 「万」以降の文字数を取得
				if (!splitWordA[1]) {
					var lengthA = 0
				} else {
					var lengthA = splitWordA[1].length;
				}

				if (!splitWordB[1]) {
					var lengthB = 0
				} else {
					var lengthB = splitWordB[1].length;
				}

				// 「万」を数値に置き換える処理
				function replaceMan(length, replace) {
					if (length === 0) {
						return replace.replace("万", "0000")
					}
					else if (length === 1) {
						return replace.replace("万", "000")
					}
					else if (length === 2) {
						return replace.replace("万", "00")
					}
					else if (length === 3) {
						return replace.replace("万", "0")
					}
					else if (length === 4) {
						return replace.replace("万", "")
					}
				}

				// 「万」で分けた文字列の整形値
				var correctManA = replaceMan(lengthA, correctWordA)
				var correctManB = replaceMan(lengthB, correctWordB)

				// 「億」で文字列を分ける
				var splitOkuA = correctManA.split("億");
				var splitOkuB = correctManB.split("億");

				// 「億」以降の文字数を取得
				if (!splitOkuA[1]) {
					var lengthA = 0
				} else {
					var lengthA = splitOkuA[1].length;
				}

				if (!splitOkuB[1]) {
					var lengthB = 0
				} else {
					var lengthB = splitOkuB[1].length;
				}

				// 「億」を数値に置き換える処理
				function replaceOku(length, replace) {
					if (length === 0) {
						return replace.replace("億", "00000000")
					}
					else if (length === 1) {
						return replace.replace("億", "00000000")
					}
					else if (length === 2) {
						return replace.replace("億", "000000")
					}
					else if (length === 3) {
						return replace.replace("億", "00000")
					}
					else if (length === 4) {
						return replace.replace("億", "0000")
					}
					else if (length === 5) {
						return replace.replace("億", "000")
					}
					else if (length === 6) {
						return replace.replace("億", "00")
					}
					else if (length === 7) {
						return replace.replace("億", "0")
					}
					else if (length === 8) {
						return replace.replace("億", "")
					}
				}

				// 比較値：数値化
				var nameA = replaceOku(lengthA, correctManA)
				var nameB = replaceOku(lengthB, correctManB)
			}

			// 建国年でソートの場合
			else if (type === "since") {
				// 比較値：数値化
				var nameA = Number(a.data.since);
				var nameB = Number(b.data.since);
			}

			// ソート方法指定
			if (sort === "descend") {
				// 降順の場合
				return nameB - nameA
			} else {
				// 昇順の場合
				return nameA - nameB
			}
		})
		return sortData
	}

	// ----- 2-8.ランキングソート実行処理 -----
	async function rankingSort() {

		// formのinputでname属性が[sortWay, sortType]の要素を取得
		var sortWay = undefined
		var sortType = undefined
		if (document.formOfRanking.sortWay !== undefined) {
			sortWay = document.formOfRanking.sortWay
		}
		if (document.formOfRanking.sortType !== undefined) {
			sortType = document.formOfRanking.sortType
		}

		// 選択されたラジオボタンのvalueをselectWay, selectTypeに代入
		var selectWay = "descend" // デフォルトは大きい順に設定
		var selectType = undefined
		for (var i = 0; i < sortWay.length; i++) {
			if (sortWay[i].checked){
				selectWay = sortWay[i].value
			}
		}
		for (var i = 0; i < sortType.length; i++) {
			if (sortType[i].checked){
				selectType = sortType[i].value
			}
		}

		// 取得データを元にソート実行
		var sortData = sortByNumber(data, selectType, selectWay)

		// ソート方法セット（ソート方法のラジオボタンのみ選択時に再レンダリングを走らせるため）
		setWay(selectWay)

		// ソート種類セット（ランキングタイトル表示のため）
		setType(selectType)

		// 取得したデータをセット（表示データを書き換えるため）
		setData(sortData)
	}

	return (
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
											href={`/${group}#${item.data.id}`}
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
