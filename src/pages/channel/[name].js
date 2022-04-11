// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';  
// @mui
import { styled } from '@mui/material/styles';
// ----------------------------------------------------------------------
import { Divider, Stack, Typography, Avatar, Button, Paper, Box, Drawer } from '@mui/material';
// _mock_
import { _userList } from '../../_mock';
// components
import {GroupListContainer} from '../../components/GroupListContainer'
import { DetailList} from '../../components/NormalList'
// ----------------------------------------------------------------------
import {useState} from 'react'

import { AvtarMenuItem } from '../../components/AvtarMenuItem'

import Iconify from '../../components/Iconify';
import { IconButtonAnimate } from '../../components/animate';
import RHFEditor from '../../components/hook-form/RHFEditor'
import Scrollbar from '../../components/Scrollbar';
import Link from 'next/link'
import { useRouter } from 'next/router';

import { channels } from '../../_mock/channels'

import { paramCase } from 'change-case';

PageOne.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

import ChannelNotFound from '../../components/ChannelNotFound';

// hooks
import useResponsive from '../../hooks/useResponsive';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode == "light" ? theme.palette.grey[100] : theme.palette.grey[800],
}));

const SIDEBAR_WIDTH = "100%";

export default function PageOne() {

  const { query } = useRouter();
  
  const { name } = query;
  
  const currentChannel = channels.find(channel => paramCase(channel.name) == name)

  if (!currentChannel){
    return <ChannelNotFound />
  }

  const [openSidebar, setOpenSidebar] = useState(false);

  const [openMainContentSidebar, setMainContentSidebar] = useState(false);
  
  const handleCloseSidebar = () => setOpenSidebar(false);
  const handleToggleSidebar = () => setOpenSidebar((prev) => !prev);
  
  const handleCloseContentSidebar = () => setMainContentSidebar(false);
  const handleToggleContentSidebar = () => setMainContentSidebar((prev) => !prev);
  
  const isDesktop = useResponsive('up', 'md');
  const isCollapse = isDesktop && !openSidebar;

  const theme = useTheme();
  
  const renderGroupDetails = ( <Box>
    <Stack sx={{ pt:3 , px: "20px", pb: 6 }}>
     {!isDesktop && (
     <Box style={{ display: "flex", justifyContent: "space-between" }}>
       <Box>
         <IconButtonAnimate onClick={handleToggleSidebar}>
           <Iconify icon={'dashicons:arrow-left-alt2'} width={22} height={22} />
         </IconButtonAnimate>
       </Box>
      </Box>
     )}

      <Box style={{ display: "flex", justifyContent:"flex-end" }}>
      <Link href={`/channel/${paramCase(currentChannel.name)}/edit`}>
        <IconButtonAnimate>
          <Iconify icon={'carbon:settings'} width={22} height={22} />
        </IconButtonAnimate>
      </Link>
      </Box>
     
     <Stack alignItems="center">  
       <Avatar src={currentChannel.coverPhoto} sx={{ width: 80, height: 80, mb: 1 }}  />
       <Typography variant='h6'>{currentChannel.name}</Typography>
       <Typography variant='body2'>248 Messages Sent!</Typography>
     </Stack>
     
   </Stack>
    <Divider sx={{ m: "0 !important", }}/>
  
    <DetailList avatarSize={40} listTitle="Participants" data={currentChannel.participants} showLength={true} edit={false} contentHeight="65vh" />

  </Box>
  )

  const renderGroupContent = (
    <Scrollbar sx={{ height: "100vh", backgroundColor: theme.palette.mode == "light" ? theme.palette.grey[100] : theme.palette.grey[800] }}>
    <Item>
    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py:2, px: isDesktop ? 3 : .8, borderBottomStyle: "solid", borderColor: theme.palette.divider, borderWidth:1 }}>
    {isDesktop ? (
        <Typography sx={{ fontWeight: 550 }}>{currentChannel.name}</Typography>
    ):
      <Box sx={{ display:"flex", alignItems:"center" }}>
         <IconButtonAnimate onClick={handleToggleContentSidebar} sx={{ mr:.2 }}>
           <Iconify icon={'dashicons:arrow-left-alt2'} width={22} height={22} />
         </IconButtonAnimate>

         <Avatar src={currentChannel.coverPhoto} sx={{ height:30, width:30, mr:1 }}></Avatar>

        <Typography sx={{ fontWeight: 550 }} onClick={handleToggleSidebar}>{currentChannel.name}</Typography>
      </Box>
    }
        <Box>
            <IconButtonAnimate>
              <Iconify icon={'ic:twotone-alternate-email'} width={22} height={22} />
            </IconButtonAnimate>
    
            <IconButtonAnimate>
              <Iconify icon={'ion:logo-whatsapp'} width={22} height={22} />
            </IconButtonAnimate>

            <IconButtonAnimate>
              <Iconify icon={'ant-design:message-outlined'} width={22} height={22} />
            </IconButtonAnimate>
        </Box>
    </Stack>

    <Stack sx={{ p:3, mt:3 }}>
      <Typography variant="caption" sx={{ color: theme.palette.grey[500] }}>{currentChannel.createdAt}</Typography>
      <Typography variant="h3">Message From Banke Bihari</Typography>
      
      <Stack direction="row" alignItems="center" sx={{ columnGap: 1, my:3, mb:2 }}>
        <Avatar src="https://images.unsplash.com/photo-1642752924969-24e2b96a7108?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" sx={{ height:30, width:30 }}></Avatar>
        <Typography variant="subtitle2">Shree Krishna</Typography>
      </Stack>

      <Typography variant="body2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis voluptates laborum vero consequatur iste in inventore mollitia rerum animi dolorem, eum laboriosam veritatis sit commodi asperiores? Nam ratione sint a ipsum architecto, at molestias quis? Harum voluptatum dicta cupiditate possimus recusandae. Eveniet, porro fuga soluta perferendis quam numquam aut amet, qui vero molestiae doloribus ea suscipit nisi voluptate illum, maiores voluptatem nihil vitae corporis! Molestiae consequatur quos excepturi tempore cupiditate ducimus magni, laboriosam nesciunt rem praesentium quia accusamus numquam deleniti enim eveniet animi perspiciatis nulla! Ex in, nostrum veniam eaque, quis tempore vel at amet asperiores distinctio rem est a.</Typography>

      <Box mt={4} sx={{ borderStyle: "solid", borderColor: theme.palette.divider, borderWidth:1, borderRadius: 2, backgroundColor: theme.palette.background.default }}>
        <RHFEditor simple name="description" />
      </Box>
      <Box sx={{ justifyContent:"flex-end", display:"flex" }}>
          <Button sx={{ mt: 2 }} variant='contained'>Save Changes</Button>
      </Box>
    </Stack>
    </Item>
  </Scrollbar>

  )

  return (
    <Page title="Dashboard">
  
      <Grid container spacing={0}>
        <Grid item xs={12} md={4} lg={3}>
          <Item>
          <Box sx={{ borderRightStyle: "solid", borderColor: theme.palette.divider, borderWidth: 1, backgroundColor: theme.palette.background.default }}>

            <AvtarMenuItem avatar="https://images.unsplash.com/photo-1642752924969-24e2b96a7108?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" primaryText="Shree Krishna" secondaryText="My Account" />

            <Divider sx={{ m: "0 !important", }}/>

            <GroupListContainer listTitle="Channels" add={false} contentHeight={isDesktop ? "80vh" : "100vh"} openGroupContent={handleToggleContentSidebar} />

          </Box>
          </Item>
        </Grid>
        <Grid item xs={12} md={4} lg={6}>
        <Item>
        {isDesktop ? (
        <Drawer
          open={openMainContentSidebar}
          variant="persistent"
          sx={{
            transition: theme.transitions.create('width'),
            '& .MuiDrawer-paper': {
              position: 'static',
            },
            ...(isCollapse && {
              '& .MuiDrawer-paper': {
                position: 'static',
                transform: 'none !important',
                visibility: 'visible !important',
              },
            }),
          }}
        >
          {renderGroupContent}
        </Drawer>
      ) : (
        <Drawer
          anchor="right"
          ModalProps={{ keepMounted: true }}
          open={openMainContentSidebar}
          onClose={handleCloseContentSidebar}
          sx={{
            '& .MuiDrawer-paper': { width: SIDEBAR_WIDTH },
          }}
        >
           {renderGroupContent}
        </Drawer>
      )}
         </Item>
        </Grid>
        <Grid item xs={12} md={4} lg={3} sx={{ borderLeftStyle: "solid", borderColor: theme.palette.divider, borderWidth:1 }} >
        <Item>
        {isDesktop ? (
        <Drawer
          open={openSidebar}
          variant="persistent"
          sx={{
     
            transition: theme.transitions.create('width'),
            '& .MuiDrawer-paper': {
              position: 'static',
            },
            ...(isCollapse && {
              '& .MuiDrawer-paper': {
                position: 'static',
                transform: 'none !important',
                visibility: 'visible !important',
              },
            }),
          }}
        >
          {renderGroupDetails}
        </Drawer>
      ) : (
        <Drawer
          anchor="right"
          ModalProps={{ keepMounted: true }}
          open={openSidebar}
          onClose={handleCloseSidebar}
          sx={{
            '& .MuiDrawer-paper': { width: SIDEBAR_WIDTH },
          }}
        >
           {renderGroupDetails}
        </Drawer>
      )}
          </Item>
        </Grid>
      </Grid>
    </Page>
  );
}
