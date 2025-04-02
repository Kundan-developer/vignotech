


import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Charts from "./Charts"
import { CSVLink } from "react-csv";
import AddStudent from "./AddStudent";
import { useSelector } from "react-redux";

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [attendanceRange, setAttendanceRange] = useState({ min: "", max: "" });

  const user = useSelector((state) => state.auth.user);
  const isAdmin = user?.email === "kundan@gmail.com"; // Check if the user is admin

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/students");
      setStudents(response.data);
      setFilteredStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };
  useEffect(() => { 
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (!isAdmin) return; // Prevent deletion if not admin
    try {
      await axios.delete(`http://localhost:5000/students/${id}`);
      alert("Student deleted successfully!");
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  // Filtering logic
  useEffect(() => {
    let filtered = students;

    if (searchQuery) {
      filtered = filtered.filter(
        (student) =>
          student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.roll_number.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedClass) {
      filtered = filtered.filter((student) => student.class === selectedClass);
    }

    if (selectedSection) {
      filtered = filtered.filter((student) => student.section === selectedSection);
    }

    if (attendanceRange.min !== "" && attendanceRange.max !== "") {
      filtered = filtered.filter(
        (student) =>
          student.attendance >= Number(attendanceRange.min) &&
          student.attendance <= Number(attendanceRange.max)
      );
    }

    setFilteredStudents(filtered);
  }, [searchQuery, selectedClass, selectedSection, attendanceRange, students]);

  const columns = [
    { name: "#", selector: (row, index) => index + 1, sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Roll No", selector: (row) => row.roll_number, sortable: true },
    { name: "Class", selector: (row) => row.class, sortable: true },
    { name: "Section", selector: (row) => row.section, sortable: true },
    { name: "Attendance (%)", selector: (row) => row.attendance, sortable: true },
    { name: "Maths", selector: (row) => row.marks.maths, sortable: true },
    { name: "Science", selector: (row) => row.marks.science, sortable: true },
    { name: "English", selector: (row) => row.marks.english, sortable: true },
  ];

  // Add delete column only for admin
  if (isAdmin) {
    columns.push({
      name: "Actions",
      cell: (row) => (
        <button className="btn btn-danger" onClick={() => handleDelete(row.id)}>
          Delete
        </button>
      ),
    });
  }

  return (
    <div className="container mt-4">
      {/* Show Add Student button only for admin */}
      {isAdmin &&         <AddStudent refreshStudents={fetchStudents} />
    }

      <h2 className="mb-3">Student List</h2>

      {/* Filters Section */}
      <div className="mb-3 d-flex gap-3">
        <input
          type="text"
          placeholder="Search by Name or Roll No"
          className="form-control"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Class Filter */}
        <select className="form-select" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
          <option value="">Select Class</option>
          {[...new Set(students.map((s) => s.class))].map((cls) => (
            <option key={cls} value={cls}>
              {cls}
            </option>
          ))}
        </select>

        {/* Section Filter */}
        <select className="form-select" value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)}>
          <option value="">Select Section</option>
          {[...new Set(students.map((s) => s.section))].map((sec) => (
            <option key={sec} value={sec}>
              {sec}
            </option>
          ))}
        </select>

        {/* Attendance Range Filter */}
        <input
          type="number"
          placeholder="Min Attendance"
          className="form-control"
          value={attendanceRange.min}
          onChange={(e) => setAttendanceRange({ ...attendanceRange, min: e.target.value })}
        />
        <input
          type="number"
          placeholder="Max Attendance"
          className="form-control"
          value={attendanceRange.max}
          onChange={(e) => setAttendanceRange({ ...attendanceRange, max: e.target.value })}
        />
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredStudents}
        pagination
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 15]}
      />

      {/* Download CSV Button */}
      <CSVLink
        data={filteredStudents}
        filename={"students.csv"}
        className="btn btn-primary mt-3"
      >
        Download CSV
      </CSVLink>

     
      {isAdmin &&  <Charts/>}
    </div>
  );
};

export default StudentTable;
