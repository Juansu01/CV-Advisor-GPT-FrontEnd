import classes from './Button.module.css';

const Button = (props) => {
  return (
    <button onClick={props.onClick} className={`${classes.button} float-right`}>
      <span className='h5'>{props.content}</span>
    </button>
  );
};

export default Button;