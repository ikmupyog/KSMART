import React from 'react';
import ReactHtmlParser from 'react-html-parser';

function HtmlParser({ htmlString }) {
  const textContent = ReactHtmlParser(htmlString);

  return <div>{textContent}</div>;
}

export default HtmlParser;