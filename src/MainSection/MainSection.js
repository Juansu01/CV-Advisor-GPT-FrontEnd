import { useContext, useState } from 'react';

import classes from './MainSection.module.css';
import PDFInput from '../PDFInput/PDFInput';
import Chat from '../Chat/Chat';
import Card from '../UI/Card';
import WelcomeCard from '../WelcomeCard/WelcomeCard';
import SessionContext from '../context/session-context';

const MainSection = (props) => {
  const [showPDFInput, setShowPDFInput] = useState(false);
  const [fileName, setFileName] = useState("");
  const [chatIsShowing, setChatIsShowing] = useState(false);
  const [showServerError, setShowServerError] = useState(false);
  const [welcomeCardIsShowing, setWelcomeCardIsShowing] = useState(true);
  const [initialMessage, setInitalMessage] = useState("");
  const [chatIsLoading, setChatIsLoading] = useState(false);
  const ctx = useContext(SessionContext);


  const processCV = async (fileName) => {
    setChatIsLoading(true);
    const response = await fetch(`http://34.125.52.24:3000/initialize-context/${fileName}`, {
      mode: 'cors',
      method: "POST",
    })
    if (response.ok) {
      const json = await response.json()
      setInitalMessage(json.response);
      setChatIsShowing(true);
      ctx.onStartSession();
    } else {
      setShowServerError(true);
    }
    setChatIsLoading(false);
  }
  const sendPDFRequest = async (file) => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      const response = await fetch("http://34.125.52.24:3000/save-cv", {
        mode: 'cors',
        method: "POST",
        body: formData
      })
      if (response.ok) {
        setShowPDFInput(false)
        await processCV(fileName);
      } else {
        setShowServerError(true);
      }
    } catch (err) {
      console.error(err)
      setShowServerError(true);
    }
  }

  return (
    <section className={classes.products}>
      {chatIsShowing && <h2>Now you can ask for suggestions!</h2>}
      {welcomeCardIsShowing && <WelcomeCard
        setWelcomeCardIsShowing={setWelcomeCardIsShowing}
        setShowPDFInput={setShowPDFInput}
      />}
      {showPDFInput && !showServerError && <PDFInput
        sendPDFRequest={sendPDFRequest}
        setFileName={setFileName}
      />}
      {chatIsShowing && !showServerError && <Chat initialMessage={initialMessage} />}
      {showServerError && <Card>
        <h1 className='text-danger text-center'>Server is down.</h1>
      </Card>}
      {chatIsLoading && <Card>
        <h2 className='text-center text-dark'>We are processing your CV, you will be
          chatting with CV Advisor soon.</h2>
      </Card>}
    </section>
  );
};

export default MainSection;