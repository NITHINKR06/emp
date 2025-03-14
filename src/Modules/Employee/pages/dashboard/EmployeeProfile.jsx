import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import Profile from './profile';

export default function EmployeeProfile() {
    const [employee, setEmployee] = useState(null);
    const [error, setError] = useState(null);

    const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';
  
    useEffect(() => {
      // Retrieve the JWT token from cookies
      const token = Cookies.get('token');
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }
  
      // Decode the token to extract the employee ID
      let employeeId;
      try {
        const decoded = jwtDecode(token);
        console.log(decoded)
        employeeId = decoded.user.id; // Ensure your JWT payload includes the "id" field

        console.log(employeeId,'employeeId')
      } catch (err) {
        setError('Invalid token.');
        return;
      }
  
      // Function to fetch employee details from the backend API
      const fetchEmployee = async () => {
        try {
          const response = await fetch(`${BASE_URL}/api/employees/${employeeId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, // Include token if your API expects it in headers
            },
          });
          console.log(response)
  
          if (!response.ok) {
            throw new Error('Failed to fetch employee details');
          }
          const data = await response.json();
          console.log(data)
          setEmployee(data);
        } catch (error) {
          console.log('Error fetching employee data:', error);
          setError('Error fetching employee data');
        }
      };
  
      fetchEmployee();
    }, []);
  
    // Simple conditional rendering based on data/error state
    if (error) {
      return <div>{error}</div>;
    }
  
    if (!employee) {
      return <div>Loading...</div>;
    }
  
    return (
      <div style={{paddingTop:"60px", paddingBottom:'40px'}}>
        {/* <h1>Employee Profile</h1> */}
        <Profile employee={employee} />
      </div>
    );
};

