import React, {  useContext, useEffect, useState } from 'react';
import { Paper, Typography,  List, ListItem, ListItemText} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext';
import { UserContext } from '../../context/UserContext';
import { buscarConversas } from '../../services/dashboardService';
import { Chat } from '../../interfaces/Conversas';
import CircularProgress from '@mui/material/CircularProgress';

type Props = {
};

const Dashboard: React.FC<Props> = (props) => {
  const { triggerNotification } = useNotification();
  const { user } = useContext(UserContext);
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
    if (!user) {
      navigate('/login');
      return;
    }

    const loadChats = async () => {
      setIsLoading(true);
      try {
        const data = await buscarConversas();
        setChats(data.chats);
      } catch (error) {
        triggerNotification('Erro ao buscar conversas!', 'error');
        console.error('Erro ao buscar conversas:', error);
      } finally {
        setIsLoading(false);  // Desativa o indicador de loading
      }
    };

    loadChats();
  }, [triggerNotification, user, navigate]);

  return (
    <div className="container">
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Typography>Bem Vindo {user?.name}!</Typography>
        {isLoading ? (
          <div className="loadingContainer">
            <CircularProgress />
            <Typography>Buscando conversas</Typography>
          </div>
        ) : (
          chats.length > 0 ? (
            <List>
              {chats.map((chat: Chat) => (
                <ListItem key={chat.id} button onClick={() => navigate(`/chat/${chat.id}`)}>
                  <ListItemText primary={chat.name} secondary={`Última atualização: ${new Date(chat.updatedAt).toLocaleString()}`} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>Não foram encontradas conversas recentes.</Typography>
          )
        )}
      </Paper>
    </div>
  );
  
};

export default Dashboard;
