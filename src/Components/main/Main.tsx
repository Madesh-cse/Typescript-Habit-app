import '../../styles/Components/_main.scss';
import { useState,useEffect } from 'react';
import { FaArrowUp } from "react-icons/fa";
import { useInputContext } from '../../Context/InputSubmissonContext';
import DisplayContent from './DisplayContent';

function Main() {

    const{ addSubmisson} = useInputContext()

    const[gretting,setgretting] = useState<string>("")
    const[inputText,setinputText] = useState<string>('')

    useEffect(()=>{

        const upgradeFunciton = ()=>{

            const currentHour = new Date().getHours()
            if(currentHour>=3 && currentHour<12){
                setgretting("Good Morning")
            }
            else if(currentHour >= 12 && currentHour < 16){
                setgretting("Good Afternoon")
            }
            else if(currentHour >=16 && currentHour <19){
                setgretting("Good Evening")
            }
            else{
                setgretting("Good Night")
            }
        }
        upgradeFunciton()

        const timer = setInterval(upgradeFunciton,1000*60) // for every 1 minute it get updated

        return ()=>clearInterval(timer)
    },[])

    const formattedDate = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date());

    const handleSubmit = (e:React.FormEvent)=>{
        e.preventDefault()

        if(inputText.trim()!==""){
            addSubmisson(inputText)
            setinputText('')
        }
    }


  return (
   <section>
       <div className='MainContent'>
           <h1>{gretting},Madesh</h1>
           <p>Run your day or your day will run you</p>
           <div className='Dynamic-day'>
             <p>{formattedDate}</p>
              <div className='Join-app'>
                <p>Join video meetings with one tap</p>
                <span><a href="">Connect Google Calendar</a></span>
                <span><a href="">Connect Outlook Calendar</a></span>
              </div>
           </div>
           <DisplayContent/>
           <div className='InputTasks'>
            <form action="" onSubmit={handleSubmit}>
                <input type="text" placeholder='Enter task Title' value={inputText} onChange={(e)=>setinputText(e.target.value)} />
                <button type='submit'><FaArrowUp/></button>
            </form>
           </div>
        </div>
   </section>
  )
}

export default Main