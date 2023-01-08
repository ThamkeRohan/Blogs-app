import { useContext } from "react";
import { NotesContext } from "../context.js/NotesContextProvider";
export const useNotesContext = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("Cannot use NotesContext outside the provider");
  }
  return context;
};
