import { useState } from 'react';
// @mui
import { MenuItem, Stack, Link, useTheme } from '@mui/material';
// components
import Image from '../../../components/Image';
import MenuPopover from '../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate';
// next
import NextLink from 'next/link';
import { CHANNEL_DASHBORD } from '../../../routes/paths'

import Iconify from 'src/components/Iconify';
// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_USER = "user"

const LANGS = [
  {
    label: 'Create Channel',
    value: 'en',
    icon: 'fluent:add-12-regular',
    link: path(CHANNEL_DASHBORD, '/create')
  },
  {
    label: 'Account',
    value: 'de',
    icon: 'ant-design:user-outlined',
    link: path(ROOTS_USER, '/account')
  },
];

// ----------------------------------------------------------------------

export default function LanguagePopover() {

  const theme = useTheme();
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          ...(open && { bgcolor: 'action.selected' }),
        }}
      >
      <Iconify icon={'charm:menu-kebab'} width={22} height={22} />

      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          mt: 1,
          mr: 0.75,
          width: 180,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
          '& .css-19aokgc': { display: "none" }
        }}
      >
        <Stack spacing={0.2} >
          {LANGS.map((option) => (
            <MenuItem key={option.value} selected={option.value === LANGS[0].value} onClick={handleClose}>
               <IconButtonAnimate
                  sx={{
                    width: 40,
                    height: 40,
                  }}
                >
                <Iconify icon={option.icon} width={22} height={22} />

                </IconButtonAnimate>
              <NextLink href={option.link} passHref>
                    <Link variant="subtitle2" sx={{ color: theme.palette.text.secondary }}>{option.label}</Link>
                </NextLink>
            </MenuItem>
          ))}
        </Stack>
      </MenuPopover>
    </>
  );
}
