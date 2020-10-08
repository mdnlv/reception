import React, { FC } from 'react';
import './styles.scss';

type FieldProps = {
  label?: string;
  labelPosition?: string;
  error?: string;
};

const FormField: FC<FieldProps> = (props) => {
  function getFieldLabel() {
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

  function getFormBody() {
    return (
      <div
        className={`form-field__body form-field__body--${props.labelPosition}`}>
        {getFieldLabel()}
        <div className="form-field__content">{props.children}</div>
        {getFormError()}
      </div>
    );
  }

  function getFormError() {
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
