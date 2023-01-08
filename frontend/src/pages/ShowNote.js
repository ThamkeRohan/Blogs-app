import { useNotesContext } from "../hooks/useNotesContext";
import { useParams, Link, useHistory } from "react-router-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
const ShowNote = () => {
  const { _id } = useParams();
  const history = useHistory();
  const { notesWithTags, deleteNote } = useNotesContext();
  const note = notesWithTags.find((note) => {
    return note._id === _id;
  });
  return (
    <div>
      <header>
        <h2>{note.title}</h2>
        <div>
          <Link to={`/${_id}/edit`}>
            <button>Edit</button>
          </Link>

          <button
            onClick={() => {
              deleteNote(_id);
              history.push("/");
            }}
          >
            Delete
          </button>
          <Link to="..">
            <button>Back</button>
          </Link>
        </div>
      </header>
      <div>
        {note.noteTags &&
          note.noteTags.map((tag) => (
            <div className="badge" key={tag._id}>
              {tag.label}
            </div>
          ))}
      </div>
      <ReactMarkdown>{note.markdown}</ReactMarkdown>
    </div>
  );
};

export default ShowNote;
