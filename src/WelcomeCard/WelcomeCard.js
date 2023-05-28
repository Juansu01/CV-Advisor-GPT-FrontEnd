import Card from "../UI/Card";
import Button from "../UI/Button";

const WelcomeCard = (props) => {

  const closeButtonHandler = () => {
    props.setWelcomeCardIsShowing(false);
    props.setShowPDFInput(true);
  }

  return (
    <Card>
      <h3>Welcome to the CV Advisor for devs!</h3>
      <p>This application combines prompt engineering and
        a GPT model to help developers improve their CV
        so they can get companies' attention more easily!
      </p>
      <h3>These are the steps that we are going to take:</h3>
      <ol>
        <li>Upload your CV in pdf format.</li>
        <li>Hit the send CV button.</li>
        <li>Wait for us to proccess your CV.</li>
        <li>A chat will be displayed so you can ask for suggestions.</li>
      </ol>
      <Button onClick={closeButtonHandler} content="Understood"></Button>
    </Card>
  )
}

export default WelcomeCard;