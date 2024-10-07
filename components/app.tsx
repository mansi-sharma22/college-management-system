"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { User, LogOut, Key, BookOpen } from 'lucide-react'
import AdminDashboard from './AdminDashboard'
import  FacultyDashboard  from "./faculty-dashboard"
import  StudentDashboard  from './student-dashboard';

interface User {
  id: number
  username: string
  password: string
  role: 'admin' | 'faculty' | 'student'
}

const users: User[] = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
  { id: 2, username: 'faculty', password: 'faculty123', role: 'faculty' },
  { id: 3, username: 'student', password: 'student123', role: 'student' },
]

export function App() {
  const [user, setUser] = useState<User | null>(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const foundUser = users.find(u => u.username === username && u.password === password)
    if (foundUser) {
      setUser(foundUser)
      toast.success(`Welcome, ${foundUser.username}!`)
    } else {
      toast.error('Invalid username or password')
    }
  }

  const handleLogout = () => {
    setUser(null)
    setUsername('')
    setPassword('')
    toast.info('Logged out successfully')
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
        <Card className="w-[350px] shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center flex items-center justify-center">
              <BookOpen className="mr-2 h-6 w-6" />
              CMS Login
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the College Management System
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-9"
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <div className="relative">
                  <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">Login</Button>
            </form>
          </CardContent>
        </Card>
        <ToastContainer position="bottom-right" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">College Management System</h1>
                <p className="text-sm text-gray-500">Welcome, {user.username} ({user.role})</p>
              </div>
            </div>
            <Button onClick={handleLogout} variant="outline" className="flex items-center">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {user.role === 'admin' && <AdminDashboard />}
          {user.role === 'faculty' && <FacultyDashboard />}
          {user.role === 'student' && <StudentDashboard />}
        </div>
      </main>
      <ToastContainer position="bottom-right" />
    </div>
  )
}