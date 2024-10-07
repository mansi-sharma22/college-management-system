Overview
The College Management System Dashboard is a web application designed to facilitate the management of college operations. It features distinct interfaces for students, faculty, and admin users, allowing them to access relevant information and perform specific tasks. The dashboard is built with React and leverages modern UI components for a smooth user experience.

Features
Student Dashboard:

Course registration and enrollment management
Profile management (view and update personal information)
Fee management (view fees and mark them as paid)

Faculty Dashboard:

Manage courses and grades
View and update student attendance records
Communicate with students and manage course materials

Admin Dashboard:

Manage students, faculty, and courses
Generate reports on course enrollment and fee payment
Administer the overall college system

Tech Stack
Frontend: React, TypeScript, Tailwind CSS
UI Components: Custom UI components for buttons, inputs, cards, and tabs
State Management: React hooks for state management
Notifications: Toast notifications using react-toastify

Usage

Login Credentials

Student Login
Username: student
Password: student123

Admin Login
Username: admin
Password: admin123

Faculty Login
Username: faculty
Password: faculty123


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
