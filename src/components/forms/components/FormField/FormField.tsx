import React, { FC } from 'react';

import './styles.scss';
import {FieldProps} from "./types";

const FormField: FC<FieldProps> = (props) => {
  const getFieldLabel = () => {
    if (!props.label) {
      return null;
    } else {
      let className = '';
      if (props.labelPosition === 'left') {
        className = 'form-field__label--left';
      }

      return (
        <label className={`form-field__label ${className}`}>
          {props.label}
        </label>
      );
    }
  }

  const getFormBody = () => {
    return (
      <div
        className={`form-field__body form-field__body--${props.labelPosition}`}>
        {getFieldLabel()}
        <div className="form-field__content">{props.children}</div>
        {getFormError()}
      </div>
    );
  }

  const getFormError = () => {
    if (props.error) {
      return <div className={'form-field__error'}>{props.error}</div>;
    } else return null;
  }

  return <div className="form-field">{getFormBody()}</div>;
};

FormField.defaultProps = {
  labelPosition: 'top',
};

export default FormField;
