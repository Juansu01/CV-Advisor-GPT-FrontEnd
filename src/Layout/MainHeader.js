import classes from './MainHeader.module.css';
import Button from '../UI/Button';

const MainHeader = (props) => {
  return (
    <header className={classes.header}>
      <h1>CV Advisor for devs</h1>
      <nav>
        <ul>
          <li>
            <Button content='End Session' />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;