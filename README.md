# Employee Management System

A comprehensive web application for managing employee information, leave requests, assets, and appraisals built with React and Vite.

## Features

### 1. Employee Account Management
- Employee account creation
- Secure login with "Remember Me" functionality
- Password reset with email confirmation and OTP verification

### 2. Leave Management
- Online leave request submission
- Leave approvals/rejections based on user role
- Leave history tracking

### 3. Role-Based Access Control
- Dynamic role configurations
- Role-based permissions for approvals and administrative actions

### 4. Asset Management
- Create and manage company assets (phones, laptops, vehicles, etc.)
- Assign assets to employees
- Track asset returns

### 5. Employee Appraisals
- Performance review system
- Appraisal tracking and history

## Tech Stack

- **Frontend**: React 19
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4 with DaisyUI
- **Routing**: React Router DOM 7
- **Icons**: React Icons
- **Notifications**: React Toastify
- **UI Components**: SweetAlert2, DaisyUI
- **Form Components**: React OTP Input Number, React Phone Input, React Flags Select

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd employee-management
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── Home/
│   ├── Components/
│   │   └── IntroText.jsx          # Introductory component for login page
│   └── Pages/
│       ├── Login.jsx              # Login page with remember me functionality
│       └── Password Reset/        # Password reset flow
│           ├── Home.jsx           # Main password reset page
│           └── Steps/
│               ├── EmailConfirmation.jsx
│               ├── OTPVerification.jsx
│               └── NewPassword.jsx
├── assets/                        # Static assets (logos, images)
├── App.jsx                        # Main application component with routing
├── index.css                      # Global styles
└── main.jsx                       # Application entry point
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Usage

### Login
Enter your username and password to access the system. Use the "Remember Me" checkbox to stay logged in on your device.

### Password Reset
If you've forgotten your password:
1. Click "Forgot password" on the login page
2. Enter your email address
3. Verify your identity with the OTP sent to your email
4. Set a new password

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and proprietary.

