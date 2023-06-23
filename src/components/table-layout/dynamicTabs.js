import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

export default function DynamicTabs(props) {
  const { useTab, tabValue, handleTabChange } = props;

  return (
    <Box>
      {useTab ? (
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="nav tabs example"
        >
          <Tab value="one" label="active" sx={{ borderBottom: 1.5 }} />
          <Tab value="two" label="applicants" sx={{ borderBottom: 1.5 }} />
        </Tabs>
      ) : (
        <div />
      )}
    </Box>
  );
}

DynamicTabs.propTypes = {
  handleTabChange: PropTypes.func,
  tabValue: PropTypes.string,
  useTab: PropTypes.bool.isRequired,
};

DynamicTabs.defaultProps = {
  handleTabChange: () => {},
  tabValue: 'one',
};
