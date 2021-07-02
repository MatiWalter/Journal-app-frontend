import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NotesAppBar } from './NotesAppBar'
import { useForm } from '../../hooks/useForm';
import { activeNote, startDeleting } from '../../actions/notes';

export const NoteScreen = () => {

  const dispatch = useDispatch();
  const { active: note } = useSelector(state => state.notes);
  const [formValues, handleInputChange, reset] = useForm(note);
  const { title, body, id } = formValues;

  const activeId = useRef(note.id);
  const activeUrl = useRef(note.url);

  useEffect(() => {
    if (note.id != activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
    if (note.url !== activeUrl.current) {
      reset(note);
      activeUrl.current = note.url;
    }
  }, [note, reset]);

  useEffect(() => {
    dispatch(activeNote(formValues.id, { ...formValues }));
  }, [formValues, dispatch]);

  const handleDelete = () => {
    dispatch(startDeleting(id));
  }

  return (
    <div className="notes__main-content">
      <NotesAppBar />
      <div className="notes__content">
        <input
          type="text"
          placeholder="Some awesome title"
          className="notes__title-input"
          autoComplete="off"
          name="title"
          value={title}
          maxLength="50"
          onChange={handleInputChange}
        />

        <textarea
          placeholder="What happened today"
          className="notes__textarea"
          autoComplete="off"
          name="body"
          value={body}
          onChange={handleInputChange}
        ></textarea>

        {
          (note.url) &&
          <div className="notes__image">
            <img
              src={note.url}
              alt="note image"
            />
          </div>
        }

      </div>

      <button
        className="btn btn-danger"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  )
}
