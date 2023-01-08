import CreatableReactSelect from "react-select/creatable";
import { useRef, useState } from "react";
import { useNotesContext } from "../hooks/useNotesContext";
import { v4 as uuid } from "uuid";
import ReactMarkdown from "react-markdown";
import { Link, useHistory } from "react-router-dom";
const NoteForm = ({
  defaultTitle = "",
  defaultMarkdown = "",
  defaultTags = [],
  onSubmit,
}) => {
  const { tags, addTag } = useNotesContext();
  const history = useHistory();
  const titleRef = useRef("");

  const [selectedTags, setSelectedTags] = useState(defaultTags);
  const [markdown, setMarkdown] = useState(defaultMarkdown);
  const handleSubmit = (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const tagIds = selectedTags.map((tag) => tag._id);
    onSubmit({ title, markdown, tagIds });
    history.push("/");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input type="text" ref={titleRef} defaultValue={defaultTitle} />
        <label>Tags</label>
        <CreatableReactSelect
          onCreateOption={(label) => {
            const newTag = { _id: uuid(), label };
            setSelectedTags((prevSelectedTags) => [
              ...prevSelectedTags,
              newTag,
            ]);
            addTag(newTag);
          }}
          options={tags.map((tag) => {
            return { value: tag._id, label: tag.label };
          })}
          value={selectedTags.map((tag) => {
            return { value: tag._id, label: tag.label };
          })}
          onChange={(tags) => {
            setSelectedTags(
              tags.map((tag) => {
                return { _id: tag.value, label: tag.label };
              })
            );
          }}
          isMulti
        />
        <label>Markdown</label>
        <textarea
          rows="30"
          cols="60"
          value={markdown}
          onChange={(e) => {
            setMarkdown(e.target.value);
          }}
        ></textarea>
        <label>Preview</label>
        <ReactMarkdown>{markdown}</ReactMarkdown>
        <br />
        <button type="submit">Save</button>
        <Link to="..">
          <button>Cancel</button>
        </Link>
      </form>
    </div>
  );
};

export default NoteForm;
