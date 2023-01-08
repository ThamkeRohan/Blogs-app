import { useState } from "react";
import ReactDom from "react-dom";
import { useNotesContext } from "../hooks/useNotesContext";
const EditTagsModal = ({ show, closeModal }) => {
  const { tags, deleteTag, updateTag } = useNotesContext();
  const [tagLabel, setTagLabel] = useState("");
  if (!show) {
    return null;
  } else {
    return ReactDom.createPortal(
      <section>
        <header>
          <h2>Edit Tags</h2>
          <span className="material-symbols-outlined" onClick={closeModal}>
            close
          </span>
        </header>
        <form>
          {tags.map((tag) => {
            return (
              <div key={tag._id}>
                <input
                  type="text"
                  value={tag.label}
                  onChange={(e) => {
                    updateTag(tag._id, e.target.value);
                  }}
                />
                <span
                  className="material-symbols-outlined"
                  onClick={() => {
                    deleteTag(tag._id);
                  }}
                >
                  cancel
                </span>
              </div>
            );
          })}
        </form>
      </section>,
      document.body
    );
  }
  return;
};

export default EditTagsModal;
