import { createTheme } from '@material-ui/core/styles';

// Example Theme

export const Theme = createTheme({
  palette: {
    primary: {
      main: '#0277bd',
      light: '#58a5f0',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#000000'
    },
    text: {
      primary: 'rgba(0, 0, 0, 1)',
      primaryMediumEmphasis: 'rgba(0, 0, 0, 0.6)',
      secondary: 'rgba(255, 255, 255, 1)',
      secondaryMediumEmphasis: 'rgba(255, 255, 255, 0.6)'
    }
  },
  typography: {
    subtitle1: { fontWeight: 500 }
  }
});