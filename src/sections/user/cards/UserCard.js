import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Avatar, Divider, Typography, Stack } from '@mui/material';
// utils
import cssStyles from '../../../utils/cssStyles';
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import Image from '../../../components/Image';
// import SocialsButton from '../../../components/SocialsButton';
import SvgIconStyle from '../../../components/SvgIconStyle';
import axios from 'src/utils/axios';

// ----------------------------------------------------------------------

const OverlayStyle = styled('div')(({ theme }) => ({
  ...cssStyles().bgBlur({ blur: 2, color: theme.palette.primary.darker }),
  top: 0,
  zIndex: 8,
  content: "''",
  width: '100%',
  height: '100%',
  position: 'absolute',
}));

// ----------------------------------------------------------------------

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default function UserCard({ user }) {
  const [username, setUsername] = useState('')
  const [loggedIn, setLoggedIn] = useState(null)

  // useEffect(() => {
  //   fetch('http://localhost:8000/current_user/', {
  //     headers: {
  //       Authorization: `JWT ${localStorage.getItem('token')}`
  //     }
  //   })
  //     .then(res => res.json())
  //     .then(json => {
  //       // setUsername(json);
  //       console.log(json)
  //     });
  // }, [])
  console.log(username)
  const handleLogin = async () => {
    try{
      const data = {
        username: 'pradhumn',
        password: 'taylors@13',
      }
      fetch('http://127.0.0.1:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        localStorage.setItem('token', json.token);
        setUsername(json.user.username)
      });
    }catch(err) {
      console.log(err)
    }
  }

  const getChannels = async () => {
    try{
      const response = await axios.get("http://localhost:8000/channels/", {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      }
      )

      console.log(response)
    }
    catch(err){
      console.log(err)
    }
   
  }
  const { name, cover, position, follower, totalPost, avatarUrl, following } = user;

  return (
    <Card sx={{ textAlign: 'center' }}>
      <button onClick={handleLogin}>Login</button>
      <button onClick={getChannels}>Channels</button>
      <Box sx={{ position: 'relative' }}>
        <SvgIconStyle
          src="https://minimal-assets-api.vercel.app/assets/icons/shape-avatar.svg"
          sx={{
            width: 144,
            height: 62,
            zIndex: 10,
            left: 0,
            right: 0,
            bottom: -26,
            mx: 'auto',
            position: 'absolute',
            color: 'background.paper',
          }}
        />
        <Avatar
          alt={name}
          src={avatarUrl}
          sx={{
            width: 64,
            height: 64,
            zIndex: 11,
            left: 0,
            right: 0,
            bottom: -32,
            mx: 'auto',
            position: 'absolute',
          }}
        />
        <OverlayStyle />
        <Image src={cover} alt={cover} ratio="16/9" />
      </Box>

      <Typography variant="subtitle1" sx={{ mt: 6 }}>
        {name}
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {position}
      </Typography>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box sx={{ py: 3, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Follower
          </Typography>
          <Typography variant="subtitle1">{fShortenNumber(follower)}</Typography>
        </div>

        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Following
          </Typography>
          <Typography variant="subtitle1">{fShortenNumber(following)}</Typography>
        </div>

        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Total Post
          </Typography>
          <Typography variant="subtitle1">{fShortenNumber(totalPost)}</Typography>
        </div>
      </Box>
    </Card>
  );
}
