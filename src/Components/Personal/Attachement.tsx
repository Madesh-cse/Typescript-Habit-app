import React, { useState } from "react"
import '../../styles/Components/_subtask.scss'
function Attachement() {

    //  State to hold the selected file
    const[SelectFile,setSelectFile] = useState<File | null>(null)

    // Handle the file changes

    const HandleFileChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files && e.target.files[0]){
            setSelectFile(e.target.files[0])
        }
    }

    //For display the images
    const renderPreview = ()=>{
        if(SelectFile && SelectFile.type.startsWith('image')){
            const objectURL = URL.createObjectURL(SelectFile);
            return <img src={objectURL} alt="preview" width='450' height='250'/>
        }

        return null
    }

  return (
    <div>
        {renderPreview()}
        <div className="Attachment">
            <div className="Upload-box">
                <input type="file" onChange={HandleFileChange} accept="image/*" className="Upload-input"/>
                <label htmlFor="file-upload" className="Upload-label">
                    Click to add / drop your files here
                </label>
            </div>
        </div>
    </div>
  )    
}

export default Attachement