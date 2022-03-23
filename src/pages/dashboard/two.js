import { Box } from '@mui/material';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
import UserNewForm from '../../sections/@dashboard/user/UserNewForm'
import NotistackProvider from '../../components/NotistackProvider'
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// hooks
import useResponsive from '../../hooks/useResponsive';

// ----------------------------------------------------------------------

PageTwo.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function PageTwo() {

  const isDesktop = useResponsive('up', 'md');

  return (
    <Page title="Update Channel">
      
     
      <Box sx={{ px: isDesktop ? 12 : "", paddingTop: isDesktop? 10 : 0 }}>
      {isDesktop && 
        <HeaderBreadcrumbs
        heading="Update Channel Settings"
        links={[
          { name: 'Dashboard', href: PATH_DASHBOARD.root },
          { name: 'Edit Channel' },
        ]}
      />
      }
        <NotistackProvider>
          <UserNewForm />
        </NotistackProvider>
        </Box>
    
    </Page>
  );
}
