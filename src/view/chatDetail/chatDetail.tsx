import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper } from '@mui/material';
import api from '../../services/api';
import { Chat } from '../../interfaces/Conversas';

const ChatDetails = () => {
  const { chatId } = useParams();
  const [chatDetails, setChatDetails] = useState<Chat | null>(null);

  useEffect(() => {
    const fetchChatDetails = async () => {
      try {
        const response = await api.get(`/chat/detalhes/${chatId}`);
        setChatDetails(response.data);
      } catch (error) {
        console.error('Erro ao buscar detalhes do chat:', error);
      }
    };

    fetchChatDetails();
  }, [chatId]);

  if (!chatDetails) {
    return <Typography>Carregando...</Typography>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h5">{chatDetails.name}</Typography>
        <Typography color="text.secondary">{`ID: ${chatDetails.id}`}</Typography>
        <Typography color="text.secondary">{`Admin: ${chatDetails.adminId}`}</Typography>
        <Typography color="text.secondary">{`Sessão: ${chatDetails.sessionId}`}</Typography>
        <Typography color="text.secondary">{`Criado em: ${new Date(chatDetails.createdAt).toLocaleString()}`}</Typography>
        <Typography color="text.secondary">{`Última atualização: ${new Date(chatDetails.updatedAt).toLocaleString()}`}</Typography>
      </Paper>
    </Box>
  );
};

export default ChatDetails;
