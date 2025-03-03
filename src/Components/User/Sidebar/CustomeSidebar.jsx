import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import style from './sidebar.module.css';
import { FaExpandArrowsAlt } from "react-icons/fa";
import { FaCompressArrowsAlt } from "react-icons/fa";

export default function CustomeSidebar() {
  const [iscollapsed, setIsCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setIsCollapsed(!iscollapsed);
  };

  return (
    <Sidebar
      className={`${style.sidebar} ${iscollapsed ? style.collapsed : ''}`}
      collapsed={iscollapsed}
    >
      {iscollapsed ? (
        <FaExpandArrowsAlt onClick={toggleCollapsed} />
      ) : (
        <FaCompressArrowsAlt onClick={toggleCollapsed} />
      )}

      <Menu>
        <MenuItem component={<Link to="/Profile/info" />}> Info</MenuItem>
        <MenuItem component={<Link to="/Profile/orders" />}> Order</MenuItem>
        <MenuItem component={<Link to="/Profile/image" />}> Image</MenuItem>
      </Menu>
    </Sidebar>
  );
}
