import React from 'react'
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes.js';
import dayjs from "dayjs";

import advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(advancedFormat);

export const JournalEntry = ({ id, date, title, body, url }) => {

  const dispatch = useDispatch();

  const note = {
    date: date,
    title: title,
    body: body,
    url: url
  }

  const handleActive = () => {
    dispatch(activeNote(id, note));
  }

  const day = dayjs(date);

  return (
    <div
      className="journal__entry pointer animate__animated animate__fadeIn animate__faster"
      onClick={handleActive}
    >
      <div className="journal__entry-left">
        {
          url &&
          <div
            className="journal__entry-picture"
            style={{
              backgroundSize: 'cover',
              backgroundImage: `url(${url})`
            }}
          ></div>
        }

        <div className="journal__entry-body">
          <p className="journal_entry-title">
            {title.substring(0,23)}
          </p>
          <p className="journal_entry-content">
            {body.substring(0, 110)}
          </p>
        </div>
      </div>

      <div className="journal__entry-right">
        <div className="journal__entry-date-box">
          <span>{day.format("dddd")}</span>
          <h4>{day.format("Do")}</h4>
        </div>
      </div>

    </div>
  )
}
