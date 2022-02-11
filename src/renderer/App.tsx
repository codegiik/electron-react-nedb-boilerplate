import { useEffect, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import { getBooks, insertBook } from './utils';

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
            const result = await insertBook({
              name: 'prova',
              author: 'Giggino',
              isbn: '12123',
            });
            await updateBooks();
          }}
        >
          insert Simple Book
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
