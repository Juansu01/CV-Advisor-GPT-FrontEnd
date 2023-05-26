import classes from './Button.module.css';

const Button = (props) => {
  return (
    <button className={classes.button}>
      <span className='h5'>End Session</span>
    </button>
  );
};

export default Button;