import Sidebar from "../../Components/Sidebar/Sidebar"
import { SubmissionProvider } from "../../Context/InputSubmissonContext"
function Home() {
  return (
    <>
    <main>
      <SubmissionProvider>
        <Sidebar/>
      </SubmissionProvider>
    </main>
    </>
  )
}

export default Home