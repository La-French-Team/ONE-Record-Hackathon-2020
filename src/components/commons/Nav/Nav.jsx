import React, { useCallback } from 'react';
import { Tab, makeStyles, Tabs } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    textAlign: 'start',
  },
}));

/**
 *
 * @typedef {Object} Tab
 * @property {string} label
 * @property {string|JSX.Element} content
 */

/**
 *
 * @param {Object} props
 * @param {Tab[]} props.tabs
 * @param {function} props.onSelectTab
 */
const Nav = ({ tabs = [], onSelectTab }) => {
  const classes = useStyles();

  const onTabClick = useCallback(
    (index) => () => {
      onSelectTab(index);
    },
    [onSelectTab],
  );

  return (
    <Tabs
      orientation='vertical'
      variant='scrollable'
      aria-label='Vertical tabs example'
      className={classes.tabs}
    >
      {tabs.map(({ label }, index) => (
        <Tab label={label} onClick={onTabClick(index)} />
      ))}
    </Tabs>
  );
};

export default Nav;
