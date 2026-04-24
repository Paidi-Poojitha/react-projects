import { useState } from "react";
import '../styles/add_edit.css'

const AddUser = ({ setShowAdd, setUsers }) => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: Date.now(), // unique id
      ...formData,
      username: formData.name.toLowerCase().replace(/\s+/g, ""),
      liked: false
    };
    setUsers(prev => [...prev, newUser]);
    setShowAdd(false);
  };

  const handleCancel=()=>{
    setShowAdd(false);
  }
  return (
    <form className="add-user-form" onSubmit={handleSubmit} >
      <input name="name" type="text" placeholder="Name" value={formData.name} onChange={handleChange} required autoComplete="on"/>
      <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required autoComplete="on" />
      <input name="phone" type="text" placeholder="Phone" value={formData.phone} onChange={handleChange} required autoComplete="on" />
      <input name="website" type="text" placeholder="Website" value={formData.website} onChange={handleChange} required autoComplete="on" />
      <button type="submit">Add User</button>
      <button type="button" onClick={handleCancel}>Cancel</button>
    </form>
  );
};

export default AddUser;