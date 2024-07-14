import React, { useState, useEffect  } from 'react';
import { FaSortAlphaDownAlt, FaCog, FaBell, FaEnvelope, FaCheckCircle, FaUndo, FaTrashAlt, FaArrowLeft, FaArrowRight, FaPlus, FaPalette } from 'react-icons/fa';
import { IoMdSearch } from 'react-icons/io';
import { MdOpenInNew, MdOutlineClose } from 'react-icons/md';
import OnHoverExtraHud from '../../../components/OnHoverExtraHud';
import axios from 'axios';


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
  });
  const notificationsPerPage = 5;
  const [newNotificationMessage, setNewNotificationMessage] = useState('');
  const [newNotificationDescription, setNewNotificationDescription] = useState('');
  const [newNotificationType, setNewNotificationType] = useState('message'); // New state for notification type
  const [isAddedByTeacher, setIsAddedByTeacher] = useState(false);
  const [password, setPassword] = useState('');
  const correctPassword = 'your_password_here'; // Replace with the actual password

  useEffect(() => {
    // Fetch notifications from backend when component mounts
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:3000/user/notifications');
      setNotifications(response.data); // Assuming backend returns notifications as JSON array
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleSortChange = () => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  const handleFilterChange = (filter) => setFilter(filter);

  const toggleReadStatus = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: !n.isRead } : n));
  };

  // const toggleReadStatus = async (id) => {
  //   try {
  //     await axios.put(`http://localhost:3000/user/notifications/${id}/toggle-read`);
  //     setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: !n.isRead } : n));
  //   } catch (error) {
  //     console.error('Error toggling read status:', error);
  //   }
  // };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  // const deleteNotification = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:3000/user/notifications/${id}`);
  //     setNotifications(notifications.filter(n => n.id !== id));
  //   } catch (error) {
  //     console.error('Error deleting notification:', error);
  //   }
  // };

  const addNotification = () => {
    if (password !== correctPassword) {
      alert('Incorrect password. Please try again.');
      return;
    }

    const newNotification = {
      id: notifications.length + 1,
      type: newNotificationType, // Use the selected type
      message: newNotificationMessage,
      description: newNotificationDescription,
      isRead: false,
      timestamp: new Date().toLocaleString(),
      addedByTeacher: isAddedByTeacher,
      color: '#FDE68A', // Default color
      tags: [], // Initialize tags as empty array
    };

    setNotifications([newNotification, ...notifications]);
    setNewNotificationMessage(''); // Clear the input after adding notification
    setNewNotificationDescription(''); // Clear the description input after adding notification
    setNewNotificationType('message'); // Reset the type to default
    setIsAddedByTeacher(false); // Reset teacher flag
    setPassword(''); // Clear the password input after adding notification
  };

  // ============================================

  // const addNotification = async () => {
  //   if (password !== correctPassword) {
  //     alert('Incorrect password. Please try again.');
  //     return;
  //   }

  //   try {
  //     const newNotification = {
  //       type: newNotificationType,
  //       message: newNotificationMessage,
  //       description: newNotificationDescription,
  //       isRead: false,
  //       timestamp: new Date().toLocaleString(),
  //       addedByTeacher: isAddedByTeacher,
  //       color: '#FDE68A',
  //       tags: [],
  //     };

  //     await axios.post('http://localhost:3000/user/notifications', newNotification);
  //     fetchNotifications(); // Refresh notifications after adding new one
  //     setNewNotificationMessage('');
  //     setNewNotificationDescription('');
  //     setNewNotificationType('message');
  //     setIsAddedByTeacher(false);
  //     setPassword('');
  //   } catch (error) {
  //     console.error('Error adding notification:', error);
  //   }
  // };

  const handleNewNotificationChange = (e) => {
    setNewNotificationMessage(e.target.value);
  };

  const handleNewNotificationDescriptionChange = (e) => {
    setNewNotificationDescription(e.target.value);
  };

  const handleNewNotificationTypeChange = (e) => {
    setNewNotificationType(e.target.value); // Update the type based on user selection
  };

  const handleSaveSettings = (updatedSettings) => {
    setSettings(updatedSettings);
    setIsSettingsOpen(false); // Close settings modal after saving
  };

  const handleColorChangeForNotification = (id, color) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, color } : n));
  };

  const handleNewTagChange = (id, value) => {
    const updatedNotifications = notifications.map(n => {
      if (n.id === id) {
        return { ...n, newTag: value };
      }
      return n;
    });
    setNotifications(updatedNotifications);
  };

  const addTag = (id) => {
    const updatedNotifications = notifications.map(n => {
      if (n.id === id && n.newTag) {
        return { ...n, tags: [...n.tags, n.newTag], newTag: '' };
      }
      return n;
    });
    setNotifications(updatedNotifications);
  };

  const filteredNotifications = notifications.filter(n => filter === 'all' || n.type === filter)
    .filter(n => n.message.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => sortOrder === 'asc' ? new Date(a.timestamp) - new Date(b.timestamp) : new Date(b.timestamp) - new Date(a.timestamp));

  const paginatedNotifications = filteredNotifications.slice((currentPage - 1) * notificationsPerPage, currentPage * notificationsPerPage);

  const totalPages = Math.ceil(filteredNotifications.length / notificationsPerPage);

  return (
    <div className='container mx-auto mt-8'>
      <div className='flex justify-between items-center py-2 px-4 shadow-md'>
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
      <div className='flex flex-col space-y-4'>
        <div className='text-lg font-semibold mt-4'>This part is for admin</div>
        <div className='flex flex-col space-y-2 items-center shadow-sm'>
          <div className='w-full flex items-center space-x-4'>
            <input
              type='text'
              placeholder='Enter notification message...'
              value={newNotificationMessage}
              onChange={handleNewNotificationChange}
              className='bg-gray-100 rounded-full px-3 py-1 shadow-sm outline-none w-full'
            />
          </div>
          <div className='w-full flex items-center space-x-4'>
            <input
              type='text'
              placeholder='Enter notification description...'
              value={newNotificationDescription}
              onChange={handleNewNotificationDescriptionChange}
              className='bg-gray-100 rounded-full px-3 py-1 shadow-sm outline-none w-full'
            />
          </div>
          <div className='w-full flex items-center space-x-4'>
            <label className='flex items-center space-x-2'>
              <span>Notification Type:</span>
              <select
                value={newNotificationType}
                onChange={handleNewNotificationTypeChange}
                className='bg-gray-100 rounded-full px-3 py-1 shadow-sm outline-none'
              >
                <option value='message'>Message</option>
                <option value='alert'>Alert</option>
                <option value='update'>Update</option>
              </select>
            </label>
          </div>
          <div className='w-full flex items-center space-x-4'>
            <label className='flex items-center space-x-2'>
              <input type='checkbox' checked={isAddedByTeacher} onChange={(e) => setIsAddedByTeacher(e.target.checked)} />
              <span>Admin</span>
            </label>
            <input
              type='password'
              placeholder='Enter password...'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='bg-gray-100 rounded-full px-3 py-1 shadow-sm outline-none w-full'
            />
          </div>
          <button onClick={addNotification} className='flex items-center space-x-1 bg-blue-500 text-white rounded-full px-3 py-1 shadow-sm hover:bg-blue-600 focus:outline-none mt-4'>
            <FaPlus />
            <span>Add Notification</span>
          </button>
        </div>
        <div className='text-lg font-semibold mt-4'>This part is for users</div>
        <div className='space-y-4 w-full'>
          {paginatedNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`shadow-md rounded-lg p-4 w-full ${notification.isRead ? 'opacity-50' : ''}`}
              style={{ backgroundColor: notification.color }}
            >
              <div className='flex justify-between items-center'>
                <div className='flex items-center space-x-3'>
                  {notification.type === 'message' && <FaEnvelope className='text-blue-500' />}
                  {notification.type === 'alert' && <FaBell className='text-red-500' />}
                  {notification.type === 'update' && <FaCog className='text-green-500' />}
                  <h3 className='font-semibold'>{notification.message}</h3>
                  {settings.showTimestamp && <span className='text-sm text-gray-500'>{notification.timestamp}</span>}
                  {notification.addedByTeacher && (
                    <span className='text-xs text-green-500 bg-green-200 rounded-full px-2 py-1'>Teacher</span>
                  )}
                  <div className='flex items-center'>
                    {notification.tags.map((tag, index) => (
                      <span key={index} className='bg-gray-200 text-gray-700 text-xs rounded-full px-2 py-1 ml-2'>{tag}</span>
                    ))}
                  </div>
                </div>
                <div className='flex items-center space-x-2'>
                  <button onClick={() => toggleReadStatus(notification.id)}>
                    {notification.isRead ? <FaUndo className='text-blue-500' /> : <FaCheckCircle className='text-green-500' />}
                  </button>
                  <button onClick={() => deleteNotification(notification.id)}><FaTrashAlt className='text-red-500' /></button>
                  <OnHoverExtraHud icon={<MdOpenInNew />} position='top-0 left-0'>
                    <button onClick={() => handleColorChangeForNotification(notification.id, prompt('Enter color:'))}><FaPalette className='text-gray-500' /></button>
                  </OnHoverExtraHud>
                </div>
              </div>
              {settings.showDescription && <p className='mt-2'>{notification.description}</p>}
              <div className='mt-2 flex items-center space-x-2'>
                <input
                  type='text'
                  placeholder='Enter a new tag...'
                  value={notification.newTag || ''}
                  onChange={(e) => handleNewTagChange(notification.id, e.target.value)}
                  className='bg-gray-100 rounded-full px-3 py-1 shadow-sm outline-none w-full'
                />
                <button onClick={() => addTag(notification.id)} className='flex items-center space-x-1 bg-gray-100 rounded-full px-3 py-1 shadow-sm ml-2'>
                  <FaPlus />
                  <span>Add Tag</span>
                </button>
              </div>
              <div className='mt-2 flex items-center space-x-2'>
                <input
                  type='color'
                  value={notification.color}
                  onChange={(e) => handleColorChangeForNotification(notification.id, e.target.value)}
                  className='w-10 h-10'
                />
              </div>
            </div>
          ))}
        </div>
        <div className='flex items-center space-x-2 mt-4'>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className='flex items-center space-x-1 bg-gray-100 rounded-full px-3 py-1 shadow-sm hover:bg-gray-200 focus:outline-none'
          >
            <FaArrowLeft />
            <span>Previous</span>
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className='flex items-center space-x-1 bg-gray-100 rounded-full px-3 py-1 shadow-sm hover:bg-gray-200 focus:outline-none'
          >
            <span>Next</span>
            <FaArrowRight />
          </button>
        </div>
        {isSettingsOpen && (
          <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='bg-white p-6 rounded-lg shadow-lg'>
              <h2 className='text-xl font-semibold mb-4'>Settings</h2>
              <div className='mb-4'>
                <label className='flex items-center space-x-2'>
                  <input
                    type='checkbox'
                    checked={settings.enableDesktopNotification}
                    onChange={(e) => setSettings({ ...settings, enableDesktopNotification: e.target.checked })}
                  />
                  <span>Enable Desktop Notifications</span>
                </label>
              </div>
              <div className='mb-4'>
                <label className='flex items-center space-x-2'>
                  <input
                    type='checkbox'
                    checked={settings.showTimestamp}
                    onChange={(e) => setSettings({ ...settings, showTimestamp: e.target.checked })}
                  />
                  <span>Show Timestamp</span>
                </label>
              </div>
              <div className='mb-4'>
                <label className='flex items-center space-x-2'>
                  <input
                    type='checkbox'
                    checked={settings.showDescription}
                    onChange={(e) => setSettings({ ...settings, showDescription: e.target.checked })}
                  />
                  <span>Show Description</span>
                </label>
              </div>
              <div className='flex justify-end space-x-2'>
                <button onClick={() => setIsSettingsOpen(false)} className='flex items-center space-x-1 bg-gray-100 rounded-full px-3 py-1 shadow-sm hover:bg-gray-200 focus:outline-none'>
                  <MdOutlineClose />
                  <span>Cancel</span>
                </button>
                <button onClick={() => handleSaveSettings(settings)} className='flex items-center space-x-1 bg-blue-500 text-white rounded-full px-3 py-1 shadow-sm hover:bg-blue-600 focus:outline-none'>
                  <FaCheckCircle />
                  <span>Save</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsProfile;
