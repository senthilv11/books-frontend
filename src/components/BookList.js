import { useQuery, useMutation } from '@apollo/client';
import { GET_BOOKS, DELETE_BOOK } from '../graphql/queries';

export default function BookList({ onEdit }) {
  const { loading, error, data } = useQuery(GET_BOOKS);

  const [deleteBook] = useMutation(DELETE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });

  if (loading) return <p style={styles.msg}>Loading books...</p>;
  if (error) return <p style={{ ...styles.msg, color: 'red' }}>Error: {error.message}</p>;

  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>Books ({data.books.length})</h2>
      {data.books.length === 0 ? (
        <p style={styles.msg}>No books yet. Add one above!</p>
      ) : (
        <div style={styles.list}>
          {data.books.map((book) => (
            <div key={book.id} style={styles.item}>
              <div style={styles.info}>
                <span style={styles.title}>{book.title}</span>
                <span style={styles.meta}>by {book.author} &nbsp;|&nbsp; {book.genre} &nbsp;|&nbsp; {book.year}</span>
              </div>
              <div style={styles.actions}>
                <button onClick={() => onEdit(book)} style={styles.editBtn}>Edit</button>
                <button
                  onClick={() => window.confirm('Delete this book?') && deleteBook({ variables: { id: book.id } })}
                  style={styles.deleteBtn}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  card: { background: '#fff', borderRadius: 10, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
  heading: { marginBottom: 16, color: '#333', fontSize: 20 },
  msg: { color: '#888', textAlign: 'center', padding: 20 },
  list: { display: 'flex', flexDirection: 'column', gap: 10 },
  item: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', border: '1px solid #e5e7eb', borderRadius: 8, background: '#fafafa' },
  info: { display: 'flex', flexDirection: 'column', gap: 4 },
  title: { fontWeight: 700, fontSize: 16, color: '#1f2937' },
  meta: { fontSize: 13, color: '#6b7280' },
  actions: { display: 'flex', gap: 8 },
  editBtn: { padding: '6px 16px', background: '#f59e0b', color: '#fff', border: 'none', borderRadius: 5, cursor: 'pointer', fontWeight: 600 },
  deleteBtn: { padding: '6px 16px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: 5, cursor: 'pointer', fontWeight: 600 },
};
