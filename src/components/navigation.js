import { useEffect, useState } from 'react'
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
		{name: '各種検索', path: '/search'},
		{name: 'データ編集', path: '/setting/register'},
	]

	// ----- 2.state設定 -----
	const [userAgent, setUserAgent] = useState() // ユーザーエージェントの設定

	// ----- レンダー後の処理 -----
	useEffect(()=>{
		// ユーザーエージェント取得
		let ua = navigator.userAgent.toLowerCase()

		// 端末種別条件文設定
		let isiPhone = (ua.indexOf('iphone') > -1) // iPhone
		let isiPad = (ua.indexOf('ipad') > -1) // iPad
		let isAndroid = (ua.indexOf('android') > -1) && (ua.indexOf('mobile') > -1) // Android
		let isAndroidTablet = (ua.indexOf('android') > -1) && (ua.indexOf('mobile') == -1) // Android Tablet

		// ユーザーエージェント判定
		if(isiPhone) { setUserAgent('iPhone') }
		else if(isiPad) { setUserAgent('iPad') }
		else if(isAndroid) { setUserAgent('Android'); }
		else if(isAndroidTablet) { setUserAgent('Android Tablet') }
		else { setUserAgent('PC') }
	}, [])


    return (
		<nav className="navigationArea">
			<div className={styles.grid}>
				{lists.map(list => {
					return (
						<React.Fragment
							key={`listOf${list.path}`}
						>

							{// 常時表示
								list.name !== "データ編集" &&
									(
										<Link href={list.path}>
											<h3 className={styles.card}>
												{list.name}
											</h3>
										</Link>
									)
							}

							{// 「データ編集」項目、かつ、ユーザーエージェント判定が「PC」の時のみ表示
								list.name === "データ編集" && userAgent === "PC" &&
									(
										<Link href={list.path}>
											<h3 className={styles.card}>
												{list.name}
											</h3>
										</Link>
									)
							}

						</React.Fragment>
					)
				})}
			</div>
		</nav>
    )
}
