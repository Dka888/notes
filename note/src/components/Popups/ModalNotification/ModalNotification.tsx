/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useState } from 'react';
import { Calendar } from 'react-calendar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-calendar/dist/Calendar.css';
import './ModalNotification.scss';
import { NoteType } from '../../../utils/Types';

interface NotificationModalProps {
  setOption: (option: null) => void;
  handleAddNotification:(data: Date) => void;
  setSelectedNote: (selectedNote: NoteType | null) => void,
}

export const ModalNotification: React.FC<NotificationModalProps> = ({ setOption, handleAddNotification, setSelectedNote }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);



  const setNotification = () => {
    if (selectedDate) {
      toast.success(`Przypomniene ustawione na ${selectedDate.toDateString()}`);
      handleAddNotification(selectedDate);
      setTimeout(() => {
        setSelectedNote(null);
        setOption(null);
      }, 4000);
    } else {
      toast.error('Coś poszło nie tak');
    }
  };

  const handleCloseModal = useCallback(() => {
    setSelectedNote(null);
    setOption(null)
}, [setOption, setSelectedNote]);


console.log(selectedDate);

  return (
    <div className="notification">
      <div className="notification-content">
        <Calendar onChange={setSelectedDate as any} value={selectedDate} />
        <button onClick={setNotification}>Set Notification</button>
        <button onClick={handleCloseModal}>Close</button>
      </div>
      <ToastContainer />
    </div>
  )
};

