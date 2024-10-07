import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent } from "@/components/ui/tabs";

// Mock data for initial states
const initialStudents = [
  { id: 1, name: 'John Doe', age: 20, course: 'Computer Science' },
  { id: 2, name: 'Jane Smith', age: 22, course: 'Mathematics' },
];

const initialCourses = [
  { id: 1, name: 'Introduction to Programming', faculty: 'Dr. Brown' },
  { id: 2, name: 'Advanced Mathematics', faculty: 'Prof. White' },
];

const initialFaculty = [
  { id: 1, name: 'Dr. Brown', department: 'Computer Science' },
  { id: 2, name: 'Prof. White', department: 'Mathematics' },
];

export default function AdminDashboard() {
  const [students, setStudents] = useState(initialStudents);
  const [courses, setCourses] = useState(initialCourses);
  const [faculty, setFaculty] = useState(initialFaculty);
  const [newStudent, setNewStudent] = useState({ name: '', age: '', course: '' });
  const [newCourse, setNewCourse] = useState({ name: '', faculty: '' });
  const [newFaculty, setNewFaculty] = useState({ name: '', department: '' });
  
  // State to track the current tab
  const [currentTab, setCurrentTab] = useState("students");

  const addStudent = () => {
    setStudents([...students, { ...newStudent, id: students.length + 1, age: Number(newStudent.age) }]);
    setNewStudent({ name: '', age: '', course: '' });
  };

  const addCourse = () => {
    setCourses([...courses, { ...newCourse, id: courses.length + 1 }]);
    setNewCourse({ name: '', faculty: '' });
  };

  const addFaculty = () => {
    setFaculty([...faculty, { ...newFaculty, id: faculty.length + 1 }]);
    setNewFaculty({ name: '', department: '' });
  };

  return (
    <Tabs 
      defaultValue={currentTab} 
      className="w-full" 
      onValueChange={setCurrentTab} // Added onValueChange to update the current tab
    >
      <TabsContent value="students">
        {/* Student Management Section */}
        <h2 className="mb-6 mt-4 text-2xl font-bold text-blue-700">Student Management</h2>
        <div className="mb-4 space-y-2">
          <Input
            placeholder="Name"
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            className="border border-gray-300 rounded p-2"
          />
          <Input
            placeholder="Age"
            type="number"
            value={newStudent.age}
            onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
            className="border border-gray-300 rounded p-2"
          />
          <Input
            placeholder="Course"
            value={newStudent.course}
            onChange={(e) => setNewStudent({ ...newStudent, course: e.target.value })}
            className="border border-gray-300 rounded p-2"
          />
          <Button onClick={addStudent} className="bg-blue-600 text-white hover:bg-blue-700">
            Add Student
          </Button>
        </div>

        <ul className="mt-8 space-y-4">
          {students.map((student) => (
            <li key={student.id} className="p-2 bg-white rounded shadow">
              {student.name} - Age: {student.age} - Course: {student.course}
            </li>
          ))}
        </ul>
      </TabsContent>

      <TabsContent value="courses">
        <h2 className="mb-6 mt-4 text-2xl font-bold text-green-700">Course Management</h2>
        <div className="mb-4 space-y-2">
          <Input
            placeholder="Course Name"
            value={newCourse.name}
            onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
            className="border border-gray-300 rounded p-2"
          />
          <Input
            placeholder="Faculty"
            value={newCourse.faculty}
            onChange={(e) => setNewCourse({ ...newCourse, faculty: e.target.value })}
            className="border border-gray-300 rounded p-2"
          />
          <Button onClick={addCourse} className="bg-green-600 text-white hover:bg-green-700">
            Add Course
          </Button>
        </div>

        <ul className="mt-8 space-y-4">
          {courses.map((course) => (
            <li key={course.id} className="p-2 bg-white rounded shadow">
              {course.name} - Faculty: {course.faculty}
            </li>
          ))}
        </ul>
      </TabsContent>

      <TabsContent value="faculty">
        <h2 className="mb-6 mt-4 text-2xl font-bold text-purple-700">Faculty Management</h2>
        <div className="mb-4 space-y-2">
          <Input
            placeholder="Name"
            value={newFaculty.name}
            onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })}
            className="border border-gray-300 rounded p-2"
          />
          <Input
            placeholder="Department"
            value={newFaculty.department}
            onChange={(e) => setNewFaculty({ ...newFaculty, department: e.target.value })}
            className="border border-gray-300 rounded p-2"
          />
          <Button onClick={addFaculty} className="bg-purple-600 text-white hover:bg-purple-700">
            Add Faculty
          </Button>
        </div>

        <ul className="mt-8 space-y-4">
          {faculty.map((f) => (
            <li key={f.id} className="p-2 bg-white rounded shadow">
              {f.name} - Department: {f.department}
            </li>
          ))}
        </ul>
      </TabsContent>
    </Tabs>
  );
}
