import React from 'react';

const PillCard = ({ text, onClick }) => {
  return (
    // On click filter the data and feedback data by category 
    <button className="btn btn-primary" style={{ borderRadius: 23 }} onClick={() => onClick(text)}>
      {text}
    </button>
  );
};

export default PillCard;
