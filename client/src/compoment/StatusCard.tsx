import React from 'react';

interface StatusCardProps {
  icon: React.ReactNode;
  count: string | number;
  title: string;
}

const StatusCard: React.FC<StatusCardProps> = ({ icon, count, title }) => {
  return (
    <div className="status-card shadow-sm p-3 mb-4 bg-white rounded">
      <div className="status-card__icon">{icon}</div>
      <div className="status-card__info">
        <h4>{count}</h4>
        <span>{title}</span>
      </div>
    </div>
  );
};

export default StatusCard;