import React from 'react'

import { Box, Container, Typography, Button } from '@mui/material';

import { m } from 'framer-motion';
// next/link
import NextLink from 'next/link';

import Page from './Page';

import { MotionContainer, varBounce } from './animate';
// assets
import { PageNotFoundIllustration } from '../assets';
// @mui
import { styled } from '@mui/material/styles';

const RootStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(10),
  }));
  
const ChannelNotFound = () => {
  return (
    <Page title="404 Channel Not Found" sx={{ height: 1 }}>
    <RootStyle>
      <Container component={MotionContainer}>
        <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
          <m.div variants={varBounce().in}>
            <Typography variant="h3" paragraph>
              Sorry, channel not found!
            </Typography>
          </m.div>
          <Typography sx={{ color: 'text.secondary' }}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check
            your spelling.
          </Typography>
          <m.div variants={varBounce().in}>
            <PageNotFoundIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
          </m.div>
          <NextLink href="/">
            <Button size="large" variant="contained">
              Go to Home
            </Button>
          </NextLink>
        </Box>
      </Container>
    </RootStyle>
    </Page>
  )
}

export default ChannelNotFound