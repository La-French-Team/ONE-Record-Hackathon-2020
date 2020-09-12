import React from 'react';
import QrCodeIcon from 'components/icons/QrCode';

const LoInfoButton = ({ loUri }) => {
  return (
    <>
      <button>
        <QrCodeIcon></QrCodeIcon>
      </button>
    </>
  );
};

export default LoInfoButton;
