import React from 'react';
import ModalComponent from './modal-component';

export function Coaches() {
  return (
    <div>
      <ModalComponent
        modalHeadingTitle="Archive Coach"
        modalMessage="Are you sure you want to archive this coach?"
        actionName="Archive"
        twoButtonModel={false}
      />
    </div>
  );
}
