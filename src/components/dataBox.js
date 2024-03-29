import styles from '../styles/components/dataBox.module.scss'

// 国のデータをまとめて表示するボックス
const DataBox = ({ d, data }) => {

    return (
		<div
			id={d.data.id}
			className={styles.dataBox}
		>

			{/***** 1.見出しエリア -- start -- *****/}
				<div className={styles.titleBox}>

					{/**** 1-1.国名（略式） ****/}
					<h1 className={styles.titleBoxTitle}>
						{data && `${data.indexOf(d) + 1}. `}{d.data.name.katakana}
					</h1>

					{/**** 1-2.画像 ****/}
					<div className={styles.titleBoxImage}>
						<img
							src={d.data.dataURL ? d.data.dataURL : `/${d.data.id}.png`}
							alt={d.data.name.katakana}
						/>
					</div>

				</div>
			{/***** 1.見出しエリア -- end -- *****/}

			{/***** 2.コンテンツエリア -- start -- *****/}
				<div className={styles.contentsBox}>

					{/**** 2-1.リストエリア -- start -- ****/}
						<div className={styles.contentsBoxList}>

							{/*** 2-1-1.タイトル ***/}
							<h1 className={styles.title}>
								データ
							</h1>

							{/*** 2-1-2.フレックスエリア -- start -- ***/}
								<div className={styles.contentsBoxListFlex}>

									{/** 2-1-2-1.項目リスト1 -- start -- **/}
										<ul className={styles.contentsBoxListBlock}>

											{/* 項目：国名（正式） */}
											<li className={`${styles.listItem} ${styles.listItemNameOfficial}`}>
												正式：{d.data.name.official}
											</li>

											{/* 項目：国名（漢字） */}
											<li className={`${styles.listItem} ${styles.listItemNameOfficial}`}>
												漢字：{d.data.name.kanji[0]}{d.data.name.kanji[1] && `（${d.data.name.kanji[1]}）`}
											</li>

											{/* 項目：言語 */}
											<li className={`${styles.listItem} ${styles.listItemLanguage}`}>
												言語：
												{d.data.language.map(l => {
													if (l === d.data.language.slice(-1)[0]) {
														return l
													} else {
														return `${l} / `
													}
												})}
											</li>

											{/* 項目：通貨 */}
											<li className={`${styles.listItem} ${styles.listItemCurrency}`}>
												通貨：{d.data.currency[0]}
											</li>

											{/* 項目：首都 */}
											<li className={`${styles.listItem} ${styles.listItemCapital}`}>
												首都：{d.data.capital}
											</li>

										</ul>
									{/** 2-1-2-1.項目リスト1 -- end -- **/}

									{/** 2-1-2-2.項目リスト2 -- start -- **/}
										<ul className={styles.contentsBoxListBlock}>

											{/* 項目：民族 */}
											<li className={`${styles.listItem} ${styles.listItemTribe}`}>
												民族：
												{d.data.tribe.map(t => {
													if (t === d.data.tribe.slice(-1)[0]) {
														return t
													} else {
														return `${t} / `
													}
												})}
											</li>

											{/* 項目：面積 */}
											<li className={`${styles.listItem} ${styles.listItemArea}`}>
												面積：{d.data.area}k㎡
											</li>

											{/* 項目：人口 */}
											<li className={`${styles.listItem} ${styles.listItemPopulation}`}>
												人口：{d.data.population}人
											</li>

											{/* 項目：時差 */}
											<li className={`${styles.listItem} ${styles.listItemTimeLag}`}>
												時差：{d.data.timeLag}時間
											</li>

											{/* 項目：建国 */}
											<li className={`${styles.listItem} ${styles.listItemSince}`}>
												建国：{d.data.since}年
											</li>

										</ul>
									{/** 2-1-2-2.項目リスト2 -- end -- **/}

								</div>
							{/*** 2-1-2.フレックスエリア -- end -- ***/}

						</div>
					{/**** 2-1.リストエリア -- end -- ****/}

					{/**** 2-2.文章エリア（由来） -- start -- ****/}
						<div className={styles.contentsBoxText}>

							{/*** 2-2-1.タイトル ***/}
							<h1 className={styles.title}>
								由来
							</h1>

							{/*** 2-2-2.由来：国名コンテンツ ***/}
							<p className={`${styles.textContents} ${styles.textContentsIndent}`}>
								国名：{d.data.origin.name}
							</p>

							{/*** 2-2-3.由来：国旗コンテンツ ***/}
							<p className={`${styles.textContents} ${styles.textContentsIndent}`}>
								国旗：{d.data.origin.flag}
							</p>

						</div>
					{/**** 2-2.文章エリア（由来） -- end -- ****/}

					{/**** 2-3.文章エリア（豆知識） -- start -- ****/}
						<div className={styles.contentsBoxText}>

							{/*** 2-3-1.タイトル ***/}
							<h1 className={styles.title}>
								豆知識
							</h1>

							{/*** 2-3-2.コンテンツ ***/}
							<p className={styles.textContents}>
								〜 {d.data.knowledge.title} 〜
							</p>
							<p className={styles.textContents}>
								{d.data.knowledge.contents}
							</p>

						</div>
					{/**** 2-3.文章エリア（豆知識） -- end -- ****/}

				</div>
			{/***** 2.コンテンツエリア -- end -- *****/}

		</div>
    )
}
export default DataBox