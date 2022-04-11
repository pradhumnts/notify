import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, AppBar, Toolbar, Typography, Divider } from '@mui/material';
// hooks
import useOffSetTop from '../../../hooks/useOffSetTop';
import useResponsive from '../../../hooks/useResponsive';
// utils
import { useRouter } from 'next/router';
import cssStyles from '../../../utils/cssStyles';
// config
import { HEADER, NAVBAR } from '../../../config';
// components
import Logo from '../../../components/Logo';
import Iconify from '../../../components/Iconify';
import { IconButtonAnimate } from '../../../components/animate';
import { useTheme } from '@mui/material/styles';
// ----------------------------------------------------------------------
import LanguagePopover from './LanguagePopover';


const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'isCollapse' && prop !== 'isOffset' && prop !== 'verticalLayout',
})(({ isCollapse, isOffset, verticalLayout, theme }) => ({
  ...cssStyles(theme).bgBlur(),
  boxShadow: 'none',
  height: HEADER.MOBILE_HEIGHT,
  zIndex: theme.zIndex.appBar + 1,

  transition: theme.transitions.create(['width', 'height'], {
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('lg')]: {
    height: HEADER.DASHBOARD_DESKTOP_HEIGHT,
    width: `calc(100% - (100 + 1)px)`,
    ...(isCollapse && {
      width: `calc(100% - ${NAVBAR.DASHBOARD_COLLAPSE_WIDTH}px)`,
    }),
    ...(isOffset && {
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
    }),
    ...(verticalLayout && {
      width: '100%',
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
      backgroundColor: theme.palette.background.default,
    }),
  },
}));

// ----------------------------------------------------------------------

DashboardHeader.propTypes = {
  isCollapse: PropTypes.bool,
  onOpenSidebar: PropTypes.func,
  verticalLayout: PropTypes.bool,
};

export default function DashboardHeader({ isCollapse = false, verticalLayout = false, title = "" }) {
  const { pathname, route } = useRouter();

  const theme = useTheme();

  const isOffset = useOffSetTop(HEADER.DASHBOARD_DESKTOP_HEIGHT) && !verticalLayout;

  const isDesktop = useResponsive('up', 'lg');
  
  
  return (
    <RootStyle isCollapse={isCollapse} isOffset={isOffset} verticalLayout={verticalLayout}>
      <Toolbar
        sx={{
          minHeight: '100% !important',
          px: 2,
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        {!pathname === "/channel" && 
        <IconButtonAnimate sx={{ mr: 1 }}>
          <Iconify icon={'eva:arrow-back-outline'} color={theme.palette.primary.main} width={22} height={22} />
        </IconButtonAnimate>
       }
        {!isDesktop && <Logo sx={{ mr: 1.5 }} />}
        
        <Typography variant="h6" sx={{ color: theme.palette.primary.main, textAlign: 'center' }}>{title}</Typography>
        
        <LanguagePopover />
      </Toolbar>

      <Divider sx={{ m: "0 !important", }}/>

    </RootStyle>
  );
}
