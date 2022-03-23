import React from 'react'
import { Avatar, Typography, Stack, Box } from '@mui/material';
import { IconButtonAnimate } from './animate';
import Iconify from './Iconify';

export const AvatarCard = ({ avatar, primaryText, secondaryText }) => {
  return (
    <Stack sx={{ pt:3 , px: "20px", pb: 6 }}>
      
      <Box>
        <IconButtonAnimate>
          <Iconify icon={'dashicons:arrow-left-alt2'} width={22} height={22} />
        </IconButtonAnimate>
      </Box>

      <Stack alignItems="center">  
        <Avatar src={avatar} sx={{ width: 80, height: 80, mb: 1 }}  />
        <Typography variant='h6'>{primaryText}</Typography>
        <Typography variant='body2'>{secondaryText}</Typography>
      </Stack>
      
    </Stack>
  )
}
