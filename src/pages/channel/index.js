// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';

import { GroupListContainer } from '../../components/GroupListContainer'
// hooks
import useResponsive from '../../hooks/useResponsive';

import { Grid, Box, Divider, Typography, Container } from '@mui/material'

import { useTheme } from '@mui/material/styles';

import { AvtarMenuItem } from '../../components/AvtarMenuItem'

import { styled } from '@mui/material/styles'

import { MotionContainer, varBounce } from '../../components/animate';
import { m } from 'framer-motion';

import SeoIllustration from '../../assets/illustration_seo'
import useAuth from '../../hooks/useAuth'

Channel.getLayout = function getLayout(page) {
    return <Layout title="Notify">{page}</Layout>;
};

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100%',
  justifyContent: "center",
  alignItems: 'center',
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(10),
}));

export default function Channel() {
    const { user } = useAuth();
    
    const handleToggleContentSidebar = () => setMainContentSidebar((prev) => !prev);
    
    const theme = useTheme();

    const isDesktop = useResponsive('up', 'md');
    return (
      <Page title="Dashboard">
          <Grid container spacing={0}>
          <Grid item xs={12} md={4} lg={3}>
        
          <Box sx={{ borderRightStyle: "solid", borderColor: theme.palette.divider, borderWidth: 1, backgroundColor: theme.palette.background.default, height:"100vh" }}>
        
            <AvtarMenuItem avatar="" primaryText="Shree Ram" secondaryText="My Account" />
 
            <Divider sx={{ m: "0 !important", }}/>

            <GroupListContainer listTitle="Channels" add={false} contentHeight={isDesktop ? "80vh" : "100vh"} openGroupContent={handleToggleContentSidebar} />

          </Box>
          
        </Grid>

        <Grid item xs={12} md={8} lg={9}>
        {isDesktop &&
        
        <RootStyle>
        <Container component={MotionContainer}>
       
        <Box sx={{ margin: 'auto', textAlign: 'center' }}>
            <m.div variants={varBounce().in}>
              <SeoIllustration sx={{ height: 300, my: { xs: 5, sm: 10 } }} />
            </m.div>
            <m.div variants={varBounce().in}>
              <Typography variant="h3" paragraph>
                Notify, Reach More People!
              </Typography>
            </m.div>
            <Typography sx={{ color: 'text.secondary' }}>
              Send scheduled messages to so many people together.
            </Typography>
          </Box>
          </Container>
        </RootStyle>
       }
        </Grid>
          </Grid>

      </Page>
    );
  }