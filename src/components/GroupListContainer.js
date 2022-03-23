import React, { useState } from 'react'
import PropTypes from 'prop-types';

import { useRouter } from 'next/router';

// Components
import Scrollbar from './Scrollbar';
import { useTheme } from '@mui/material/styles';
import SearchNotFound from './SearchNotFound';
//
import Searchbar from './Searchbar';
// components
import Iconify from './Iconify';
import { IconButtonAnimate } from './animate';

import { Avatar, Typography, ListItemText, ListItemAvatar, MenuItem, Box, Stack } from '@mui/material';

// _mock_
import { _channelsList } from '../_mock';

import { channels } from 'src/_mock/channels';
import { PATH_CHANNEL } from 'src/routes/paths';
import { paramCase } from 'change-case';

export const GroupListContainer = ({ listTitle, showLength, add, edit, search, contentHeight, avatarSize }) => {

  const { push, query } = useRouter();

  const [channelsList, setChannelsList] = useState(channels)
  
  const [filterName, setFilterName] = useState("")
  
  const selectedChannelIndex = channelsList.findIndex(channel => paramCase(channel.name) == query.name)

  const [selectedIndex, setSelectedIndex] = useState(selectedChannelIndex);
  

  const handleFilterByName = (filterName) => {
    setFilterName(filterName);
    setChannelsList(channels.filter((_user) => _user.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1));
  };

  const handleOnClick = (channel, index) => {
    setSelectedIndex(index);
  
    push(`${PATH_CHANNEL.root}/${paramCase(channel.name)}`)
  }

  

  const isNotFound = !channelsList.length && Boolean(filterName);
  
  const theme = useTheme();
  
  return (
    <Box sx={{ position: "relative", px:2, overflow: "hidden" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" >
          
             <Box sx={{ display: "flex", alignItems:"center", }}>
              <Typography variant="h5" sx={{ py: 2, pl: 1.8, pr:1, fontWeight: 600, }}>{listTitle}</Typography>
              {showLength && <Typography variant='body2' sx={{ color: theme.palette.grey[500] }}>{channelsList.length}</Typography> }
            </Box>
          
            <Stack pr={1} direction="row" spacing={1}>
             {search &&
             <Searchbar filterName={filterName} onFilterName={handleFilterByName} />}
             {edit && <IconButtonAnimate>
               <Iconify icon={'akar-icons:edit'} width={20} height={20} />
             </IconButtonAnimate>}
             {add &&
             <IconButtonAnimate>
               <Iconify icon={'ant-design:user-add-outlined'} width={20} height={20} />
             </IconButtonAnimate>}
           </Stack>
        
        </Stack>

        <Scrollbar sx={{ height: contentHeight }}>
          {channelsList.map((channel, index) => (
            <MenuItem selected={selectedIndex === index} key={index} sx={{ py: "10px" }} onClick={() => handleOnClick(channel, index)}>
              <ListItemAvatar sx={{ position: 'relative' }}>
                <Avatar src={channel.coverPhoto} sx={{ width: avatarSize, height: avatarSize }}  />
              </ListItemAvatar>

              <ListItemText 

                primaryTypographyProps={{ typography: 'subtitle2', mb: 0.25 }}
                secondaryTypographyProps={{ typography: 'caption' }}
                primary={channel.name}
                secondary={`${channel.participants.length} Participants`}
              />

            </MenuItem>
          ))}
          {isNotFound && (
            <Box sx={{ height: 400 }}>
                <SearchNotFound searchQuery={filterName} />
            </Box>
          )}
        </Scrollbar>


    </Box>
  )
}


GroupListContainer.defaultProps = {
  add: true,
  edit: true,
  search: true,
  avatarSize: 50
}