import Link from 'next/link'
import styles from '../../../styles/pages/register.module.scss'

export default function SelectType() {

	// データの追加・変更を選択するページ
	return (
		<div className={styles.grid}>
			<h1 className={styles.title}>
				データの追加・変更選択
			</h1>
			<Link href="/setting/register/new">
				<button className={styles.commonBtn} onClick={() => sessionStorage.setItem('registerType', 'new')}>
					新規データ追加
				</button>
			</Link>
			<br/>
			<Link href="/setting/register/update">
				<button className={styles.commonBtn}  onClick={() => sessionStorage.setItem('registerType', 'update')}>
					既存データ変更
				</button>
			</Link>
		</div>
	)
}
