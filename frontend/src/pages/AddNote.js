import NoteForm from "./NoteForm";
import { useNotesContext } from "../hooks/useNotesContext";
const AddNote = () => {
  const { addNote } = useNotesContext();
  return (
    <div>
      <h2>New Note</h2>
      <NoteForm onSubmit={addNote} />
    </div>
  );
};

export default AddNote;
