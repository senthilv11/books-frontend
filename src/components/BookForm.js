import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_BOOK, UPDATE_BOOK, GET_BOOKS } from '../graphql/queries';

const emptyForm = { title: '', author: '', genre: '', year: '' };

export default function BookForm({ editBook, onCancelEdit }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editBook) setForm({ title: editBook.title, author: editBook.author, genre: editBook.genre, year: editBook.year });
    else setForm(emptyForm);
  }, [editBook]);

  const [addBook, { loading: adding }] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });

  const [updateBook, { loading: updating }] = useMutation(UPDATE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const variables = { ...form, year: parseInt(form.year) };
    if (editBook) {
      await updateBook({ variables: { id: editBook.id, ...variables } });
      onCancelEdit();
    } else {
      await addBook({ variables });
    }
    setForm(emptyForm);
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>{editBook ? 'Edit Book' : 'Add New Book'}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {['title', 'author', 'genre'].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={handleChange}
            required
            style={styles.input}
          />
        ))}
        <input
          name="year"
          type="number"
          placeholder="Year"
          value={form.year}
          onChange={handleChange}
          required
          min="1000"
          max="2100"
          style={styles.input}
        />
        <div style={styles.btnRow}>
          <button type="submit" disabled={adding || updating} style={styles.btnPrimary}>
            {editBook ? (updating ? 'Updating...' : 'Update Book') : (adding ? 'Adding...' : 'Add Book')}
          </button>
          {editBook && (
            <button type="button" onClick={onCancelEdit} style={styles.btnSecondary}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

const styles = {
  card: { background: '#fff', borderRadius: 10, padding: 24, marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
  heading: { marginBottom: 16, color: '#333', fontSize: 20 },
  form: { display: 'flex', flexDirection: 'column', gap: 12 },
  input: { padding: '10px 14px', border: '1px solid #ddd', borderRadius: 6, fontSize: 15, outline: 'none' },
  btnRow: { display: 'flex', gap: 10, marginTop: 4 },
  btnPrimary: { padding: '10px 22px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 15, fontWeight: 600 },
  btnSecondary: { padding: '10px 22px', background: '#e5e7eb', color: '#333', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 15 },
};
