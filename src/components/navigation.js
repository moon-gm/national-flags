import styles from '../styles/components/navigation.module.scss'
import Link from 'next/link'

// エリア選択などのナビゲーションボタン一覧のパーツ
export default function Navigation() {

	// ----- 1.リストのデータを定義 -----
	const lists = [
		{name: 'アジア', path: '/asia'},
		{name: 'ヨーロッパ', path: '/europe'},
		{name: '中東', path: '/middleEast'},
		{name: 'アフリカ', path: '/africa'},
		{name: 'オセアニア', path: '/oceania'},
		{name: '北アメリカ', path: '/northAmerica'},
		{name: '中央アメリカ', path: '/centralAmerica'},
		{name: '南アメリカ', path: '/southAmerica'},
		{name: '全世界', path: '/all'},
		{name: '各種検索', path: '/search'},
	]

    return (
		<nav className="navigationArea">
			<div className={styles.grid}>
				{lists.map(list => {
					return (
						<Link
							href={list.path}
							key={`listOf${list.path}`}
						>
							<h3 className={styles.card}>
								{list.name}
							</h3>
						</Link>
					)
				})}
			</div>
		</nav>
    )
}
