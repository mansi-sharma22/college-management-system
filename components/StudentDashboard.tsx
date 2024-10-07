import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data types
interface Course {
  id: number;
  name: string;
  enrolled: boolean;
  grade: string | null;
  attendance: number;
}

interface Profile {
  name: string;
  age: number;
  email: string;
}

interface Fee {
  id: number;
  description: string;
  amount: number;
  paid: boolean;
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

export default function StudentDashboard() {
  const [courses, setCourses] = useState<Course[]>(initialCourses)
  const [profile, setProfile] = useState<Profile>(initialProfile)
  const [fees, setFees] = useState<Fee[]>(initialFees)
  const [activeTab, setActiveTab] = useState<string>('courses')

  // Function to toggle course enrollment
  const toggleEnrollment = (courseId: number) => {
    setCourses(courses.map(course =>
      course.id === courseId ? { ...course, enrolled: !course.enrolled } : course
    ))
  }

  // Function to update the profile
  const updateProfile = (field: keyof Profile, value: string | number) => {
    setProfile({ ...profile, [field]: value })
  }

  // Function to mark fee as paid
  const payFee = (feeId: number) => {
    setFees(fees.map(fee =>
      fee.id === feeId ? { ...fee, paid: true } : fee
    ))
  }

  return (
    <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList>
        <TabsTrigger value="courses">Courses</TabsTrigger>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="fees">Fees</TabsTrigger>
      </TabsList>
      <TabsContent value="courses">
        <h2 className="mb-4 text-2xl font-bold">Course Registration</h2>
        {courses.map((course) => (
          <div key={course.id} className="mb-4 p-4 bg-white rounded shadow">
            <h3 className="mb-2 text-xl font-semibold">{course.name}</h3>
            <p>Grade: {course.grade || 'N/A'}</p>
            <p>Attendance: {course.attendance}</p>
            <Button onClick={() => toggleEnrollment(course.id)}>
              {course.enrolled ? 'Drop Course' : 'Enroll'}
            </Button>
          </div>
        ))}
      </TabsContent>
      <TabsContent value="profile">
        <h2 className="mb-4 text-2xl font-bold">Profile Management</h2>
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
          <Button>Update Profile</Button>
        </div>
      </TabsContent>
      <TabsContent value="fees">
        <h2 className="mb-4 text-2xl font-bold">Fee Management</h2>
        {fees.map((fee) => (
          <div key={fee.id} className="mb-4 p-4 bg-white rounded shadow">
            <h3 className="mb-2 text-xl font-semibold">{fee.description}</h3>
            <p>Amount: ${fee.amount}</p>
            <p>Status: {fee.paid ? 'Paid' : 'Unpaid'}</p>
            {!fee.paid && (
              <Button onClick={() => payFee(fee.id)}>Pay Fee</Button>
            )}
          </div>
        ))}
      </TabsContent>
    </Tabs>
  )
}
