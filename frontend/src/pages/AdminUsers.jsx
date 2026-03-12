import { useEffect, useState } from 'react';
import { getAllUsers, deleteUser } from '../services/userService';
import { FaTrash } from 'react-icons/fa';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };

  const onDelete = async id => {
    if (window.confirm('Delete this user?')) {
      await deleteUser(id);
      fetchUsers();
    }
  };

  const filteredUsers = users.filter(
    user =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">Manage Registered Users</h1>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search by name or email..."
        className="border px-4 py-2 mb-6 rounded w-full md:w-1/3"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Name</th>
            <th>Email</th>
            <th>User Type</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.map(user => (
            <tr key={user._id} className="border-t text-center">
              <td className="p-3">{user.name}</td>

              <td>{user.email}</td>

              {/* 👤 USER TYPE COLUMN */}
              <td>
                {user.role === 'ADMIN' ? (
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                    ADMIN
                  </span>
                ) : (
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                    USER
                  </span>
                )}
              </td>

              {/* 🚦 STATUS COLUMN */}
              <td>
                {user.isBlocked ? (
                  <span className="text-red-600 font-semibold">Blocked</span>
                ) : (
                  <span className="text-green-600 font-semibold">Active</span>
                )}
              </td>

              {/* ⚙ ACTIONS */}
              <td className="space-x-2">
                {user.role !== 'ADMIN' && (
                  <button
                    onClick={() => onDelete(user._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
