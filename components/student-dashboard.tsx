"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BookOpen, User, CreditCard, CheckCircle, XCircle } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Mock data types
interface Course {
  id: number
  name: string
  enrolled: boolean
  grade: string | null
  attendance: number
}

interface Profile {
  name: string
  age: number
  email: string
}

interface Fee {
  id: number
  description: string
  amount: number
  paid: boolean
}

// Initial mock data
const initialCourses: Course[] = [
  { id: 1, name: 'Introduction to Programming', enrolled: false, grade: null, attendance: 0 },
  { id: 2, name: 'Advanced Mathematics', enrolled: false, grade: null, attendance: 0 },
  { id: 3, name: 'Data Structures', enrolled: false, grade: null, attendance: 0 },
]

const initialProfile: Profile = {
  name: 'John Doe',
  age: 20,
  email: 'john.doe@example.com',
}

const initialFees: Fee[] = [
  { id: 1, description: 'Tuition Fee', amount: 5000, paid: false },
  { id: 2, description: 'Library Fee', amount: 500, paid: true },
]

export function StudentDashboardComponent() {
  const [courses, setCourses] = useState<Course[]>(initialCourses)
  const [profile, setProfile] = useState<Profile>(initialProfile)
  const [fees, setFees] = useState<Fee[]>(initialFees)
  const [activeTab, setActiveTab] = useState<string>('courses')

  // Function to toggle course enrollment
  const toggleEnrollment = (courseId: number) => {
    setCourses(courses.map(course =>
      course.id === courseId ? { ...course, enrolled: !course.enrolled } : course
    ))
    const course = courses.find(c => c.id === courseId)
    if (course) {
      toast.success(`${course.enrolled ? 'Dropped from' : 'Enrolled in'} ${course.name}`)
    }
  }

  // Function to update the profile
  const updateProfile = (field: keyof Profile, value: string | number) => {
    setProfile({ ...profile, [field]: value })
  }

  // Function to save profile changes
  const saveProfile = () => {
    toast.success('Profile updated successfully')
  }

  // Function to mark fee as paid
  const payFee = (feeId: number) => {
    setFees(fees.map(fee =>
      fee.id === feeId ? { ...fee, paid: true } : fee
    ))
    const fee = fees.find(f => f.id === feeId)
    if (fee) {
      toast.success(`Paid ${fee.description}`)
    }
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Student Dashboard</h1>
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="courses" className="flex items-center justify-center">
            <BookOpen className="mr-2 h-4 w-4" />
            Courses
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center justify-center">
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="fees" className="flex items-center justify-center">
            <CreditCard className="mr-2 h-4 w-4" />
            Fees
          </TabsTrigger>
        </TabsList>
        <TabsContent value="courses">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-700">
                <BookOpen className="mr-2" />
                Course Registration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                <div className="space-y-4">
                  {courses.map((course) => (
                    <Card key={course.id}>
                      <CardContent className="flex justify-between items-center p-4">
                        <div className="flex-grow">
                          <h3 className="text-lg font-semibold">{course.name}</h3>
                          <p className="text-sm text-gray-500">Grade: {course.grade || 'N/A'}</p>
                          <p className="text-sm text-gray-500">Attendance: {course.attendance}%</p>
                        </div>
                        <Button 
                          onClick={() => toggleEnrollment(course.id)}
                          variant={course.enrolled ? "destructive" : "default"}
                        >
                          {course.enrolled ? 'Drop Course' : 'Enroll'}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-700">
                <User className="mr-2" />
                Profile Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => updateProfile('name', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={profile.age}
                    onChange={(e) => updateProfile('age', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => updateProfile('email', e.target.value)}
                  />
                </div>
                <Button onClick={saveProfile} className="w-full">Update Profile</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="fees">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-700">
                <CreditCard className="mr-2" />
                Fee Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                <div className="space-y-4">
                  {fees.map((fee) => (
                    <Card key={fee.id}>
                      <CardContent className="flex justify-between items-center p-4">
                        <div className="flex-grow">
                          <h3 className="text-lg font-semibold">{fee.description}</h3>
                          <p className="text-sm text-gray-500">Amount: ${fee.amount}</p>
                          <p className={`text-sm ${fee.paid ? 'text-green-600' : 'text-red-600'}`}>
                            Status: {fee.paid ? 'Paid' : 'Unpaid'}
                          </p>
                        </div>
                        {fee.paid ? (
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        ) : (
                          <Button onClick={() => payFee(fee.id)}>Pay Fee</Button>
                        )}
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