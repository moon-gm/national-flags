import {useState, useEffect} from 'react'
import styles from '../styles/components/groupPage.module.scss'
import Link from 'next/link'
import DataBox from './dataBox'

// 国データを表示するボックスと一覧のパーツ
export default function GroupPage({group}) {

	// ----- 1-1.国名一覧の表示を管理する「state(list)」を作成 -----
	const [list, setList] = useState(false)

	// ----- 1-2.国名一覧の表示の処理 -----
	function showList() {
		if (list) {
			setList(false)
		} else {
			setList(true)
		}
	}

	// ----- 2-1.取得したデータを管理する「state(data)」を作成 -----
	const [data, setData] = useState([])

	// ----- 2-2.DBデータ取得：「groupName」の値によるエリア別データ -----
	async function selectGroup (groupName) {
		const res = await fetch(`/api/search/national_data_search_by_group-${groupName}`)
		const groupData = await res.json()
		setData(groupData)
	}

	// ----- 2-3.DBデータ取得：全てのデータ -----
	async function getAll () {
		const res = await fetch('/api/getAll')
		const allData = await res.json()
		setData(allData)
	}

	// ----- 2-4.DBデータ取得API実行 -----
	useEffect(()=>{
		if(group === "all") {
			getAll()
		} else {
			selectGroup(group)
		}
	}, [])

	return (
		<>
			{/***** 1.国名一覧ボックス -- start -- *****/}
				<div className={styles.fixedBox}>

					{/***** 1-1.国名一覧表示ボタン -- start -- *****/}
						<span
							className={`${styles.card} ${styles.listBtn}`}
							onClick={showList}
						>
							{list ? "閉じる →" : "← 国名一覧"}
						</span>
					{/***** 1-1.国名一覧表示ボタン -- end -- *****/}

					{/***** 1-2.国名一覧 -- start -- *****/}
						{list && (
							<ul className={styles.navListArea}>
								{data.map(item => {
									return (
										<Link
											href={`/${group}#${item.data.id}`}
											key={`listOf${item.data.id}`}
										>
											<li className={styles.card}>
												{item.data.name.katakana}
											</li>
										</Link>
									)
								})}
							</ul>
						)}
					{/***** 1-2.国名一覧 -- start -- *****/}

				</div>
			{/***** 1.国名一覧ボックス -- end -- *****/}

			{/***** 2.国データ表示ボックス -- start -- *****/}
				{data && (
					data.map(item => (
						<DataBox
							d={item}
							key={item.data.id}
						/>
					))
				)}
			{/***** 2.国データ表示ボックス -- end -- *****/}

		</>
	)
}
