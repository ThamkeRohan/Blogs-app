import { createContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { v4 as uuid } from "uuid";
export const NotesContext = createContext();
const NotesContextProvider = ({ children }) => {
  const [notes, setNotes] = useLocalStorage("NOTES", []);
  const [tags, setTags] = useLocalStorage("TAGS", []);
  const addTag = (newTag) => {
    setTags([...tags, newTag]);
  };
  const addNote = (newNote) => {
    setNotes([...notes, { _id: uuid(), ...newNote }]);
  };
  const updateNote = (_id, updatedNote) => {
    setNotes(
      notes.map((note) => {
        if (note._id === _id) {
          return { _id, ...updatedNote };
        } else {
          return note;
        }
      })
    );
  };
  const deleteNote = (_id) => {
    setNotes(
      notes.filter((note) => {
        return note._id !== _id;
      })
    );
  };
  const updateTag = (_id, label) => {
    setTags(
      tags.map((tag) => {
        if (tag._id === _id) {
          return { _id, label };
        } else {
          return tag;
        }
      })
    );
  };
  const deleteTag = (_id) => {
    setTags(
      tags.filter((tag) => {
        return tag._id !== _id;
      })
    );
  };
  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      const noteTags = tags.filter((tag) => {
        return note.tagIds.includes(tag._id);
      });
      return { ...note, noteTags };
    });
  }, [notes, tags]);

  return (
    <NotesContext.Provider
      value={{
        notes,
        tags,
        addTag,
        addNote,
        updateNote,
        deleteNote,
        updateTag,
        deleteTag,
        notesWithTags,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export default NotesContextProvider;
