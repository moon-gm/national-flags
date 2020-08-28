import DataBox from '../components/dataBox'
import Navigation from '../components/navigation'

export default function Home({funcs, nationalData}) {

  return (
    <>

      <div className="searchArea">
          <form name="formOfSearch">
            <lavel><input type="radio" name="searchWord" id="nationalName" value="nationalName"/>国名（カタカナ or 漢字）</lavel>
            <lavel><input type="radio" name="searchWord" id="capital" value="capital"/>首都名（カタカナ or 漢字）</lavel>
            <lavel><input type="radio" name="searchWord" id="currency" value="currency"/>通貨名（カタカナ or 漢字）</lavel>
            <input type="text" name="searchByName" id="searchByName" placeholder="検索種別にチェックを入れて入力"/>
            <input type="button" onClick={funcs.searchTerm} value="Search"/>
          </form>
      </div>

      <Navigation/>

      {nationalData.length > 0 ? (
          nationalData.map(d => (
           <DataBox d={d}/>
          ))
        ) : (
          <div>
            Loading...
          </div>
        )}
    </>
  )
}
