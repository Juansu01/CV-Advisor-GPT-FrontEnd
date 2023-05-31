import { useContext } from 'react';

import classes from './MainHeader.module.css';
import Button from '../UI/Button';
import SessionContext from '../context/session-context';

const MainHeader = (props) => {
  const ctx = useContext(SessionContext);

  return (
    <header className={classes.header}>
      <h1>CV Advisor for devs</h1>
      <nav>
        <ul>
          {ctx.isSessionActivated && <li>
            <Button onClick={ctx.onEndSession} content='End Session' />
          </li>}
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;