
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Clock, Calendar, User } from 'lucide-react';
import { appointmentService, TimeSlot } from '@/services/appointmentService';

const DoctorSlots = () => {
  const navigate = useNavigate();
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [bookedAppointments, setBookedAppointments] = useState<TimeSlot[]>([]);
  
  // Mock current doctor ID - in real app this would come from auth
  const currentDoctorId = 1;
  const currentDoctorName = "Dr. Sarah Johnson";

  const [newSlot, setNewSlot] = useState({
    date: '',
    time: '',
    duration: 30
  });

  useEffect(() => {
    loadSlots();
    loadBookedAppointments();
  }, []);

  const loadSlots = () => {
    const doctorSlots = appointmentService.getSlotsByDoctor(currentDoctorId);
    setSlots(doctorSlots);
  };

  const loadBookedAppointments = () => {
    const booked = appointmentService.getBookedAppointmentsByDoctor(currentDoctorId);
    setBookedAppointments(booked);
  };

  const addSlot = () => {
    if (newSlot.date && newSlot.time) {
      appointmentService.addSlot({
        doctorId: currentDoctorId,
        doctorName: currentDoctorName,
        ...newSlot,
        isAvailable: true
      });
      setNewSlot({ date: '', time: '', duration: 30 });
      loadSlots();
    }
  };

  const removeSlot = (id: number) => {
    appointmentService.removeSlot(id);
    loadSlots();
    loadBookedAppointments();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="outline" onClick={() => navigate('/doctor-dashboard')}>
            ← Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Manage Appointment Slots</h1>
          <div></div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Slot Management */}
          <div className="space-y-8">
            {/* Add New Slot */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Add New Slot</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newSlot.date}
                      onChange={(e) => setNewSlot({ ...newSlot, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={newSlot.time}
                      onChange={(e) => setNewSlot({ ...newSlot, time: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={newSlot.duration}
                      onChange={(e) => setNewSlot({ ...newSlot, duration: parseInt(e.target.value) })}
                    />
                  </div>
                  <Button onClick={addSlot} className="w-full">
                    Add Slot
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Available Slots */}
            <Card>
              <CardHeader>
                <CardTitle>Your Available Slots</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {slots.filter(slot => slot.isAvailable).map((slot) => (
                    <div key={slot.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>{new Date(slot.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>{slot.time}</span>
                        </div>
                        <span className="text-sm text-gray-600">({slot.duration} min)</span>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          Available
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeSlot(slot.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {slots.filter(slot => slot.isAvailable).length === 0 && (
                    <p className="text-gray-500 text-center py-4">No available slots</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Booked Appointments */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Booked Appointments</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookedAppointments.map((appointment) => (
                    <div key={appointment.id} className="p-4 border rounded-lg bg-blue-50">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-blue-600" />
                            <span className="font-medium">{new Date(appointment.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-blue-600" />
                            <span className="font-medium">{appointment.time}</span>
                          </div>
                        </div>
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                          Booked
                        </span>
                      </div>
                      
                      <div className="space-y-1 text-sm">
                        <p><strong>Patient:</strong> {appointment.patientName}</p>
                        <p><strong>Phone:</strong> {appointment.patientPhone}</p>
                        <p><strong>Email:</strong> {appointment.patientEmail}</p>
                        <p><strong>Booked on:</strong> {appointment.bookingDate ? new Date(appointment.bookingDate).toLocaleDateString() : 'N/A'}</p>
                      </div>
                    </div>
                  ))}
                  {bookedAppointments.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No booked appointments</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorSlots;
