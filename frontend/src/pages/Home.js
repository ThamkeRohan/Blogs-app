import { Link } from "react-router-dom";
import NoteCard from "../component/NoteCard";
import { useNotesContext } from "../hooks/useNotesContext";
import ReactSelect from "react-select";
import { useMemo, useState } from "react";
import EditTagsModal from "../component/EditTagsModal";
const Home = () => {
  const [title, setTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const { notesWithTags, tags } = useNotesContext();
  const [showEditModal, setShowEditModal] = useState(false);

  const filteredNotes = useMemo(() => {
    return notesWithTags.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) => {
            return note.noteTags.some((noteTag) => noteTag._id === tag._id);
          }))
      );
    });
  }, [title, selectedTags, tags]);
  return (
    <div>
      <header>
        <h1>NotesBuddy</h1>
        <nav>
          <Link to="/new">
            <button>Create</button>
          </Link>

          <button
            onClick={() => {
              setShowEditModal(true);
            }}
          >
            Edit Tags
          </button>
        </nav>
      </header>
      <form>
        <label>Title :</label>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label>Tags :</label>
        <ReactSelect
          options={tags.map((tag) => {
            return { value: tag._id, label: tag.label };
          })}
          value={selectedTags.map((tag) => {
            return { value: tag._id, label: tag.label };
          })}
          isMulti
          onChange={(tags) => {
            setSelectedTags(
              tags.map((tag) => {
                return { _id: tag.value, label: tag.label };
              })
            );
          }}
        />
      </form>
      <section>
        {filteredNotes.map((note) => (
          <NoteCard {...note} key={note._id} />
        ))}
      </section>
      <EditTagsModal
        show={showEditModal}
        closeModal={() => {
          setShowEditModal(false);
        }}
      />
    </div>
  );
};

export default Home;
