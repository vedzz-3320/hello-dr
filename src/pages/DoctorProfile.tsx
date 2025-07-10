
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Star, MapPin, Clock, Phone, Calendar } from 'lucide-react';
import { appointmentService, Doctor, TimeSlot } from '@/services/appointmentService';
import { useToast } from '@/hooks/use-toast';

const DoctorProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [patientDetails, setPatientDetails] = useState({
    name: '',
    phone: '',
    email: ''
  });

  useEffect(() => {
    if (id) {
      const doctorData = appointmentService.getDoctorById(parseInt(id));
      if (doctorData) {
        setDoctor(doctorData);
        const slots = appointmentService.getAvailableSlotsByDoctor(doctorData.id);
        setAvailableSlots(slots);
      }
    }
  }, [id]);

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setShowBookingDialog(true);
  };

  const handleBookAppointment = () => {
    if (!selectedSlot || !patientDetails.name || !patientDetails.phone || !patientDetails.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all patient details.",
        variant: "destructive"
      });
      return;
    }

    const success = appointmentService.bookAppointment(selectedSlot.id, {
      patientId: Date.now(), // Mock patient ID
      patientName: patientDetails.name,
      patientPhone: patientDetails.phone,
      patientEmail: patientDetails.email
    });

    if (success) {
      toast({
        title: "Appointment Booked!",
        description: `Your appointment with ${doctor?.name} has been confirmed.`
      });
      
      // Refresh available slots
      if (doctor) {
        const updatedSlots = appointmentService.getAvailableSlotsByDoctor(doctor.id);
        setAvailableSlots(updatedSlots);
      }
      
      setShowBookingDialog(false);
      setSelectedSlot(null);
      setPatientDetails({ name: '', phone: '', email: '' });
    } else {
      toast({
        title: "Booking Failed",
        description: "Unable to book the appointment. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Doctor not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Button variant="outline" onClick={() => navigate('/doctors')}>
            ← Back to Doctors
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Doctor Info */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start space-x-6 mb-6">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{doctor.name}</h1>
                <p className="text-xl text-blue-600 mb-4">{doctor.specialty}</p>
                
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{doctor.rating} rating</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{doctor.experience} experience</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{doctor.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Slots */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Available Time Slots ({availableSlots.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {availableSlots.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {availableSlots.map((slot) => (
                  <Button
                    key={slot.id}
                    variant="outline"
                    className="h-16 flex flex-col items-center justify-center"
                    onClick={() => handleSlotSelect(slot)}
                  >
                    <div className="text-sm font-medium">{new Date(slot.date).toLocaleDateString()}</div>
                    <div className="text-lg">{slot.time}</div>
                    <div className="text-xs text-gray-500">{slot.duration} min</div>
                  </Button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No available slots at the moment</p>
                <Button variant="outline" onClick={() => window.location.reload()}>
                  Refresh
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Booking Dialog */}
        <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Book Appointment</DialogTitle>
            </DialogHeader>
            
            {selectedSlot && (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p><strong>Doctor:</strong> {doctor.name}</p>
                  <p><strong>Date:</strong> {new Date(selectedSlot.date).toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {selectedSlot.time}</p>
                  <p><strong>Duration:</strong> {selectedSlot.duration} minutes</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="patientName">Full Name</Label>
                    <Input
                      id="patientName"
                      value={patientDetails.name}
                      onChange={(e) => setPatientDetails({ ...patientDetails, name: e.target.value })}
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="patientPhone">Phone Number</Label>
                    <Input
                      id="patientPhone"
                      value={patientDetails.phone}
                      onChange={(e) => setPatientDetails({ ...patientDetails, phone: e.target.value })}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="patientEmail">Email Address</Label>
                    <Input
                      id="patientEmail"
                      type="email"
                      value={patientDetails.email}
                      onChange={(e) => setPatientDetails({ ...patientDetails, email: e.target.value })}
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <Button onClick={handleBookAppointment} className="flex-1">
                    Confirm Booking
                  </Button>
                  <Button variant="outline" onClick={() => setShowBookingDialog(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default DoctorProfile;
