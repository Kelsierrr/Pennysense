import React, { useEffect } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import './Notification.css';

export default function Notification({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="notification success">
      <FiCheckCircle className="notification-icon" />
      <span className="notification-message">{message}</span>
    </div>
  );
}