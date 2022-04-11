import React, { useState } from 'react'
import PropTypes from 'prop-types';

import { useRouter } from 'next/router';

// Components
import Image from './Image';
import Scrollbar from './Scrollbar';
import { useTheme } from '@mui/material/styles';
import SearchNotFound from './SearchNotFound';
//
import Searchbar from './Searchbar';

import { Typography, ListItemText, Divider, MenuItem, Box, Stack, Paper, Button } from '@mui/material';


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
    setFilterName(filterName)
    setChannelsList(channels.filter((_user) => _user.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1));
  };

  const handleOnClick = (channel, index) => {
    setSelectedIndex(index);
  
    push(`${PATH_CHANNEL.root}/${paramCase(channel.name)}`)
  }
    
  const isNotFound = !channelsList.length && Boolean(filterName);
  
  const theme = useTheme();
  
  return (
    <Box sx={{ position: "relative", px: 2, overflow: "hidden" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" >
          
             <Box sx={{ display: "flex", alignItems:"center", }}>
              <Typography variant="h5" sx={{ py: 2, pl: 1.8, pr:1, fontWeight: 600, }}>{listTitle}</Typography>
              {showLength && <Typography variant='body2' sx={{ color: theme.palette.grey[500] }}>{channelsList.length}</Typography> }
            </Box>
            <Stack pr={1} direction="row" spacing={1}>
             {search &&
             <Searchbar filterName={filterName} onFilterName={handleFilterByName} />}
           
           </Stack>
        
        </Stack>
        {channelsList && channelsList.length > 0 &&
          <Scrollbar sx={{ height: contentHeight }}>
            {channelsList.map((channel, index) => (
              <Box>
              <MenuItem selected={selectedIndex === index} key={index} sx={{ py: "15px" }} onClick={() => handleOnClick(channel, index)}>
    
                <ListItemText 
  
                  primaryTypographyProps={{ typography: 'subtitle2', mb: 0.25 }}
                  secondaryTypographyProps={{ typography: 'caption' }}
                  primary={channel.name}
                  secondary={`${channel.participants.length} Participants`}
                />
              </MenuItem>
              <Divider sx={{ m: "0 !important", width: "100%"}}/>
              </Box>
            ))}
            
            
          </Scrollbar>
        }
        {isNotFound &&
              <Box sx={{ height: 400 }}>
                  <SearchNotFound searchQuery={filterName} />
              </Box>
            }
        {!channels || channels.length < 1 &&
           <Paper
           sx={{
             height: '100%',
             alignItems: 'center',
             display: 'flex',
             flexDirection: 'column',
             justifyContent: 'center',
             backgroundColor: "transparent",
             px: 5,
             my: 10
           }}
         >
          <Image alt="https://ouch-cdn2.icons8.com/URWV47nXxOb37UO1HTvT06WOOmFkPi5IsDBYv-yLnuU/rs:fit:1216:912/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvMzc4/LzY2ZTQzZmMxLTFm/M2QtNGM2MS05ZTY5/LTM2YzJkMGVmYjEz/My5zdmc.png" src="https://ouch-cdn2.icons8.com/URWV47nXxOb37UO1HTvT06WOOmFkPi5IsDBYv-yLnuU/rs:fit:1216:912/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvMzc4/LzY2ZTQzZmMxLTFm/M2QtNGM2MS05ZTY5/LTM2YzJkMGVmYjEz/My5zdmc.png" ratio="1/1" sx={{ borderRadius: 1.5 }} />
           <Typography gutterBottom align="center" variant="subtitle1">
            No channels found
           </Typography>
           <Typography variant="body2" align="center">
            You don't have any channels created, Create new channel to send messages.
           </Typography>
           <Button sx={{ mt: 5 }} variant='contained'>Create New Channel</Button>
         </Paper>
        }

    </Box>
  )
}


GroupListContainer.defaultProps = {
  add: true,
  edit: true,
  search: true,
  avatarSize: 50
}