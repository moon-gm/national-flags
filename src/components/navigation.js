import Link from 'next/link'
import styles from '../styles/components/navigation.module.scss'

export default function Navigation({className}) {

	// ----- リストのデータを定義 -----
	const list = [
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
		<nav className={className}>
			<div className={styles.grid}>
				{
					list.map(item => {
						return (
							<Link
								href={item.path}
								key={`listOf${item.path}`}
							>
								<h3 className={styles.card}>{item.name}</h3>
							</Link>
						)
					})
				}
			</div>
		</nav>
    )
}
