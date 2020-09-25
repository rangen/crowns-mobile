import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: {
          light: '#6f74dd',
          main: '#e0f7fa',
          dark: '#00227b'
    },
    secondary: green
  },
  status: {
      danger: 'orange'
  }
});

export default theme;