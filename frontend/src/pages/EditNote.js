import { useParams } from "react-router-dom";
import { useNotesContext } from "../hooks/useNotesContext";
import NoteForm from "./NoteForm";
const EditNote = () => {
  const { _id } = useParams();

  const { updateNote, notesWithTags } = useNotesContext();
  const note = notesWithTags.find((note) => {
    return note._id === _id;
  });
  console.log(note);

  return (
    <>
      <h2>Edit Note :</h2>
      <NoteForm
        defaultTitle={note.title}
        defaultTags={note.noteTags}
        defaultMarkdown={note.markdown}
        onSubmit={(updatedNote) => {
          updateNote(_id, updatedNote);
        }}
      />
    </>
  );
};

export default EditNote;
