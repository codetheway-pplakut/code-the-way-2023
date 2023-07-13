import React from 'react';
import { GenericModal } from '../shared/generic-modal';

export function ArchiveCoachModal() {
  // const archiveCoachAction = () => {
  //   console.log('here is where you connect to api');
  // };

  return (
    <GenericModal
      openModal="open"
      modalHeadingTitle="Archive Coach"
      modalMessage="Are you sure you want to archive this coach?"
      actionButtonTitle="Archive"
      cancelButtonTitle="Cancel"
      actionButtonColor="archive"
      // actionButtonFunction={archiveCoachAction}
    />
  );
}
