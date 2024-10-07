"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserPlus, BookPlus, UserCog, Trash2, Users, GraduationCap, BookOpen } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Mock data for initial states
const initialStudents = [
  { id: 1, name: 'John Doe', age: 20, course: 'Computer Science', status: 'Active' },
  { id: 2, name: 'Jane Smith', age: 22, course: 'Mathematics', status: 'Active' },
]

const initialCourses = [
  { id: 1, name: 'Introduction to Programming', faculty: 'Dr. Brown', students: 15, department: 'Computer Science' },
  { id: 2, name: 'Advanced Mathematics', faculty: 'Prof. White', students: 12, department: 'Mathematics' },
  { id: 3, name: 'Data Structures and Algorithms', faculty: 'Dr. Green', students: 18, department: 'Computer Science' },
  { id: 4, name: 'Linear Algebra', faculty: 'Prof. Black', students: 10, department: 'Mathematics' },
]

const initialFaculty = [
  { id: 1, name: 'Dr. Brown', department: 'Computer Science', courses: 2, yearsOfExperience: 10 },
  { id: 2, name: 'Prof. White', department: 'Mathematics', courses: 1, yearsOfExperience: 15 },
  { id: 3, name: 'Dr. Green', department: 'Computer Science', courses: 1, yearsOfExperience: 8 },
  { id: 4, name: 'Prof. Black', department: 'Mathematics', courses: 1, yearsOfExperience: 12 },
]

export default function AdminDashboard() {
  const [students, setStudents] = useState(initialStudents)
  const [courses, setCourses] = useState(initialCourses)
  const [faculty, setFaculty] = useState(initialFaculty)
  const [newStudent, setNewStudent] = useState({ name: '', age: '', course: '', status: 'Active' })
  const [newCourse, setNewCourse] = useState({ name: '', faculty: '', students: 0, department: '' })
  const [newFaculty, setNewFaculty] = useState({ name: '', department: '', courses: 0, yearsOfExperience: 0 })
  
  const [currentTab, setCurrentTab] = useState("students")

  const addStudent = () => {
    if (newStudent.name && newStudent.age && newStudent.course) {
      setStudents([...students, { ...newStudent, id: students.length + 1, age: Number(newStudent.age) }])
      setNewStudent({ name: '', age: '', course: '', status: 'Active' })
      toast.success('Student added successfully!')
    } else {
      toast.error('Please fill all fields')
    }
  }

  const addCourse = () => {
    if (newCourse.name && newCourse.faculty && newCourse.department) {
      setCourses([...courses, { ...newCourse, id: courses.length + 1, students: Number(newCourse.students) }])
      setNewCourse({ name: '', faculty: '', students: 0, department: '' })
      toast.success('Course added successfully!')
    } else {
      toast.error('Please fill all fields')
    }
  }

  const addFaculty = () => {
    if (newFaculty.name && newFaculty.department) {
      setFaculty([...faculty, { ...newFaculty, id: faculty.length + 1, courses: Number(newFaculty.courses), yearsOfExperience: Number(newFaculty.yearsOfExperience) }])
      setNewFaculty({ name: '', department: '', courses: 0, yearsOfExperience: 0 })
      toast.success('Faculty added successfully!')
    } else {
      toast.error('Please fill all fields')
    }
  }

  const deleteItem = (id: number, type: 'student' | 'course' | 'faculty') => {
    if (type === 'student') {
      setStudents(students.filter(student => student.id !== id))
    } else if (type === 'course') {
      setCourses(courses.filter(course => course.id !== id))
    } else {
      setFaculty(faculty.filter(f => f.id !== id))
    }
    toast.success(`${type} deleted successfully!`)
  }

  const updateStudentStatus = (id: number, status: string) => {
    setStudents(students.map(student => 
      student.id === id 
        ? { ...student, status }
        : student
    ))
    toast.info('Student status updated!')
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
      <Tabs defaultValue={currentTab} className="w-full" onValueChange={setCurrentTab}>
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="faculty">Faculty</TabsTrigger>
        </TabsList>

        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-700">
                <UserPlus className="mr-2" />
                Student Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 mb-4">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-4">
                  <div>
                    <Label htmlFor="studentName">Name</Label>
                    <Input
                      id="studentName"
                      placeholder="Name"
                      value={newStudent.name}
                      onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="studentAge">Age</Label>
                    <Input
                      id="studentAge"
                      placeholder="Age"
                      type="number"
                      value={newStudent.age}
                      onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="studentCourse">Course</Label>
                    <Input
                      id="studentCourse"
                      placeholder="Course"
                      value={newStudent.course}
                      onChange={(e) => setNewStudent({ ...newStudent, course: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="studentStatus">Status</Label>
                    <Select onValueChange={(value) => setNewStudent({ ...newStudent, status: value })}>
                      <SelectTrigger id="studentStatus">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={addStudent} className="w-full sm:w-auto bg-green-600 hover:bg-green-700">Add Student</Button>
              </div>

              <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                <div className="space-y-4">
                  {students.map((student) => (
                    <Card key={student.id}>
                      <CardContent className="flex justify-between items-center p-4">
                        <div className="flex-grow">
                          <h3 className="font-semibold">{student.name}</h3>
                          <p className="text-sm text-gray-500">Age: {student.age} | Course: {student.course}</p>
                          <div className="mt-2">
                            <Label htmlFor={`status-${student.id}`} className="mr-2">Status:</Label>
                            <Select 
                              value={student.status} 
                              onValueChange={(value) => updateStudentStatus(student.id, value)}
                            >
                              <SelectTrigger id={`status-${student.id}`} className="w-[120px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="Inactive">Inactive</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => deleteItem(student.id, 'student')}
                          className="ml-4"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-700">
                <BookPlus className="mr-2" />
                Course Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 mb-4">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-4">
                  <div>
                    <Label htmlFor="courseName">Course Name</Label>
                    <Input
                      id="courseName"
                      placeholder="Course Name"
                      value={newCourse.name}
                      onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="courseFaculty">Faculty</Label>
                    <Input
                      id="courseFaculty"
                      placeholder="Faculty"
                      value={newCourse.faculty}
                      onChange={(e) => setNewCourse({ ...newCourse, faculty: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="courseStudents">Number of Students</Label>
                    <Input
                      id="courseStudents"
                      placeholder="Number of Students"
                      type="number"
                      value={newCourse.students}
                      onChange={(e) => setNewCourse({ ...newCourse, students: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="courseDepartment">Department</Label>
                    <Input
                      id="courseDepartment"
                      placeholder="Department"
                      value={newCourse.department}
                      onChange={(e) => setNewCourse({ ...newCourse, department: e.target.value })}
                    />
                  </div>
                </div>
                <Button onClick={addCourse} className="w-full sm:w-auto bg-green-600 hover:bg-green-700">Add Course</Button>
              </div>

              <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                <div className="space-y-4">
                  {courses.map((course) => (
                    <Card key={course.id}>
                      <CardContent className="flex justify-between items-center p-4">
                        <div className="flex-grow">
                          <h3 className="font-semibold">{course.name}</h3>
                          <p className="text-sm text-gray-500">Faculty: {course.faculty}</p>
                          <p className="text-sm text-gray-500">Department: {course.department}</p>
                          <div className="mt-2 flex items-center">
                            <Users className="h-4 w-4 mr-1 text-green-600" />
                            <span className="text-sm font-medium">{course.students} Students</span>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => deleteItem(course.id, 'course')}
                          className="ml-4"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faculty">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-700">
                <UserCog className="mr-2" />
                Faculty Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 mb-4">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-4">
                  <div>
                    <Label htmlFor="facultyName">Name</Label>
                    <Input
                      id="facultyName"
                      placeholder="Name"
                      value={newFaculty.name}
                      onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="facultyDepartment">Department</Label>
                    <Input
                      id="facultyDepartment"
                      placeholder="Department"
                      value={newFaculty.department}
                      onChange={(e) => setNewFaculty({ ...newFaculty, department: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="facultyCourses">Number of Courses</Label>
                    <Input
                      id="facultyCourses"
                      placeholder="Number of Courses"
                      type="number"
                      value={newFaculty.courses}
                      onChange={(e) => setNewFaculty({ ...newFaculty, courses: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="facultyExperience">Years of Experience</Label>
                    <Input
                      id="facultyExperience"
                      placeholder="Years of Experience"
                      type="number"
                      value={newFaculty.yearsOfExperience}
                      onChange={(e) => setNewFaculty({ ...newFaculty, yearsOfExperience: Number(e.target.value) })}
                    />
                  </div>
                </div>
                <Button onClick={addFaculty} className="w-full sm:w-auto bg-green-600 hover:bg-green-700">Add Faculty</Button>
              </div>

              <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                <div className="space-y-4">
                  {faculty.map((f) => (
                    <Card key={f.id}>
                      <CardContent className="flex justify-between items-center p-4">
                        <div className="flex-grow">
                          <h3 className="font-semibold">{f.name}</h3>
                          <p className="text-sm text-gray-500">Department: {f.department}</p>
                          <div className="mt-2 flex items-center space-x-4">
                            <div className="flex items-center">
                              <BookOpen className="h-4 w-4 mr-1 text-green-600" />
                              <span className="text-sm font-medium">{f.courses} Courses</span>
                            </div>
                            <div className="flex items-center">
                              <GraduationCap className="h-4 w-4 mr-1 text-green-600" />
                              <span className="text-sm font-medium">{f.yearsOfExperience} Years Experience</span>
                            </div>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => deleteItem(f.id, 'faculty')}
                          className="ml-4"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <ToastContainer position="bottom-right" />
    </div>
  )
}