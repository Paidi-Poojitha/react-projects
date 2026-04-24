import '../styles/usercard.css'

const UserCard = ({ user, setUsers, setEditUser, setShowEdit}) => {

  const handleLike = () => {
    setUsers(prev =>
      prev.map(u => u.id === user.id ? { ...u, liked: !u.liked } : u)
    );
  };

  const handleEdit=()=>{
    setEditUser(user)
    setShowEdit(true)
  }

  const handlDelete=()=>{
    setUsers((prev)=>prev.filter((u)=>{ return u.id!=user.id}))
  };

  return (
    <div className="user-card">
      <div className="user-avatar">
        <img
          src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${user.username}&eyes=happy&mouth=smile&style=circle`}
          alt="avatar"
          className="avatar-img"
          width={100}
        />
      </div>

      <div className="user-info">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <p>{user.phone}</p>
        <p>{user.website}</p>
      </div>

      <div className="user-actions">
        <button onClick={()=>handleLike()}>
          {user.liked ? '❤️ Liked' : '🤍 Like'}
        </button>
        <button onClick={handleEdit}>✏️ Edit</button>
        <button onClick={handlDelete}>🗑️ Delete</button>
      </div>
    </div>
  );
};

export default UserCard