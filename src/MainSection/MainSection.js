import { useState } from 'react';

import classes from './MainSection.module.css';
import PDFInput from '../PDFInput/PDFInput';
import Chat from '../Chat/Chat';
import Card from '../UI/Card';

const MainSection = (props) => {
  const [showPDFInput, setShowPDFInput] = useState(true);
  const [fileName, setFileName] = useState("");
  const [chatIsShowing, setChatIsShowing] = useState(false);
  const [showServerError, setShowServerError] = useState(false);

  const processCV = async (fileName) => {
    const response = await fetch(`http://localhost:3000/initialize-context/${fileName}`, {
      mode: 'cors',
      method: "POST",
    })
    if (response.ok) {

      setChatIsShowing(true);
    } else {
      setShowServerError(true);
    }
  }
  const sendPDFRequest = async (file) => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      const response = await fetch("http://localhost:3000/save-cv", {
        mode: 'cors',
        method: "POST",
        body: formData
      })
      if (response.ok) {
        setShowPDFInput(false)
        processCV(fileName)
      } else {
        setShowServerError(true);
      }
    } catch (err) {
      console.log("################")
      console.error(err)
      setShowServerError(true);
    }
  }


  return (
    <section className={classes.products}>
      <h2>Get tips on improving your CV from a GPT model</h2>
      {showPDFInput && !showServerError && <PDFInput
        sendPDFRequest={sendPDFRequest}
        setFileName={setFileName}
      />}
      {chatIsShowing && !showServerError && <Chat />}
      {showServerError && <Card>
        <h1 className='text-danger text-center'>Server is down.</h1>
      </Card>}
    </section>
  );
};

export default MainSection;