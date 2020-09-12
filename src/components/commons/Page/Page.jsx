import React from 'react';
import Header from 'components/commons/Header/Header';

const Page = ({ pageName, children }) => {
  return (
    <>
      <Header pageName={pageName} />
      {children}
    </>
  );
};

export default Page;
