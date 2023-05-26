import classes from './MainSection.module.css';
import PDFInput from '../PDFInput/PDFInput';

const MainSection = (props) => {
  return (
    <section className={classes.products}>
      <h2>Get tips on improving your CV from a GPT model</h2>
      <ul>
        <PDFInput />
      </ul>
    </section>
  );
};

export default MainSection;