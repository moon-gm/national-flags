export default function DataBox({d}) {
    return (
        <div className="dataArea">

            {/* 画像 */}
            <p className="p" id={d.data.id}>
                <img src={`/${d.data.id}.png`} alt={d.data.name.katakana}/>
            </p>

            {/* 国名（略式） */}
            <p className="p">
                {d.data.name.katakana}
            </p>

            {/* 国名（正式） */}
            <p className="p">
                {d.data.name.official}
            </p>

            {/* 国名（漢字） */}
            <p className="p">
                {d.data.name.kanji}
            </p>

            {/* 言語 */}
            <p className="p">
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
            </p>

            {/* 通貨 */}
            <p className="p">
                {d.data.currency}
            </p>

            {/* 首都 */}
            <p className="p">
                {d.data.capital}
            </p>

            {/* 面積 */}
            <p className="p">
                {d.data.area}k㎡
            </p>

            {/* 人口 */}
            <p className="p">
                {d.data.population}人
            </p>

            {/* 時差 */}
            <p className="p">
                {d.data.timeLag}時間
            </p>

            {/* 建国年 */}
            <p className="p">
                {d.data.since}年
            </p>

            {/* 国名由来 */}
            <p className="p">
                {d.data.origin.name}
            </p>

            {/* 国旗の由来 */}
            <p className="p">
                {d.data.origin.flag}
            </p>

            {/* 豆知識（タイトル） */}
            <p className="p">
                {d.data.knowledge.title}
            </p>
            {/* 豆知識（コンテンツ」） */}
            <p className="p">
                {d.data.knowledge.contents}
            </p>

      </div>
    )
} 