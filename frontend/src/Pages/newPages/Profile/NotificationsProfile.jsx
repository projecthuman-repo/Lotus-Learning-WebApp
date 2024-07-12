import React, { useState } from 'react';
import { FaSortAlphaDownAlt, FaCog, FaBell, FaEnvelope, FaCheckCircle, FaUndo, FaTrashAlt, FaArrowLeft, FaArrowRight, FaPlus, FaPalette } from 'react-icons/fa';
import { IoMdSearch } from 'react-icons/io';
import { MdOpenInNew, MdOutlineClose } from 'react-icons/md';
import OnHoverExtraHud from '../../../components/OnHoverExtraHud';

const NotificationsProfile = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'message', message: 'New message from John', description: 'John sent you a new message.', isRead: false, timestamp: '2024-06-25 14:34', addedByTeacher: false, color: '#FDE68A', tags: [] },
    { id: 2, type: 'alert', message: 'Server Alert', description: 'Server is down.', isRead: false, timestamp: '2024-06-25 13:22', addedByTeacher: true, color: '#FECACA', tags: [] },
    { id: 3, type: 'update', message: 'Software Update', description: 'New update available.', isRead: false, timestamp: '2024-06-24 10:12', addedByTeacher: false, color: '#A7F3D0', tags: [] },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState({
    enableDesktopNotification: true,
    showTimestamp: true,
    showDescription: true,
    selectedColor: '#FDE68A', // Default color
  });
  const notificationsPerPage = 5;
  const [newNotificationMessage, setNewNotificationMessage] = useState('');
  const [newNotificationDescription, setNewNotificationDescription] = useState('');
  const [isAddedByTeacher, setIsAddedByTeacher] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [tags, setTags] = useState([]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleSortChange = () => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  const handleFilterChange = (filter) => setFilter(filter);

  const toggleReadStatus = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: !n.isRead } : n));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const addNotification = () => {
    const newNotification = {
      id: notifications.length + 1,
      type: 'message', // You can set the type dynamically based on user selection or default it to a specific type
      message: newNotificationMessage,
      description: newNotificationDescription,
      isRead: false,
      timestamp: new Date().toLocaleString(),
      addedByTeacher: isAddedByTeacher,
      color: settings.selectedColor, // Use the selected color from settings
      tags: [], // Initialize tags as empty array
    };
    setNotifications([newNotification, ...notifications]);
    setNewNotificationMessage(''); // Clear the input after adding notification
    setNewNotificationDescription(''); // Clear the description input after adding notification
    setIsAddedByTeacher(false); // Reset teacher flag
  };

  const handleNewNotificationChange = (e) => {
    setNewNotificationMessage(e.target.value);
  };

  const handleNewNotificationDescriptionChange = (e) => {
    setNewNotificationDescription(e.target.value);
  };

  const handleSaveSettings = (updatedSettings) => {
    setSettings(updatedSettings);
    setIsSettingsOpen(false); // Close settings modal after saving
  };

  const handleColorChangeForNotification = (id, color) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, color } : n));
  };

  const handleNewTagChange = (e) => {
    setNewTag(e.target.value);
  };

  const addTag = (id, tag) => {
    const updatedNotifications = notifications.map(n => {
      if (n.id === id) {
        return { ...n, tags: [...n.tags, tag] };
      }
      return n;
    });
    setNotifications(updatedNotifications);
    setNewTag('');
  };

  const filteredNotifications = notifications.filter(n => filter === 'all' || n.type === filter)
    .filter(n => n.message.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => sortOrder === 'asc' ? new Date(a.timestamp) - new Date(b.timestamp) : new Date(b.timestamp) - new Date(a.timestamp));

  const paginatedNotifications = filteredNotifications.slice((currentPage - 1) * notificationsPerPage, currentPage * notificationsPerPage);

  const totalPages = Math.ceil(filteredNotifications.length / notificationsPerPage);

  return (
    <div className='container mx-auto mt-8'>
      <div className='bg-white rounded-full flex justify-between items-center py-2 px-4 shadow-md'>
        <p className='font-semibold text-lg'>Notifications</p>
        <div className="flex items-center space-x-3 bg-red-400 w-[30px] h-[30px] justify-center rounded-full">
          <p className='text-lg font-semibold text-white'>{notifications.filter(n => !n.isRead).length}</p>
        </div>
      </div>
      <div className='flex justify-between items-center py-2 px-4 mt-3'>
        <div className='flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-1 shadow-sm'>
          <IoMdSearch />
          <input
            type='text'
            placeholder='Search notifications...'
            value={searchTerm}
            onChange={handleSearchChange}
            className='bg-gray-100 outline-none'
          />
        </div>
        <button onClick={handleSortChange} className='flex items-center space-x-1 bg-gray-100 rounded-full px-3 py-1 shadow-sm'>
          <FaSortAlphaDownAlt />
          <span>{sortOrder === 'asc' ? 'Sort Asc' : 'Sort Desc'}</span>
        </button>
      </div>
      <div className='flex justify-between items-center py-2 px-4 mt-3 space-x-2'>
        <button onClick={() => handleFilterChange('all')} className='flex items-center space-x-1 bg-gray-100 rounded-full px-3 py-1 shadow-sm'>
          <FaBell />
          <span>All</span>
        </button>
        <button onClick={() => handleFilterChange('message')} className='flex items-center space-x-1 bg-gray-100 rounded-full px-3 py-1 shadow-sm'>
          <FaEnvelope />
          <span>Messages</span>
        </button>
        <button onClick={() => handleFilterChange('alert')} className='flex items-center space-x-1 bg-gray-100 rounded-full px-3 py-1 shadow-sm'>
          <FaBell />
          <span>Alerts</span>
        </button>
        <button onClick={() => handleFilterChange('update')} className='flex items-center space-x-1 bg-gray-100 rounded-full px-3 py-1 shadow-sm'>
          <FaBell />
          <span>Updates</span>
        </button>
        <button onClick={() => setIsSettingsOpen(true)} className='flex items-center space-x-1 bg-gray-100 rounded-full px-3 py-1 shadow-sm'>
          <FaCog />
          <span>Settings</span>
        </button>
      </div>
      <div className='flex justify-between items-center py-2 px-4 mt-3'>
        <input
          type='text'
          placeholder='Enter notification message...'
          value={newNotificationMessage}
          onChange={handleNewNotificationChange}
          className='bg-gray-100 rounded-full px-3 py-1 shadow-sm outline-none w-full max-w-md'
        />
        <input
          type='text'
          placeholder='Enter notification description...'
          value={newNotificationDescription}
          onChange={handleNewNotificationDescriptionChange}
          className='bg-gray-100 rounded-full px-3 py-1 shadow-sm outline-none w-full max-w-md'
        />
        <label className='flex items-center space-x-2 cursor-pointer'>
          <input type='checkbox' checked={isAddedByTeacher} onChange={() => setIsAddedByTeacher(!isAddedByTeacher)} />
          <span>Added by Teacher</span>
        </label>
        <button onClick={addNotification} className='flex items-center space-x-1 bg-gray-100 rounded-full px-3 py-1 shadow-sm'>
          <FaPlus />
          <span>Add Notification</span>
        </button>
      </div>
      <div className='flex flex-col items-center justify-center w-full mt-3 space-y-2'>
        {paginatedNotifications.length === 0 ? (
          <div className='text-gray-500'>No notifications found.</div>
        ) : (
          paginatedNotifications.map(notification => (
            <NotificationBar key={notification.id} notification={notification} settings={settings} toggleReadStatus={toggleReadStatus} deleteNotification={deleteNotification} onColorChange={handleColorChangeForNotification} addTag={addTag} />
          ))
        )}
        {totalPages > 1 && (
          <div className='flex items-center space-x-1'>
            <button onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)} className='flex items-center space-x-1 bg-gray-100 rounded-full px-3 py-1 shadow-sm'>
              <FaArrowLeft />
              <span>Prev</span>
            </button>
            <button onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)} className='flex items-center space-x-1 bg-gray-100 rounded-full px-3 py-1 shadow-sm'>
              <span>Next</span>
              <FaArrowRight />
            </button>
          </div>
        )}
      </div>
      {isSettingsOpen && (
        <SettingsModal currentSettings={settings} onSave={handleSaveSettings} onClose={() => setIsSettingsOpen(false)} />
      )}
    </div>
  );
};

const NotificationBar = ({ notification, settings, toggleReadStatus, deleteNotification, onColorChange, addTag }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [newTag, setNewTag] = useState('');

  const handleNewTagChange = (e) => {
    setNewTag(e.target.value);
  };

  const handleAddTag = () => {
    if (newTag.trim() !== '') {
      addTag(notification.id, newTag.trim());
      setNewTag('');
    }
  };

  let notificationClass = 'bg-white'; // Default background color

  // Determine background color based on notification type
  switch (notification.type) {
    case 'message':
      notificationClass = 'bg-blue-100'; // Example color for messages
      break;
    case 'alert':
      notificationClass = 'bg-red-100'; // Example color for alerts
      break;
    case 'update':
      notificationClass = 'bg-green-100'; // Example color for updates
      break;
    default:
      notificationClass = 'bg-white';
      break;
  }

  return (
    <div className={`rounded-lg flex flex-col py-2 px-4 w-full relative shadow-sm ${notificationClass} ${notification.isRead ? 'opacity-50' : ''}`} style={{ backgroundColor: notification.color }}>
      <div className='flex justify-between items-center'>
        <div className={`absolute top-1 left-[1%] h-[10px] w-[10px] ${notification.isRead ? 'bg-gray-400' : 'bg-red-400'} rounded-full`}></div>
        <div onClick={() => setIsDescriptionOpen(!isDescriptionOpen)} className='cursor-pointer'>
          <p className='font-medium'>{notification.message}</p>
          {settings.showTimestamp && <p className='text-sm text-gray-500'>{notification.timestamp}</p>}
        </div>
        <div className='flex space-x-2'>
          <button onClick={() => toggleReadStatus(notification.id)} className='flex items-center space-x-1 bg-gray-100 rounded-full px-3 py-1 shadow-sm'>
            {notification.isRead ? <FaUndo /> : <FaCheckCircle />}
            <span>{notification.isRead ? 'Undo Mark as Read' : 'Mark as Read'}</span>
          </button>
          <div className='cursor-pointer hover-parent' onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <OnHoverExtraHud name="Options" />
            <FaSortAlphaDownAlt />
          </div>
          <div className='cursor-pointer hover-parent' onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}>
            <OnHoverExtraHud name="Change Color" />
            <FaPalette />
          </div>
        </div>
      </div>
      {isDescriptionOpen && settings.showDescription && (
        <div className='mt-2'>
          <p className='text-sm'>{notification.description}</p>
          {notification.addedByTeacher && <p className='text-xs text-gray-400'>Added by Teacher</p>}
        </div>
      )}
      {isDropdownOpen && (
        <div className='flex justify-end space-x-2 mt-2'>
          <div className='cursor-pointer hover-parent'>
            <OnHoverExtraHud name="Go" />
            <MdOpenInNew />
          </div>
          <div className='cursor-pointer hover-parent' onClick={() => deleteNotification(notification.id)}>
            <OnHoverExtraHud name="Delete" />
            <MdOutlineClose />
          </div>
        </div>
      )}
      {isColorPickerOpen && (
        <div className='flex justify-end space-x-2 mt-2 items-center'>
          <input
            type='color'
            value={notification.color}
            onChange={(e) => onColorChange(notification.id, e.target.value)}
            className='w-9 h-9 rounded-full shadow-sm outline-none'
          />
          <span className='text-sm text-gray-600'>Change Color</span>
        </div>
      )}
      <div className='flex justify-between items-center mt-2'>
        <div className='flex space-x-2'>
          <input
            type='text'
            placeholder='Add new tag...'
            value={newTag}
            onChange={handleNewTagChange}
            className='bg-gray-100 outline-none px-3 py-1 rounded-full shadow-sm'
          />
          <button onClick={handleAddTag} className='flex items-center space-x-1 bg-gray-100 rounded-full px-3 py-1 shadow-sm'>
            <FaPlus />
            <span>Add Tag</span>
          </button>
        </div>
        {notification.tags.length > 0 && (
          <div className='flex space-x-2'>
            {notification.tags.map((tag, index) => (
              <span key={index} className='bg-gray-200 px-2 py-1 rounded-full text-sm'>{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const SettingsModal = ({ currentSettings, onSave, onClose }) => {
  const [settings, setSettings] = useState(currentSettings);

  const handleToggleChange = (e) => {
    const { name, checked } = e.target;
    setSettings(prevSettings => ({ ...prevSettings, [name]: checked }));
  };

  const handleColorChange = (color) => {
    setSettings(prevSettings => ({ ...prevSettings, selectedColor: color }));
  };

  const handleSave = () => {
    onSave(settings);
  };

  return (
    <div className='fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50'>
      <div className='bg-white rounded-lg p-6 max-w-sm w-full'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-lg font-semibold'>Notification Settings</h2>
          <button onClick={onClose}><MdOutlineClose /></button>
        </div>
        <div className='space-y-4'>
          <label className='flex items-center'>
            <input
              type='checkbox'
              name='enableDesktopNotification'
              checked={settings.enableDesktopNotification}
              onChange={handleToggleChange}
              className='form-checkbox h-5 w-5 text-blue-600'
            />
            <span className='ml-2'>Enable Desktop Notifications</span>
          </label>
          <label className='flex items-center'>
            <input
              type='checkbox'
              name='showTimestamp'
              checked={settings.showTimestamp}
              onChange={handleToggleChange}
              className='form-checkbox h-5 w-5 text-blue-600'
            />
            <span className='ml-2'>Show Timestamp</span>
          </label>
          <label className='flex items-center'>
            <input
              type='checkbox'
              name='showDescription'
              checked={settings.showDescription}
              onChange={handleToggleChange}
              className='form-checkbox h-5 w-5 text-blue-600'
            />
            <span className='ml-2'>Show Description</span>
          </label>
          <div className='flex items-center space-x-2'>
            <span className='text-sm'>Select Default Color:</span>
            <input
              type='color'
              value={settings.selectedColor}
              onChange={(e) => handleColorChange(e.target.value)}
              className='w-9 h-9 rounded-full shadow-sm outline-none'
            />
          </div>
        </div>
        <div className='flex justify-end mt-6'>
          <button onClick={handleSave} className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'>Save</button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsProfile;
