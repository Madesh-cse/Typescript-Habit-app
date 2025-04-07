import Sidebar from "../../Components/Sidebar/Sidebar"
import Main from "../../Components/main/Main"
import Suggestion from "../../Components/main/Suggestion"
import '../../styles/Components/_sidebar.scss'
function Home() {
  return (
    <>
    <main>
      <div className="Home-flex"> 
        <Sidebar/>
        <Main/>
        <Suggestion/>
      </div>
    </main>
    </>
  )
}

export default Home