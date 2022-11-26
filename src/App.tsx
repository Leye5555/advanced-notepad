import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Container } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './App.css';
import NewNote from './components/NewNote';
import { useLocalStorage } from './hooks/useLocalStorage';

export interface NoteData {
  title: string;
  markdown: string;
  tags: Tag[];
}

export interface Note extends NoteData {
  id: string;
}

export type Tag = {
  id: string;
  label: string;
};

export type RawNote = {
  id: string;
};

export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};
function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', []);
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', []);

  return (
    <Container className="my-4">
      <Router>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/notes/:id">
            <Route index element={<h1>show</h1>} />
            <Route path="edit" element={<h1>Edit</h1>} />
          </Route>
          <Route path="/new" element={<NewNote />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
