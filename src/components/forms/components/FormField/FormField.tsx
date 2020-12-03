import React, { FC } from 'react';

import './styles.scss';
import {FieldProps} from "./types";

const FormField: FC<FieldProps> = ({
  label,
  labelPosition,
  error,
  children
}) => {
  const getFieldLabel = () => {
    if (!label) {
      return null;
    } else {
      let className = '';
      if (labelPosition === 'left') {
        className = 'form-field__label--left';
      }

      return (
        <label className={`form-field__label ${className}`}>
          {label}
        </label>
      );
    }
  }

  const getFormBody = () => {
    return (
      <div
        className={`form-field__body form-field__body--${labelPosition}`}>
        {getFieldLabel()}
        <div className="form-field__content">{children}</div>
        {getFormError()}
      </div>
    );
  }

  const getFormError = () => {
    if (error) {
      return <div className={'form-field__error'}>{error}</div>;
    } else return null;
  }

  return <div className="form-field">{getFormBody()}</div>;
};

FormField.defaultProps = {
  labelPosition: 'top',
};

export default FormField;
