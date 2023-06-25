import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

export default function DynamicTabs(props) {
  const { tabNames, tabValue, handleTabChange } = props;

  return (
    <Box>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        aria-label="nav tabs example"
      >
        {tabNames.map((tabName, index) => {
          return (
            <Tab
              value={index}
              label={tabName}
              key={tabName}
              sx={{ borderBottom: 1.5 }}
            />
          );
        })}
      </Tabs>
    </Box>
  );
}

DynamicTabs.propTypes = {
  handleTabChange: PropTypes.func,
  tabValue: PropTypes.number,
  tabNames: PropTypes.arrayOf(PropTypes.string),
};

DynamicTabs.defaultProps = {
  handleTabChange: () => {},
  tabValue: 0,
  tabNames: [],
};
