import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
export function SearchBar(props) {
  const { requestSearch, useTab, tabValue, handleTabChange } = props;
  return (
    <div>
      <Box sx={{ width: '100%' }} marginInline={{}}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            {useTab ? (
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="nav tabs example"
                sx={{ pb: 1 }}
              >
                <Tab value="one" label="active" sx={{ borderBottom: 1.5 }} />
                <Tab
                  value="two"
                  label="applicants"
                  sx={{ borderBottom: 1.5 }}
                />
              </Tabs>
            ) : (
              <React.Fragment>
                {' '}
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  aria-label="nav tabs example"
                >
                  {' '}
                </Tabs>
              </React.Fragment>
            )}
          </Grid>
          <Toolbar>
            <Grid item>
              <Search sx={{ border: 1.5 }}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  onChange={(event) => {
                    requestSearch(event.target.value);
                  }}
                />
              </Search>
            </Grid>
            <Grid item>
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <AddStudentModal />
                </IconButton>
              </Box>
            </Grid>
          </Toolbar>
        </Grid>
      </Box>
    </div>
  );
}
SearchBar.propTypes = {
  requestSearch: PropTypes.func,
};
SearchBar.defaultProps = {
  requestSearch: () => {},
};

export function SearchBar(props) {
  const { requestSearch } = props;

  return (
    <Search sx={{ border: 1.5 }}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        onChange={(event) => {
          requestSearch(event.target.value);
        }}
      />
    </Search>
  );
}

SearchBar.propTypes = {
  requestSearch: PropTypes.func,
};

SearchBar.defaultProps = {
  requestSearch: () => {},
};
