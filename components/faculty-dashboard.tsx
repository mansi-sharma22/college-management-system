"use client"

import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Book, Users, GraduationCap, CalendarCheck } from 'lucide-react'

interface Student {
  id: number
  name: string
  grade: string | null
  attendance: number
}

interface Course {
  id: number
  name: string
  students: Student[]
}

export function FacultyDashboard() {
  const [activeTab, setActiveTab] = useState<string>('courses')

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
  ]

  const [courses, setCourses] = useState<Course[]>(initialCourses)

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
    ))
  }

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
    ))
  }

  const getGradeColor = (grade: string | null) => {
    if (!grade) return 'bg-gray-200 text-gray-700'
    const numGrade = parseFloat(grade)
    if (numGrade >= 90) return 'bg-green-500 text-white'
    if (numGrade >= 80) return 'bg-blue-500 text-white'
    if (numGrade >= 70) return 'bg-yellow-500 text-white'
    return 'bg-red-500 text-white'
  }

  const getAverageGrade = (students: Student[]) => {
    const grades = students.map(s => s.grade).filter(g => g !== null) as string[]
    if (grades.length === 0) return 'N/A'
    const avg = grades.reduce((sum, grade) => sum + parseFloat(grade), 0) / grades.length
    return avg.toFixed(2)
  }

  const getAverageAttendance = (students: Student[]) => {
    const avg = students.reduce((sum, student) => sum + student.attendance, 0) / students.length
    return avg.toFixed(2)
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Faculty Dashboard</h1>
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="courses">Courses</TabsTrigger>
        </TabsList>
        <TabsContent value="courses">
          <div className="grid gap-6 md:grid-cols-2">
            {courses.map((course) => (
              <Card key={course.id} className="w-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Book className="mr-2" />
                    {course.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between mb-4">
                    <div className="flex items-center">
                      <Users className="mr-2" />
                      <span>{course.students.length} Students</span>
                    </div>
                    <div className="flex items-center">
                      <GraduationCap className="mr-2" />
                      <span>Avg. Grade: {getAverageGrade(course.students)}</span>
                    </div>
                    <div className="flex items-center">
                      <CalendarCheck className="mr-2" />
                      <span>Avg. Attendance: {getAverageAttendance(course.students)}</span>
                    </div>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Attendance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {course.students.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>
                            <Input
                              type="text"
                              value={student.grade || ''}
                              onChange={(e) => updateGrade(course.id, student.id, e.target.value)}
                              placeholder="Enter grade"
                              className="w-20"
                            />
                            {student.grade && (
                              <Badge className={`ml-2 ${getGradeColor(student.grade)}`}>
                                {student.grade}
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={student.attendance}
                              onChange={(e) => updateAttendance(course.id, student.id, parseInt(e.target.value) || 0)}
                              placeholder="Enter attendance"
                              className="w-20"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
export default FacultyDashboard;