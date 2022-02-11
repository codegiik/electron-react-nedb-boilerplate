import { useEffect, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import { getBooks, insertBook, removeBooks } from './utils';

const Hello = () => {
  const [books, setBooks] = useState();

  async function updateBooks() {
    const result = await getBooks();
    setBooks(result);
  }

  useEffect(() => {
    updateBooks();
  }, []);

  return (
    <div>
      <div className="Hello">
        <img width="200px" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
      <div className="Hello">
        <button
          type="button"
          onClick={async () => {
            await insertBook({
              name: 'prova',
              author: 'Giggino',
              isbn: '12123',
            });
            await updateBooks();
          }}
        >
          insert Simple Book
        </button>
        <button
          type="button"
          onClick={async () => {
            await removeBooks();
            await updateBooks();
          }}
        >
          Reset Library
        </button>
        {JSON.stringify(books)}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
