import React from 'react';
import ModalComponent from './modal-component';

export function Coaches() {
  // a sample function to represent code for clicking action button (archiving, adding, etc.)
  const actionButtonFunction = () => {
    console.log('clicked!');
  };

  return (
    <div>
      <ModalComponent
        modalHeadingTitle="Add Coach"
        modalMessage="Are you sure you want to add this coach?"
        actionName="Add"
        actionButtonFunction={actionButtonFunction}
        usingTwoButtonFormat
        // usingTextFieldFormat={false}
      />
    </div>
  );
}
