import Link from 'next/link'
import styles from '../styles/navigation.module.scss'

export default function Navigation() {

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
		{name: '全ての国々', path: '/all'},
		{name: '各種検索', path: '/'},
	]

    return (
        <div className={styles.grid}>
			{
				list.map(item => {
					return (
						<Link
							href={item.path}
							key={`listOf${item.path}`}
						>
							<h3 className={styles.card}>{item.name} &rarr;</h3>
						</Link>
					)
				})
			}
        </div>
    )
}
