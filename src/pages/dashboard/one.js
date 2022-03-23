// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';  
// @mui
import { alpha, styled } from '@mui/material/styles';
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


PageOne.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode == "light" ? theme.palette.grey[100] : theme.palette.grey[800],
}));

export default function PageOne() {
  
  return (
    <Page title="Dashboard">
  
    </Page>
  );
}
