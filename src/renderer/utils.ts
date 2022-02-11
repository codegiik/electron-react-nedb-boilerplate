import { Book } from 'main/schemas/bookSchema';

export async function insertBook(book: Book) {
  return window.electron.ipcRenderer.invoke('store-library', book);
}

export async function getBooks(query = {}) {
  return window.electron.ipcRenderer.invoke('read-library', query);
}
