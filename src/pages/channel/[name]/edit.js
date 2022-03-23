// layouts
import Layout from '../../../layouts';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';

// components
import Page from '../../../components/Page';
import ChannelNewForm from '../../../sections/channel/ChannelNewForm'

// Provider
import NotistackProvider from '../../../components/NotistackProvider'

// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

// hooks
import useResponsive from '../../../hooks/useResponsive';

import { channels } from '../../../_mock/channels'

import ChannelNotFound from '../../../components/ChannelNotFound';

import { paramCase, capitalCase } from 'change-case';

GroupEdit.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};    

export default function GroupEdit() {
  
    const isDesktop = useResponsive('up', 'md');

    const { query } = useRouter();
  
    const { name } = query;
    
    const currentChannel = channels.find((channel) => paramCase(channel.name) === name);
    
    if (!currentChannel){
      return <ChannelNotFound />
    }

    return (
      <Page title={`Update Channel`}>
            {!currentChannel && <ChannelNotFound />}
            
            {currentChannel && <Box sx={{ px: isDesktop ? 12 : "", paddingTop: isDesktop? 10 : 0 }}>
              {isDesktop && 
                  <HeaderBreadcrumbs
                  heading={`Update ${capitalCase(name)} Settings`}
                  links={[
                    { name: 'Dashboard', href: PATH_DASHBOARD.root },
                    { name: capitalCase(name) },
                    ]}
                  />
              }
                  <NotistackProvider>
                    <ChannelNewForm isEdit={true} currentChannel={currentChannel} />
                  </NotistackProvider>
                  </Box>}
        </Page>
    )

}