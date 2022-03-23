import React from 'react'
import { Avatar, Typography, ListItemText, ListItemAvatar, MenuItem } from '@mui/material';
import BadgeStatus from './BadgeStatus';
// utils

export const AvtarMenuItem = ({ avatar, primaryText, secondaryText }) => {
  return (
    <MenuItem sx={{ py: "20px", px: "40px" }}>
    <ListItemAvatar sx={{ position: 'relative' }}>
      <Avatar src={avatar} sx={{ width: 55, height: 55 }}  />
      <BadgeStatus status="online" sx={{ position: 'absolute', right: 1, bottom: 1 }} />
    </ListItemAvatar>

    <ListItemText
      primaryTypographyProps={{ typography: 'h6', mb: 0.25 }}
      secondaryTypographyProps={{ typography: 'caption' }}
      primary={primaryText}
      secondary={secondaryText}
    />
    </MenuItem>
  )
}
