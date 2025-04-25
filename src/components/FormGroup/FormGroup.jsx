import React from 'react';
import './FormGroup.css';

const FormGroup = ({ label, icon, children }) => {
  return (
    <div className="form-group">
      <label>
        {icon}
        {label}
      </label>
      {children}
    </div>
  );
};

export default FormGroup; 