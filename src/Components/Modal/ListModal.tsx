import { forwardRef, useImperativeHandle, useRef ,useState} from "react"
import '../../styles/Components/_modal.scss'

interface ModalInput {
    onSubmit:(value:string)=>void;
}

interface ModalHandle {
    openModal:()=>void;
    closeModal:()=> void;
}

// _ helps to assign as a props 
const Modal = forwardRef<ModalHandle,ModalInput>(({onSubmit},ref)=>{

    const dialogRef = useRef<HTMLDialogElement | null> (null)
    const[InputValue,setInputValue] = useState<string>('')

    useImperativeHandle(ref,()=>({

        openModal:()=>{
            if(dialogRef.current){
                dialogRef.current.showModal();  
            }
        },
        closeModal:()=>{
            if(dialogRef.current){
                dialogRef.current.close()
            }
        }
    }))

    const HandleSubmit = (e:React.FormEvent)=>{

        e.preventDefault()

        if(InputValue.trim() !== ''){
            onSubmit(InputValue)
            setInputValue('')
            dialogRef.current?.close()
        }
    }

    return(
        <dialog className="ModalBox" ref={dialogRef}>
            <p onClick={()=>dialogRef.current?.close()}>X</p>
            <h1>Add Your Tasks</h1>
            <div className="InputBox">
                <form action="" onSubmit={HandleSubmit}>
                    <label htmlFor="">Enter Your Tasks</label>
                    <input type="text" value={InputValue} onChange={(e)=>setInputValue(e.target.value)} />
                    <button type="submit">Continoue</button>
                </form>
            </div>
        </dialog>
    )
})

export default Modal;