import { useState,useEffect } from "react";
import '../styles/add_edit.css'

const EditUser = ({ editingUser,setShowEdit, setUsers,setEditUser }) => {

  const [formData, setFormData] = useState({...editingUser});

  useEffect(()=>setFormData({...editingUser}),[editingUser])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser={...formData}
    setUsers(prev => prev.map((user)=>{
        if(user.id==newUser.id){
            return newUser
        }
        return user
    }));
    setShowEdit(false);
    setEditUser(null)
  };

  const handleCancel=()=>{
    setShowEdit(false);
  }

  return (
    <form className="add-user-form" onSubmit={handleSubmit}>
      <input name="name" type="text" placeholder="Name" value={formData.name} onChange={handleChange} required autoComplete="on"/>
      <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required autoComplete="on" />
      <input name="phone" type="text" placeholder="Phone" value={formData.phone} onChange={handleChange} required autoComplete="on" />
      <input name="website" type="text" placeholder="Website" value={formData.website} onChange={handleChange} required autoComplete="on" />
      <button type="submit">Edit User</button>
      <button type="button" onClick={handleCancel}>Cancel</button>
    </form>
  );
};

export default EditUser;