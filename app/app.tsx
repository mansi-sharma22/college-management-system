import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AdminDashboard from '../components/AdminDashboard';
import FacultyDashboard from '../components/FacultyDashboard';
import StudentDashboard from '../components/StudentDashboard';

// Mock user data
const users = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
  { id: 2, username: 'faculty', password: 'faculty123', role: 'faculty' },
  { id: 3, username: 'student', password: 'student123', role: 'student' },
];

// Define the User interface
interface User {
  id: number;
  username: string;
  password: string; // Consider securely handling passwords
  role: string;
}

export default function CollegeManagementSystem() {
  const [user, setUser] = useState<User | null>(null); // Update state type
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const foundUser = users.find(u => u.username === username && u.password === password);
    if (foundUser) {
        // Handle successful login (e.g., redirect, update state, etc.)
    } else {
        setError('Invalid username or password');
    }
};

  const handleLogout = () => {
    setUser(null);
    setUsername('');
    setPassword('');
    setError('');
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleLogin} className="p-8 bg-white rounded-lg shadow-md w-96">
          <h1 className="mb-6 text-2xl font-bold text-center">College Management System</h1>
          {error && <p className="mb-4 text-red-500">{error}</p>}
          <div className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">Login</Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">College Management System</h1>
          <p className="mt-1 text-sm text-gray-500">Welcome, {user.username} ({user.role})</p>
          <Button onClick={handleLogout} className="mt-2">Logout</Button>
        </div>
      </header>
      <main>
        <div className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {user.role === 'admin' && <AdminDashboard />}
          {user.role === 'faculty' && <FacultyDashboard />}
          {user.role === 'student' && <StudentDashboard />}
        </div>
      </main>
    </div>
  );
}
