import { useState } from 'react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';

export default function App() {
  const [editBook, setEditBook] = useState(null);

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.logo}>📚 GraphQL Books CRUD</h1>
        <p style={styles.subtitle}>React • Node.js • MongoDB • GraphQL</p>
      </header>
      <main style={styles.main}>
        <BookForm editBook={editBook} onCancelEdit={() => setEditBook(null)} />
        <BookList onEdit={setEditBook} />
      </main>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', background: '#f0f2f5' },
  header: { background: '#4f46e5', color: '#fff', padding: '28px 0', textAlign: 'center' },
  logo: { fontSize: 28, fontWeight: 800, marginBottom: 6 },
  subtitle: { fontSize: 14, opacity: 0.85, letterSpacing: 1 },
  main: { maxWidth: 700, margin: '32px auto', padding: '0 16px' },
};
