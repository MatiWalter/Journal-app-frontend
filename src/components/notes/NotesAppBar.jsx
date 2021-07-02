import React, { useRef   } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import dayjs from "dayjs";
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {

  const dispatch = useDispatch();
  const { active: note } = useSelector(state => state.notes);
  
  const day = dayjs(new Date);
  dayjs.extend(LocalizedFormat)
  const date = day.format('LL');
  
  
  const handleSave = () => {
    dispatch(startSaveNote(note));
  }
  
  const handlePictureClick = () => {
    inputFile.current.click();
  }
  
  const inputFile = useRef(null);
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(startUploading(file));
      inputFile.current.value = '';
    }
  }

  return (
    <div className="notes__appbar">
      <span>{date}</span>
      <input
        id="fileSelector"
        type="file"
        name="file"
        ref={inputFile}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <div>
        <button
          className="btn"
          onClick={handlePictureClick}
        >
          Picture
        </button>
        <button
          className="btn"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  )
}
