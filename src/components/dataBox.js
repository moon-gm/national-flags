import styles from '../styles/components/dataBox.module.scss'

export default function DataBox({d}) {
    return (
		<div
			id={d.data.id}
			className={styles.dataBox}
		>

			{/* 見出しエリア */}
			<div className={styles.titleBox}>

				{/* 国名（略式/略漢字） */}
				<h1 className={styles.titleBoxTitle}>
					{d.data.name.katakana}（{d.data.name.kanji}）
				</h1>

				{/* 画像 */}
				<div className={styles.titleBoxImage}>
					<img
						src={`/${d.data.id}.png`}
						alt={d.data.name.katakana}
					/>
				</div>

			</div>

			{/* コンテンツエリア */}
			<div className={styles.contentsBox}>

				<div className={styles.contentsBoxList}>
					{/* データ（タイトル） */}
					<h1 className={styles.title}>
						データ
					</h1>

					<div className={styles.contentsBoxListFlex}>

						{/* 項目リスト1 */}
						<ul className={styles.contentsBoxListBlock}>

							{/* 国名（正式） */}
							<li className={`${styles.listItem} ${styles.listItemNameOfficial}`}>
								正式：{d.data.name.official}
							</li>

							{/* 言語 */}
							<li className={`${styles.listItem} ${styles.listItemLanguage}`}>
								言語：
								{d.data.language.map(l => {
									if (l === d.data.language.slice(-1)[0]) {
									return (
										l
									)
									} else {
									return(
										`${l} / `
									)
									}
								})}
							</li>

							{/* 通貨 */}
							<li className={`${styles.listItem} ${styles.listItemCurrency}`}>
								通貨：{d.data.currency}
							</li>

							{/* 首都 */}
							<li className={`${styles.listItem} ${styles.listItemCapital}`}>
								首都：{d.data.capital}
							</li>

						</ul>
						{/* 項目リスト2 */}
						<ul className={styles.contentsBoxListBlock}>

							{/* 面積 */}
							<li className={`${styles.listItem} ${styles.listItemArea}`}>
								面積：{d.data.area}k㎡
							</li>

							{/* 人口 */}
							<li className={`${styles.listItem} ${styles.listItemPopulation}`}>
								人口：{d.data.population}人
							</li>

							{/* 時差 */}
							<li className={`${styles.listItem} ${styles.listItemTimeLag}`}>
								時差：{d.data.timeLag}時間
							</li>

							{/* 建国 */}
							<li className={`${styles.listItem} ${styles.listItemSince}`}>
								建国：{d.data.since}年
							</li>

						</ul>
					</div>
				</div>

				<div className={styles.contentsBoxText}>
					{/* 由来（タイトル） */}
					<h1 className={styles.title}>
						由来
					</h1>
					{/* 国名（コンテンツ」） */}
					<p className={`${styles.textContents} ${styles.textContentsIndent}`}>
						国名：{d.data.origin.name}
					</p>
					{/* 国旗（コンテンツ」） */}
					<p className={`${styles.textContents} ${styles.textContentsIndent}`}>
						国旗：{d.data.origin.flag}
					</p>
				</div>

				<div className={styles.contentsBoxText}>
					{/* 豆知識（タイトル） */}
					<h1 className={styles.title}>
						豆知識 〜{d.data.knowledge.title}〜
					</h1>
					{/* 豆知識（コンテンツ」） */}
					<p className={styles.textContents}>
						{d.data.knowledge.contents}
					</p>
				</div>

			</div>

    	</div>
    )
}
