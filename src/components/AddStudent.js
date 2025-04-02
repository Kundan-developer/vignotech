import React, { useState } from "react";
import axios from "axios";

const AddStudent = ({ refreshStudents }) => {
  const [student, setStudent] = useState({
    name: "",
    roll_number: "",
    class: "",
    section: "",
    attendance: "",
    maths: "",
    science: "",
    english: "",
  });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newStudent = {
      ...student,
      attendance: Number(student.attendance),
      marks: {
        maths: Number(student.maths),
        science: Number(student.science),
        english: Number(student.english),
      },
    };

    try {
      await axios.post("http://localhost:5000/students", newStudent);
      alert("Student added successfully!");
      refreshStudents();  
      setStudent({
        name: "",
        roll_number: "",
        class: "",
        section: "",
        attendance: "",
        maths: "",
        science: "",
        english: "",
      });
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (

    <div className="container-fluid mt-4">
    <h3 className="text-center">Add New Student</h3>
    <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
      <div className="row g-3">
        <div className="col-md-6 col-lg-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="form-control"
            value={student.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6 col-lg-4">
          <input
            type="text"
            name="roll_number"
            placeholder="Roll Number"
            className="form-control"
            value={student.roll_number}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6 col-lg-4">
          <input
            type="text"
            name="class"
            placeholder="Class"
            className="form-control"
            value={student.class}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6 col-lg-4">
          <input
            type="text"
            name="section"
            placeholder="Section"
            className="form-control"
            value={student.section}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6 col-lg-4">
          <input
            type="number"
            name="attendance"
            placeholder="Attendance (%)"
            className="form-control"
            value={student.attendance}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6 col-lg-4">
          <input
            type="number"
            name="maths"
            placeholder="Maths Marks"
            className="form-control"
            value={student.maths}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6 col-lg-4">
          <input
            type="number"
            name="science"
            placeholder="Science Marks"
            className="form-control"
            value={student.science}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6 col-lg-4">
          <input
            type="number"
            name="english"
            placeholder="English Marks"
            className="form-control"
            value={student.english}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-12 text-center mt-3">
          <button type="submit" className="btn btn-success px-4 py-2">
            Add Student
          </button>
        </div>
      </div>
    </form>
  </div>
  );
};

export default AddStudent;
