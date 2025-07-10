
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { User, Stethoscope, ArrowLeft } from 'lucide-react';

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelection = (role: 'patient' | 'doctor') => {
    // Store role in localStorage for now
    localStorage.setItem('userRole', role);
    navigate('/signup', { state: { role } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-4">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Button>
        </div>

        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">H</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-blue-600">Hello Dr</h1>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Hello Dr</h2>
          <p className="text-gray-600">Choose your role to get started</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-300" onClick={() => handleRoleSelection('patient')}>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">I'm a Patient</h3>
              <p className="text-gray-600 mb-6">
                Find doctors, book appointments, manage medical records, and get the healthcare you need.
              </p>
              <ul className="text-left text-sm text-gray-600 space-y-2 mb-6">
                <li>• Search and book appointments</li>
                <li>• Manage medical records</li>
                <li>• Save favorite doctors</li>
                <li>• Get appointment reminders</li>
              </ul>
              <Button className="w-full">Continue as Patient</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-green-300" onClick={() => handleRoleSelection('doctor')}>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Stethoscope className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">I'm a Doctor</h3>
              <p className="text-gray-600 mb-6">
                Manage your practice, schedule appointments, handle patient records, and grow your practice.
              </p>
              <ul className="text-left text-sm text-gray-600 space-y-2 mb-6">
                <li>• Manage appointment slots</li>
                <li>• Upload prescriptions</li>
                <li>• View patient details</li>
                <li>• Track consultations</li>
              </ul>
              <Button className="w-full bg-green-600 hover:bg-green-700">Continue as Doctor</Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">Already have an account? </p>
          <Button
            variant="link"
            className="p-0 text-sm"
            onClick={() => navigate('/login')}
          >
            Sign in here
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
