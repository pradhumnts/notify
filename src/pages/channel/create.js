// layouts
import Layout from '../../layouts';
import { Box, Container } from '@mui/material';

// components
import Page from '../../components/Page';
import ChannelNewForm from '../../sections/channel/ChannelNewForm'

// routes
import { PATH_DASHBOARD } from '../../routes/paths';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

// hooks
import useResponsive from '../../hooks/useResponsive';

import { capitalCase } from 'change-case';

ChannelCreate.getLayout = function getLayout(page) {
    return <Layout title="Create New Channel">{page}</Layout>;
};    

export default function ChannelCreate() {
  
    const isDesktop = useResponsive('up', 'md');

    return (
      <Page title={`Update Channel`}>
            <Container sx={{ px: isDesktop ? 12 : "", paddingTop: isDesktop? 5 : 0, mt: isDesktop ? 0 : 12 }}>
              {isDesktop &&
                  <HeaderBreadcrumbs
                  heading={`Update ${capitalCase(name)} Settings`}
                  links={[
                    { name: 'Dashboard', href: PATH_DASHBOARD.root },
                    { name: "Create New Channel" },
                    ]}
                  />
              }
              <ChannelNewForm />
            </Container>
        </Page>
    )

}