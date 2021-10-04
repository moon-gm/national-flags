import styles from '../styles/pages/index.module.scss'
import Navigation from '../components/navigation'

const Home = () => {
	return (
		<>
			{/***** 1.操作メッセージ *****/}
			<p className={styles.p}>
				下記の各地域ボタンを選択するか、各種検索からの検索で、各国のデータを表示します。<br/>
				このページに戻る場合は、左上のロゴをクリックします。
			</p>

			{/***** 2.ナビゲーションエリア *****/}
			<Navigation/>

		</>
	)
}
export default Home
