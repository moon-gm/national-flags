export default function UpdataDB() {

  async function update () {
    await fetch('/api/addData')
  }

  // DBのデータをUpdateするのみのセッティングページ
  return (
    <div>
        <button onClick={update}>
          DB Update
        </button>
    </div>
  )
}
