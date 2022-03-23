import React, { useEffect, useState } from 'react';

// Components
import Scrollbar from './Scrollbar';
import { useTheme } from '@mui/material/styles';
import SearchNotFound from './SearchNotFound';
//
import Searchbar from './Searchbar';
// components
import Iconify from './Iconify';
import { IconButtonAnimate } from './animate';

import {
  Typography,
  ListItemText,
  MenuItem,
  Box,
  Stack
} from '@mui/material';

import RemoveParticipantDialog from './RemoveParticipantDialog';

import NotistackProvider from './NotistackProvider'

export const DetailList = ({
  listTitle,
  showLength,
  add,
  edit,
  search,
  contentHeight,
  openGroupContent,
  data
}) => {

  const [open, setOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null)

  const [participants, setParticipants] = useState(data);

  useEffect(() => {
    setParticipants(data)
  }, [data])

  const [filterName, setFilterName] = useState('');

  const handleEditClickOpen = (user) => {
    setOpen(true);
    setSelectedUser(user)
  };

  const handleClickOpen = () => {
    setSelectedUser(null)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFilterByName = (filterName) => {
    setFilterName(filterName);
    setParticipants(
      data.filter((_user) => _user.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1)
    );
  };

  const isNotFound = !participants.length && Boolean(filterName);

  const theme = useTheme();

  return (
    <Box sx={{ position: 'relative', px: 2, overflow: 'hidden' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ py: 2, pl: 1.8, pr: 1, fontWeight: 600 }}>
            {listTitle}
          </Typography>
          {showLength && (
            <Typography variant="body2" sx={{ color: theme.palette.grey[500] }}>
              ({participants.length})
            </Typography>
          )}
        </Box>

        <Stack pr={1} direction="row" spacing={1}>
          {search && <Searchbar filterName={filterName} onFilterName={handleFilterByName} />}
          {edit && (
            <IconButtonAnimate>
              <Iconify icon={'akar-icons:edit'} width={20} height={20} />
            </IconButtonAnimate>
          )}
          {add && (
            <IconButtonAnimate onClick={handleClickOpen}>
              <Iconify icon={'ant-design:user-add-outlined'} width={20} height={20} />
            </IconButtonAnimate>
          )}
        </Stack>
      </Stack>

      <Scrollbar sx={{ height: contentHeight }}>
        {participants.map((participant) => (
          <MenuItem key={participant.id} sx={{ py: '10px' }} onClick={openGroupContent}>
            <ListItemText
              primaryTypographyProps={{ typography: 'subtitle2', mb: 0.25 }}
              secondaryTypographyProps={{ typography: 'caption' }}
              primary={participant.name}
              secondary={participant.email ? participant.email : participant.phoneNumber}
            />
            <IconButtonAnimate onClick={() => handleEditClickOpen(participant)}>
              <Iconify icon={'akar-icons:edit'} width={20} height={20} />
            </IconButtonAnimate>
          </MenuItem>
        ))}
        {isNotFound && (
          <Box sx={{ height: 400 }}>
            <SearchNotFound searchQuery={filterName} />
          </Box>
        )}
        
        {selectedUser ?
          <NotistackProvider>
            <RemoveParticipantDialog open={open} isEdit={true} handleClose={handleClose} currentUser={selectedUser} /> 
          </NotistackProvider>
          :
          <NotistackProvider>
            <RemoveParticipantDialog open={open} handleClose={handleClose} /> 
          </NotistackProvider>
        }
        
      </Scrollbar>
    </Box>
  );
};

DetailList.defaultProps = {
  add: true,
  edit: true,
  search: true,
  avatarSize: 50,
};
