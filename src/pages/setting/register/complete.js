import Link from 'next/link'
import styles from '../../../styles/pages/register.module.scss'

export default function Complete() {

// -------------------- 入力完了ページ --------------------
	return (
		<>
			<div className={styles.grid}>
				<h1 className={styles.title}>
					データ登録完了
				</h1>
				<Link href="/">
					<button className={styles.commonBtn}>
						Top画面へ
					</button>
				</Link>
			</div>
		</>
	)

}
