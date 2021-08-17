import React from 'react';

import './spinner.css';

const Spinner = () => {
  return (
    <center>
    <div className="lds-css">
      <div className="lds-double-ring">
        <div></div>
        <div></div>
      </div>
    </div>
    </center>
  );
};

export default Spinner;