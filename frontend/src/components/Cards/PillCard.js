import React from 'react';

const PillCard = ({ text, onClick, active }) => {
  return (
    <>
    {/* // On click filter the data and feedback data by category  */}
    {/* <span class="filter-item active-filter" data-filter="all">ALL</span> */}
    <button className={`filter-item ${active  ? 'active-filter' : ''}`} style={{ borderRadius: 23 }} onClick={() => onClick(text)}>
      {text}
    </button>
    </>
  );
};

export default PillCard;
