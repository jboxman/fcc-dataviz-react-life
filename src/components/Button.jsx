import React, {P} from 'react';
import classNames from 'classnames';

const Button = (props) => {
  const classes = classNames('btn btn-default', {

  });
  const {clickAction} = props;

  return (
    <button className={classes} onClick={clickAction}>props.label</button>
  );
};

Button.PropTypes = {
  label: P.string.isRequired
  clickAction: P.func.isRequired
};

export default Button
