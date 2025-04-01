import { useState, useEffect } from 'react';
import "./Admin.css"

function Admin() {
  const [staffMembers, setStaffMembers] = useState([]);
  const [roleSummary, setRoleSummary] = useState({});

  useEffect(() => {
    const storedStaff = JSON.parse(localStorage.getItem('staffMembers')) || [];
    setStaffMembers(storedStaff);
    
   
    calculateRoleSummary(storedStaff);
  }, []);


  const calculateRoleSummary = (staff) => {
    const summary = staff.reduce((acc, member) => {
      if (!acc[member.role]) {
        acc[member.role] = 0;
      }
      acc[member.role] += 1;
      return acc;
    }, {});
    
    setRoleSummary(summary);
  };

  const handleStaffAdded = (newStaff) => {
    const updatedStaffList = [...staffMembers, newStaff];
    localStorage.setItem('staffMembers', JSON.stringify(updatedStaffList));
    setStaffMembers(updatedStaffList);
    calculateRoleSummary(updatedStaffList);
  };

  const handleDelete = (id) => {
    const updatedList = staffMembers.filter(staff => staff.id !== id);
    localStorage.setItem('staffMembers', JSON.stringify(updatedList));
    setStaffMembers(updatedList);
    calculateRoleSummary(updatedList);
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Panel</h1>
      
      
      <div className="role-summary-container">
        <div className="role-summary-header">
          <h2>Staff Overview</h2>
          <p>Total staff members: {staffMembers.length}</p>
        </div>
        
        <div className="role-cards">
          {Object.entries(roleSummary).map(([role, count]) => (
            <div key={role} className="role-card">
              <h3>{role}</h3>
              <div className="role-count">{count}</div>
              <p className="role-label">members</p>
            </div>
          ))}
          
          {Object.keys(roleSummary).length === 0 && (
            <div className="role-card empty">
              <h3>No Roles</h3>
              <p>Add staff members to see role statistics</p>
            </div>
          )}
        </div>
      </div>
      
  

      <div className="staff-list-section">
        <h2>Staff List</h2>
        <div className="table-container">
          <table className="staff-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Shift</th>
                <th>Working Hours</th>
                <th>Working Days</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {staffMembers.length > 0 ? (
                staffMembers.map((staff, index) => (
                  <tr key={staff.id || index}>
                    <td>{staff.name}</td>
                    <td>{staff.email}</td>
                    <td>{staff.phoneNumber}</td>
                    <td>{staff.role}</td>
                    <td>{staff.shift}</td>
                    <td>{staff.startTime} - {staff.endTime}</td>
                    <td>{staff.workingDaysArray.join(', ')}</td>
                    <td>
                      <button 
                        className="delete-btn" 
                        onClick={() => handleDelete(staff.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="empty-message">No staff members added yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Admin;