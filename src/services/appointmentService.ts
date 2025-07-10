
export interface TimeSlot {
  id: number;
  doctorId: number;
  doctorName: string;
  date: string;
  time: string;
  duration: number;
  isAvailable: boolean;
  patientId?: number;
  patientName?: string;
  patientPhone?: string;
  patientEmail?: string;
  bookingDate?: string;
}

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  experience: string;
  location: string;
  image: string;
}

class AppointmentService {
  private slotsKey = 'doctorSlots';
  private doctorsKey = 'doctors';

  // Initialize with some mock data
  private initializeData() {
    if (!localStorage.getItem(this.doctorsKey)) {
      const mockDoctors: Doctor[] = [
        {
          id: 1,
          name: "Dr. Sarah Johnson",
          specialty: "Cardiologist",
          rating: 4.8,
          experience: "15 years",
          location: "City Hospital",
          image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face"
        },
        {
          id: 2,
          name: "Dr. Michael Chen",
          specialty: "Dermatologist",
          rating: 4.9,
          experience: "12 years",
          location: "Skin Care Clinic",
          image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face"
        },
        {
          id: 3,
          name: "Dr. Emily Davis",
          specialty: "Pediatrician",
          rating: 4.7,
          experience: "10 years",
          location: "Children's Hospital",
          image: "https://images.unsplash.com/photo-1594824475433-e9cc1c05b6a0?w=150&h=150&fit=crop&crop=face"
        }
      ];
      localStorage.setItem(this.doctorsKey, JSON.stringify(mockDoctors));
    }

    if (!localStorage.getItem(this.slotsKey)) {
      const mockSlots: TimeSlot[] = [
        {
          id: 1,
          doctorId: 1,
          doctorName: "Dr. Sarah Johnson",
          date: '2024-07-05',
          time: '09:00',
          duration: 30,
          isAvailable: true
        },
        {
          id: 2,
          doctorId: 1,
          doctorName: "Dr. Sarah Johnson",
          date: '2024-07-05',
          time: '10:00',
          duration: 30,
          isAvailable: true
        },
        {
          id: 3,
          doctorId: 2,
          doctorName: "Dr. Michael Chen",
          date: '2024-07-06',
          time: '11:00',
          duration: 30,
          isAvailable: true
        }
      ];
      localStorage.setItem(this.slotsKey, JSON.stringify(mockSlots));
    }
  }

  constructor() {
    this.initializeData();
  }

  // Get all slots
  getAllSlots(): TimeSlot[] {
    const slots = localStorage.getItem(this.slotsKey);
    return slots ? JSON.parse(slots) : [];
  }

  // Get slots by doctor ID
  getSlotsByDoctor(doctorId: number): TimeSlot[] {
    return this.getAllSlots().filter(slot => slot.doctorId === doctorId);
  }

  // Get available slots by doctor ID
  getAvailableSlotsByDoctor(doctorId: number): TimeSlot[] {
    return this.getSlotsByDoctor(doctorId).filter(slot => slot.isAvailable);
  }

  // Add new slot
  addSlot(slot: Omit<TimeSlot, 'id'>): TimeSlot {
    const slots = this.getAllSlots();
    const newSlot: TimeSlot = {
      ...slot,
      id: Date.now(),
      isAvailable: true
    };
    slots.push(newSlot);
    localStorage.setItem(this.slotsKey, JSON.stringify(slots));
    return newSlot;
  }

  // Remove slot
  removeSlot(slotId: number): boolean {
    const slots = this.getAllSlots();
    const filteredSlots = slots.filter(slot => slot.id !== slotId);
    localStorage.setItem(this.slotsKey, JSON.stringify(filteredSlots));
    return true;
  }

  // Book appointment
  bookAppointment(slotId: number, patientDetails: {
    patientId: number;
    patientName: string;
    patientPhone: string;
    patientEmail: string;
  }): boolean {
    const slots = this.getAllSlots();
    const slotIndex = slots.findIndex(slot => slot.id === slotId);
    
    if (slotIndex !== -1 && slots[slotIndex].isAvailable) {
      slots[slotIndex] = {
        ...slots[slotIndex],
        isAvailable: false,
        ...patientDetails,
        bookingDate: new Date().toISOString()
      };
      localStorage.setItem(this.slotsKey, JSON.stringify(slots));
      return true;
    }
    return false;
  }

  // Get all doctors
  getAllDoctors(): Doctor[] {
    const doctors = localStorage.getItem(this.doctorsKey);
    return doctors ? JSON.parse(doctors) : [];
  }

  // Get doctor by ID
  getDoctorById(doctorId: number): Doctor | undefined {
    return this.getAllDoctors().find(doctor => doctor.id === doctorId);
  }

  // Get booked appointments for a doctor
  getBookedAppointmentsByDoctor(doctorId: number): TimeSlot[] {
    return this.getAllSlots().filter(slot => slot.doctorId === doctorId && !slot.isAvailable);
  }
}

export const appointmentService = new AppointmentService();
