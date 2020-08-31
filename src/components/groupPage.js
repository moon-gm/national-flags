import {useState, useEffect} from 'react'
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

	return (
		<>
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
