import React from 'react';

const textBoxInput = (props) => {
  return (
    <div>
      <input
        className="form-control"
        type={props.type}
        placeholder={props.placeholder}
        rows={props.rows}
      />
    </div>
  );
};

export default textBoxInput;
