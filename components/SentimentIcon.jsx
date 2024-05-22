import React from 'react';

const SentimentIcon = ({ score }) => {
  const fries = ['🍟', '🍟🍟', '🍟🍟🍟', '🍟🍟🍟🍟', '🍟🍟🍟🍟🍟'];
  return <span>{fries[score - 1] || 'N/A'}</span>;
};

export default SentimentIcon;
