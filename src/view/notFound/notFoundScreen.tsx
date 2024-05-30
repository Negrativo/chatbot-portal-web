import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundScreen = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>404</h1>
      <p style={styles.paragraph}>Pagina não encontrada.</p>
      <Link to="/login" style={styles.link}>
        IR PARA LOGIN
      </Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center' as const,
    padding: '50px',
  },
  header: {
    fontSize: '72px',
    fontWeight: 'bold',
  },
  paragraph: {
    fontSize: '24px',
  },
  link: {
    display: 'inline-block',
    marginTop: '20px',
    fontSize: '18px',
    padding: '10px 20px',
    color: '#FFFFFF',
    backgroundColor: '#007bff',
    borderRadius: '5px',
    textDecoration: 'none',
  },
};

export default NotFoundScreen;
