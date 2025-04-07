import React, { useState } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/Components/_datemodal.scss";

Modal.setAppElement("#root");

interface ReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReminderModal: React.FC<ReminderModalProps> = ({ isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.target.value.split(":").map(Number);
    if (selectedDate) {
      const updated = new Date(selectedDate);
      updated.setHours(hours);
      updated.setMinutes(minutes);
      setSelectedDate(updated);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="reminder-modal"
      overlayClassName="modal-overlay"
    >
      <h2 className="modal-title">Reminder</h2>
      <div className="datetime-wrapper">
        <div className="picker-block">
          <label>DATE</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date as Date)} // fix error
            inline
          />
        </div>
        <div className="picker-block">
          <label>TIME</label>
          <input
            type="time"
            value={selectedDate?.toISOString().substring(11, 16)}
            onChange={handleTimeChange}
          />
        </div>
        <div className="options">
          <button onClick={() => setSelectedDate(new Date(Date.now() + 86400000))}>Tomorrow</button>
          <button onClick={() => setSelectedDate(new Date(Date.now() + 7 * 86400000))}>Next week</button>
          <button>Someday</button>
          <button>Recurring</button>
        </div>
      </div>
      <div className="modal-footer">
        <button onClick={onClose}>Cancel</button>
        <button onClick={() => {
          console.log("Set date:", selectedDate);
          onClose();
        }}>Set</button>
      </div>
    </Modal>
  );
};

export default ReminderModal;
