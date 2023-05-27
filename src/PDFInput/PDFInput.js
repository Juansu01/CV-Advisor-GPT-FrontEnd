import { useState } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';

const PDFInput = (props) => {
  const [fileName, setFileName] = useState('Choose CV')
  const [file, setFile] = useState(null);
  const [showSubmitButton, setShowSubmitButton] = useState(false)

  const fileInputChangeHandler = (event) => {
    event.preventDefault()
    setFileName(event.target.files[0].name)
    props.setFileName(event.target.files[0].name)
    setFile(event.target.files[0])
    setShowSubmitButton(true);
  }

  const submitCVHandler = async (event) => {
    event.preventDefault()
    await props.sendPDFRequest(file)
  }

  const submitCVButton = <Button content='Send CV' onClick={submitCVHandler} />

  return (
    <Card>
      <h5>Please provide your CV in PDF format.</h5>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroupFileAddon01">Upload</span>
        </div>
        <div className="custom-file">
          <input onChange={fileInputChangeHandler} type="file" className="custom-file-input" id="inputGroupFile01"
            aria-describedby="inputGroupFileAddon01"></input>
          <label className="custom-file-label" htmlFor="inputGroupFile01">{fileName}</label>
        </div>
      </div>
      {showSubmitButton && submitCVButton}
    </Card>
  )
}

export default PDFInput;