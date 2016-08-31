import React, {PropTypes} from 'react';
import classNames from 'classnames';

const Button = (props) => {
  const classes = classNames('btn btn-sm btn-default', {

  });
  const {clickAction} = props;

  return (
    <button className={classes} onClick={clickAction}>{props.label}</button>
  );
};

Button.PropTypes = {
  label: PropTypes.string.isRequired,
  clickAction: PropTypes.func.isRequired
};

export default Button
