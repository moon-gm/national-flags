import styles from '../styles/pages/index.module.scss'
import Navigation from '../components/navigation'

export default function Home() {

	return (
		<>
			<p className={styles.p}>
				下記の各地域ボタンを選択するか、各種検索からの検索で、各国のデータを表示します。<br/>
				このページに戻る場合は、左上のロゴをクリックします。
			</p>
			{/* ナビゲーションエリア */}
			<Navigation className="navigationArea"/>
		</>
	)
}
