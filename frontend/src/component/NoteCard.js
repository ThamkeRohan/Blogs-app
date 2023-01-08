import { Link } from "react-router-dom";
const NoteCard = ({ title, noteTags, _id }) => {
  return (
    <Link to={`/${_id}`}>
      <section>
        <div>{title}</div>
        <div>
          {noteTags.map((tag) => {
            return <span key={tag._id}>{tag.label}</span>;
          })}
        </div>
      </section>
    </Link>
  );
};

export default NoteCard;
