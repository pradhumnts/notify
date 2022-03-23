import PropTypes from 'prop-types';
import { Paper, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';


// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string,
};


export default function SearchNotFound({ searchQuery = '', ...other }) {
  const theme = useTheme();
  return searchQuery ? (
    <Paper
      {...other}
      sx={{
        height: '100%',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: "transparent",
        px: 5
      }}
    >
      <Typography gutterBottom align="center" variant="subtitle1">
        Not found
      </Typography>
      <Typography variant="body2" align="center">
        No results found for &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>. Try checking for typos or using complete words.
      </Typography>
    </Paper>
  ) : (
    <Typography variant="body2"> Please enter keywords</Typography>
  );
}
