import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "../../../../Css/Booking.css"; // Ensure this path is correct
import { useNavigate } from "react-router-dom";
import Search from "../../../../Components/SearchBox/Search";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [query, setQuery] = useState(""); // Add search state
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const BASE_URL = process.env.BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/employees`);
        setEmployees(response.data);
      } catch (err) {
        console.error("Error fetching employees:", err);
        setError("Failed to load employees. Please try again later.");
      }
    };

    fetchEmployees();
  }, []);

  // Filter employees based on search query
  const filteredEmployees = employees.filter((employee) =>
    [employee.name, employee.jobName, employee.location]
      .some(field => field.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div style={{ marginTop: "100px" }}>
      <Search query={query} setQuery={setQuery} />
      <div className="booking-container">
        <main className="booking-main">
          <div className="booking-grid">
            {error && <p className="error-message">{error}</p>}
            {filteredEmployees.length === 0 && !error ? (
              <p>No employees found</p>
            ) : (
              filteredEmployees.map((employee) => {
                const fileName = employee.profilePhotoUrl ? employee.profilePhotoUrl.split("\\").pop() : "";

                return (
                  <motion.div
                    key={employee._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    className="booking-card"
                  >
                    <div className="booking-info">
                      <motion.img
                        src={fileName ? `${BASE_URL}/uploads/Employee/${fileName}` : ""}
                        alt={employee.name}
                        className="profile-avatar"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                      <h3 className="booking-name">{employee.name}</h3>
                      <p className="booking-job">{employee.jobName}</p>
                      <p className="booking-location">{employee.location}</p>
                      <p className="booking-experience">
                        Experience: {employee.experience} {employee.experience === 1 ? "year" : "years"}
                      </p>
                    </div>
                    <button
                      onClick={() => navigate(`/user/booking/${employee._id}`)}
                      className="booking-button"
                    >
                      View Profile
                    </button>
                  </motion.div>
                );
              })
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
