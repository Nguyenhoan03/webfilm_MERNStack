import React, { CSSProperties } from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  const styles: { [key: string]: CSSProperties } = {
    container: {
      textAlign: 'center' as const,
      marginTop: '50px',
      padding: '20px',
    },
    title: {
      fontSize: '96px',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    subtitle: {
      fontSize: '36px',
      marginBottom: '20px',
    },
    message: {
      fontSize: '18px',
      marginBottom: '30px',
    },
    homeLink: {
      fontSize: '18px',
      textDecoration: 'none',
      color: '#007bff',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <h2 style={styles.subtitle}>Page Not Found</h2>
      <p style={styles.message}>
        The page you are looking for might have been removed or is temporarily unavailable.
      </p>
      <Link to="/" style={styles.homeLink}>
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;