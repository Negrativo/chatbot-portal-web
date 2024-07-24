import { createTheme } from '@mui/material/styles';

// Definindo o tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50', // Cor primária
    },
    secondary: {
      main: '#FF5722', // Cor secundária
    },
  },
  typography: {
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 700,
    },
    // Adicione mais estilos de tipografia conforme necessário
  },
  mixins: {
    toolbar: {
      minHeight: 64, // Altura mínima para a toolbar
    },
  },
  // Você pode adicionar mais configurações aqui, como breakpoints, spacing, etc.
});

export default theme;
