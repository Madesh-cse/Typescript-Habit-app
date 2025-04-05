import PersonalList from "../../Components/Personal/PersonalList"
import { SubmissionProvider } from "../../Context/InputSubmissonContext"

function Personal() {
  return (
    <main >
      <SubmissionProvider>
        <PersonalList/>
      </SubmissionProvider>
    </main>
  )
}

export default Personal