import { useState, useEffect } from "react";
import { fetchUsers } from "../api/users";
import UserCard from "../components/UserCard";
import Loader from "../components/Loader";
import EditUser from '../components/EditUser'
import AddUser from "../components/AddUser";
import '../styles/users.css'

const Users = () => {

  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const[editingUser,setEditUser]=useState(null)
  const[showEdit,setShowEdit]=useState(false)

  const [showAdd,setShowAdd]=useState(false)

  const[search,setSearch]=useState("")
 
  const getUsers = async () => {
      try {
        const data = await fetchUsers();
        const simplifiedUsers = data.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          website: user.website,
          username: user.username,
          liked: false
        }));
        setUsers(simplifiedUsers);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

  // Fetch users on mount
  useEffect(() => {
    getUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    if (!search) return true;
    const term = search.toLowerCase();
    return (
        user.name?.toLowerCase().includes(term) ||
        user.email?.toLowerCase().includes(term) ||
        user.website?.toLowerCase().includes(term)
    );
  });

  return (
    <section className="users">
      {/* Controls */}
      <div className="users-controls">
        <input
          type="text"
          placeholder="Search users..."
          className="search-input"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
        <button className="add-user-btn" onClick={()=>setShowAdd(!showAdd)}>
          + Add User
        </button>
      </div>

      {/* Status */}
      {isLoading && <Loader />}

      {error && <p className="error">Error: {error.message}</p>}

      {!isLoading && users.length === 0 && <p>No users found.</p>}

      {showAdd && (
        <div className="modal-overlay">
          <AddUser setUsers={setUsers} setShowAdd={setShowAdd} />
        </div>
      )}

      {editingUser && showEdit && (
        <div className="modal-overlay">
          <EditUser
            editingUser={editingUser}
            setUsers={setUsers}
            setShowEdit={setShowEdit}
            setEditUser={setEditUser}
          />
        </div>
      )}

      {/* Users List */}
      <div className="users-list">
        {filteredUsers.map(user => (
          <UserCard key={user.id} user={user} setUsers={setUsers} setEditUser={setEditUser} setShowEdit={setShowEdit}/>
        ))}
      </div>

    </section>
  );
};

export default Users;