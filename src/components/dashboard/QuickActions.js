import React from 'react';
import { 
  PlusIcon,
  CalendarIcon,
  ChartBarIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import { io } from 'socket.io-client';

const QuickActions = ({ onAction }) => {
  const actions = [
    {
      label: 'Create Notice',
      description: 'Post a new announcement',
      icon: PlusIcon,
      color: 'var(--primary)',
      action: 'created a new notice'
    },
    {
      label: 'Schedule',
      description: 'Plan future notices',
      icon: CalendarIcon,
      color: 'var(--warning)',
      action: 'scheduled a notice'
    },
    {
      label: 'Analytics',
      description: 'View engagement stats',
      icon: ChartBarIcon,
      color: 'var(--success)',
      action: 'viewed analytics'
    },
    {
      label: 'Manage Users',
      description: 'User management',
      icon: UserGroupIcon,
      color: 'var(--secondary)',
      action: 'managed users'
    }
  ];

  const handleAction = (action) => {
    onAction && onAction(action);

    // Emit socket event to trigger dashboard refresh
    const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000');
    socket.emit('notice-update');
    socket.disconnect();
  };

  return (
    <section className="quick-actions-section">
      <h2>Quick Actions</h2>
      <div className="actions-grid">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              className="action-card slide-in"
              onClick={() => handleAction(action.action)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div 
                className="action-icon"
                style={{ backgroundColor: action.color }}
              >
                <Icon className="icon" />
              </div>
              <div className="action-content">
                <h3>{action.label}</h3>
                <p>{action.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default QuickActions;
