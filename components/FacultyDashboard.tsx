import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Student {
  id: number;
  name: string;
  grade: string | null;
  attendance: number;
}

interface Course {
  id: number;
  name: string;
  students: Student[];
}

export default function FacultyDashboard() {
  const [activeTab, setActiveTab] = useState<string>('courses');

  const initialCourses: Course[] = [
    {
      id: 1,
      name: 'Introduction to Programming',
      students: [
        { id: 1, name: 'John Doe', grade: null, attendance: 0 },
        { id: 2, name: 'Jane Smith', grade: null, attendance: 0 },
      ],
    },
    {
      id: 2,
      name: 'Advanced Mathematics',
      students: [
        { id: 3, name: 'Alice Johnson', grade: null, attendance: 0 },
        { id: 4, name: 'Bob Williams', grade: null, attendance: 0 },
      ],
    },
  ];

  const [courses, setCourses] = useState<Course[]>(initialCourses);

  const updateGrade = (courseId: number, studentId: number, grade: string | null) => {
    setCourses(courses.map(course =>
      course.id === courseId
        ? {
            ...course,
            students: course.students.map(student =>
              student.id === studentId ? { ...student, grade } : student
            ),
          }
        : course
    ));
  };

  const updateAttendance = (courseId: number, studentId: number, attendance: number) => {
    setCourses(courses.map(course =>
      course.id === courseId
        ? {
            ...course,
            students: course.students.map(student =>
              student.id === studentId ? { ...student, attendance } : student
            ),
          }
        : course
    ));
  };

  return (
    <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList>
        <TabsTrigger value="courses">Courses</TabsTrigger>
      </TabsList>
      <TabsContent value="courses">
        <h2 className="mb-4 text-2xl font-bold">Course Management</h2>
        {courses.map((course) => (
          <div key={course.id} className="mb-6 p-4 bg-white rounded shadow">
            <h3 className="mb-2 text-xl font-semibold">{course.name}</h3>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Student</th>
                  <th className="text-left">Grade</th>
                  <th className="text-left">Attendance</th>
                </tr>
              </thead>
              <tbody>
                {course.students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>
                      <Input
                        type="text"
                        value={student.grade || ''}
                        onChange={(e) => updateGrade(course.id, student.id, e.target.value)}
                        placeholder="Enter grade"
                      />
                    </td>
                    <td>
                      <Input
                        type="number"
                        value={student.attendance}
                        onChange={(e) => updateAttendance(course.id, student.id, parseInt(e.target.value) || 0)}
                        placeholder="Enter attendance"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </TabsContent>
    </Tabs>
  );
}
