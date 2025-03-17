import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import Profile from './profile';
import { useNavigate } from 'react-router-dom';

export default function EmployeeProfile() {
    const [user, setUsers] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate('')

    const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';
  
    useEffect(() => {
      // Retrieve the JWT token from cookies
      const token = Cookies.get('token');
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }
  
      // Decode the token to extract the employee ID
      let userId;
      try {
        const decoded = jwtDecode(token);
        console.log(decoded)
        userId = decoded.user.id; // Ensure your JWT payload includes the "id" field

        console.log(userId,'userId')
      } catch (err) {
        setError('Invalid token.');
        return;
      }
  
      // Function to fetch employee details from the backend API
      const fetchEmployee = async () => {
        try {
          const response = await fetch(`${BASE_URL}/api/users/${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, // Include token if your API expects it in headers
            },
          });
  
          if (!response.ok) {
            throw new Error('Failed to fetch employee details');
          }
          const data = await response.json();
          console.log(data)
          setUsers(data);
        } catch (error) {
          console.log('Error fetching employee data:', error);
          setError('Error fetching employee data');
        }
      };
  
      fetchEmployee();
    }, []);
  
    // Simple conditional rendering based on data/error state
    if (error) {
       Cookies.remove("token");
        navigate('/auth/login')
      return <div>{error}</div>;
    }
  
    if (!user) {
      return <div>Loading...</div>;
    }
  
    return (
      <div style={{marginTop:"100px", paddingBottom:'40px'}}>
        <Profile user={user} />
      </div>
    );
};

