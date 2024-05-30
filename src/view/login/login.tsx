import React, { useState, useContext } from 'react';
import { Box, Grid, Paper, styled, TextField, BottomNavigation, BottomNavigationAction} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import { loginWeb } from '../../services/loginService';
import { useNotification } from '../../context/NotificationContext';
import { UserContext } from '../../context/UserContext';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));

type Props = {
};

const Login: React.FC<Props> = (props) => {
  const { triggerNotification } = useNotification();
  const { loginUser } = useContext(UserContext);

  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem('token');

  //   if (!!token) {
  //     navigate(`/dashboard`);
  //   }
  // }, [navigate]);

  const handleCodigoChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setLogin(event.target.value);
  };

  const handleSenhaChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSenha(event.target.value);
  };

  async function handleLoginWeb() {
    localStorage.removeItem('token');
    if (validaDados()) {
        console.log(1);
        const loginData = await loginWeb(login, senha);
        console.log(2);
        if (loginData.token) {
            if (!!loginData.adminData) {
              loginUser(loginData.adminData);  // Certifique-se que adminData existe
            }
            console.log(3);
            localStorage.setItem('token', loginData.token);
            triggerNotification('Logado com sucesso!', 'success');
            navigate(`/dashboard`);
        } else {
            console.log(4);
            const mensagem = loginData.message || 'Ocorreu um erro inesperado!';
            triggerNotification(mensagem, 'error');
        }
    }
}


  function validaDados() {
    if (!login) {
      triggerNotification('Insira o código de acesso para continuar.', 'warning');
      return false;
    }
    if (!senha) {
      triggerNotification('Insira a senha para continuar.', 'warning');
      return false;
    }
    return true;
  }

  return (
    <Container>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Box sx={{ display: 'grid', gap: '16px', marginBottom: '10px', padding: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField label="Código" value={login} onChange={handleCodigoChange} fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Senha" value={senha} onChange={handleSenhaChange} type="password" fullWidth />
            </Grid>
          </Grid>
        </Box>

        <BottomNavigation showLabels>
          <BottomNavigationAction label="Entrar" icon={<LoginRoundedIcon />} onClick={handleLoginWeb} />
        </BottomNavigation>
      </Paper>
    </Container>
  );
};

export default Login;
