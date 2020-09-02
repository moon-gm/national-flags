import {useState, useEffect} from 'react'
import Link from 'next/link'
import styles from '../styles/components/groupPage.module.scss'
import DataBox from './dataBox'

export default function GroupPage({group}) {

	// ----- 取得したデータを管理する「state(data)」を作成 -----
	const [data, setData] = useState([])

	// ----- DBデータ取得：「groupName」の値によるエリア別データ -----
	async function selectGroup (groupName) {
		const res = await fetch(`/api/search/byGroup/${groupName}`)
		const groupData = await res.json()
		setData(groupData)
	}

	// ----- DBデータ取得：全てのデータ -----
	async function getAll () {
		const res = await fetch('/api/getAll')
		const allData = await res.json()
		setData(allData)
	}

	// ----- DBデータ取得API実行 -----
	useEffect(()=>{
		if(group === "all") {
			getAll()
		} else {
			selectGroup(group)
		}
	}, [])

	const [list, setList] = useState(false)

	function showList() {
		if (list) {
			setList(false)
		} else {
			setList(true)
		}
	}

	return (
		<>

			<div className={styles.fixedBox}>
				<span
					className={`${styles.card} ${styles.listBtn}`}
					onClick={showList}
				>
					{list ? "閉じる →" : "← 国名一覧"}
				</span>
				{
					list && (
						<ul className={styles.navListArea}>
							{
								data.map(d => {
									return (
										<Link
											href={`/${group}#${d.data.id}`}
											key={`listOf${d.data.id}`}
										>
											<li className={styles.card}>{d.data.name.katakana}</li>
										</Link>
									)
								})
							}
						</ul>
					)
				}
			</div>


			{
				data && (
					data.map(d => (
						<DataBox
							d={d}
							key={d.data.id}
						/>
					))
				)
			}

		</>
	)
}
