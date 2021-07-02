import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { noteLogout, startNewNote } from '../../actions/notes';
import { Loading } from '../Loading';
import { JournaEntries } from './JournaEntries'

export const Sidebar = () => {

  const dispatch = useDispatch();
  const { name } = useSelector(state => state.auth);
  const { loading } = useSelector(state => state.ui);

  const handleLogout = () => {
    dispatch(startLogout());
    dispatch(noteLogout());
  }

  const handleAddNote = () => {
    dispatch(startNewNote());
  }

  return (
    <aside className="journal__sidebar animate__animated animate__fadeInLeft animate__faster">
      <div className="journal__sidebar-navbar">
        <h3 className="mt-5">
          <i className="far fa-moon"></i>
          <span> {name}</span>
        </h3>
        <button
          className="btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div className="journal__new-entry"
        onClick={handleAddNote}
      >
        <i className="far fa-calendar-plus fa-5x"></i>
        <p className="mt-5">
          New Entry
        </p>
      </div>

      <JournaEntries />

    </aside>
  )
}
