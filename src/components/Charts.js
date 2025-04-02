import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line 
} from "recharts";

const Charts = () => {
  const [students, setStudents] = useState([]);

  // Fetch students from API
  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Ensure students data is available before processing
  if (!students || students.length === 0) return <p>Loading...</p>;

  const attendanceData = students.map(student => ({
    name: student.name,
    attendance: student.attendance,
  }));

  const subjectMarksData = students.map(student => ({
    name: student.name,
    maths: student.marks.maths,
    science: student.marks.science,
    english: student.marks.english,
  }));

  const classDistribution = Object.entries(
    students.reduce((acc, student) => {
      acc[student.class] = (acc[student.class] || 0) + 1;
      return acc;
    }, {})
  ).map(([key, value]) => ({ name: key, value }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="container mt-4">
      <h3 className="mt-4">Charts & Data Visualization</h3>

      {/* Attendance Bar Chart */}
      <div className="chart-container">
        <h4>Student Attendance (%)</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={attendanceData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="attendance" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
     
      {/* Class Distribution Pie Chart */}
      <div className="chart-container">
        <h4>Class Distribution</h4>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={classDistribution} cx="50%" cy="50%" label outerRadius={100} fill="#8884d8">
              {classDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
