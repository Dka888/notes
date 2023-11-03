/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Calendar } from 'react-calendar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-calendar/dist/Calendar.css';
import './ModalNotification.scss';

interface NotificationModalProps {
  handleGetNotification: () => void;
}

export const ModalNotification: React.FC<NotificationModalProps> = ({ handleGetNotification }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);



  const setNotification = () => {
    if (selectedDate) {
      toast.success(`Notification set for ${selectedDate.toDateString()}`);
    } else {
      toast.error('Please select a date for the notification.');
    }
  };

  return (
    <div className="notification">
      <div className="notification-content">
        <Calendar onChange={setSelectedDate as any} value={selectedDate} />
        <button onClick={setNotification}>Set Notification</button>
        <button onClick={handleGetNotification}>Close</button>
      </div>
      <ToastContainer />
    </div>
  )
};

