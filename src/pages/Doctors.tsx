
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Star, MapPin, Clock, Filter, Stethoscope, Award, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  qualification?: string;
  experience_years?: number;
  consultation_fee?: number;
  rating: number;
  total_ratings: number;
  location?: string;
  phone?: string;
  bio?: string;
  image_url?: string;
  is_verified: boolean;
  is_available: boolean;
}

const Doctors = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');

  // Enhanced mock doctors data with unique specialties
  const sampleDoctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      qualification: 'MD, FACC',
      experience_years: 15,
      consultation_fee: 200,
      rating: 4.8,
      total_ratings: 124,
      location: 'New York, NY',
      phone: '+1-555-0123',
      bio: 'Specialized in cardiovascular diseases with over 15 years of experience in treating heart conditions.',
      image_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      is_verified: true,
      is_available: true
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Pediatrician',
      qualification: 'MD, FAAP',
      experience_years: 12,
      consultation_fee: 150,
      rating: 4.9,
      total_ratings: 89,
      location: 'Los Angeles, CA',
      phone: '+1-555-0124',
      bio: 'Pediatric specialist focused on child healthcare and development with expertise in pediatric medicine.',
      image_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
      is_verified: true,
      is_available: true
    },
    {
      id: '3',
      name: 'Dr. Emily Davis',
      specialty: 'Dermatologist',
      qualification: 'MD, FAAD',
      experience_years: 10,
      consultation_fee: 180,
      rating: 4.7,
      total_ratings: 156,
      location: 'Chicago, IL',
      phone: '+1-555-0125',
      bio: 'Expert in skin conditions and cosmetic dermatology procedures with focus on advanced treatments.',
      image_url: 'https://images.unsplash.com/photo-1594824720626-37be91f96c8d?w=150&h=150&fit=crop&crop=face',
      is_verified: true,
      is_available: true
    },
    {
      id: '4',
      name: 'Dr. Robert Martinez',
      specialty: 'Neurologist',
      qualification: 'MD, PhD',
      experience_years: 18,
      consultation_fee: 220,
      rating: 4.9,
      total_ratings: 203,
      location: 'Houston, TX',
      phone: '+1-555-0126',
      bio: 'Leading neurologist specializing in brain disorders, stroke treatment, and neurological rehabilitation.',
      image_url: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
      is_verified: true,
      is_available: true
    },
    {
      id: '5',
      name: 'Dr. Jennifer Kim',
      specialty: 'Orthopedic',
      qualification: 'MD, FAAOS',
      experience_years: 14,
      consultation_fee: 190,
      rating: 4.6,
      total_ratings: 87,
      location: 'Miami, FL',
      phone: '+1-555-0127',
      bio: 'Orthopedic surgeon specializing in joint replacement, sports injuries, and bone disorders.',
      image_url: 'https://images.unsplash.com/photo-1594824475433-e9cc1c05b6a0?w=150&h=150&fit=crop&crop=face',
      is_verified: true,
      is_available: true
    },
    {
      id: '6',
      name: 'Dr. David Thompson',
      specialty: 'Dentist',
      qualification: 'DDS, MS',
      experience_years: 16,
      consultation_fee: 120,
      rating: 4.8,
      total_ratings: 245,
      location: 'Seattle, WA',
      phone: '+1-555-0128',
      bio: 'Experienced dentist specializing in cosmetic dentistry, implants, and oral surgery procedures.',
      image_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
      is_verified: true,
      is_available: true
    },
    {
      id: '7',
      name: 'Dr. Lisa Patel',
      specialty: 'Psychiatrist',
      qualification: 'MD, MRCPsych',
      experience_years: 11,
      consultation_fee: 160,
      rating: 4.7,
      total_ratings: 134,
      location: 'Boston, MA',
      phone: '+1-555-0129',
      bio: 'Mental health specialist focusing on anxiety, depression, and cognitive behavioral therapy.',
      image_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      is_verified: true,
      is_available: true
    },
    {
      id: '8',
      name: 'Dr. Amanda Rodriguez',
      specialty: 'Gynecologist',
      qualification: 'MD, FACOG',
      experience_years: 13,
      consultation_fee: 175,
      rating: 4.9,
      total_ratings: 178,
      location: 'Phoenix, AZ',
      phone: '+1-555-0130',
      bio: 'Women\'s health specialist with expertise in reproductive health and minimally invasive surgery.',
      image_url: 'https://images.unsplash.com/photo-1594824475433-e9cc1c05b6a0?w=150&h=150&fit=crop&crop=face',
      is_verified: true,
      is_available: true
    },
    {
      id: '9',
      name: 'Dr. James Wilson',
      specialty: 'ENT Specialist',
      qualification: 'MD, FACS',
      experience_years: 17,
      consultation_fee: 185,
      rating: 4.6,
      total_ratings: 112,
      location: 'Denver, CO',
      phone: '+1-555-0131',
      bio: 'Ear, nose, and throat specialist with expertise in sinus surgery and hearing disorders.',
      image_url: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
      is_verified: true,
      is_available: true
    }
  ];

  const specialties = [
    "All Specialties",
    "Cardiologist",
    "Dermatologist", 
    "Pediatrician",
    "Neurologist",
    "Orthopedic",
    "Dentist",
    "Psychiatrist",
    "Gynecologist",
    "ENT Specialist"
  ];

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      // Use sample data directly since there's no doctors table in the database
      console.log('Loading sample doctors data');
      setDoctors(sampleDoctors);
    } catch (error) {
      console.log('Error loading doctors:', error);
      setDoctors(sampleDoctors);
    } finally {
      setLoading(false);
    }
  };

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All Specialties' || 
                            doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => navigate('/dashboard')} className="border-blue-200 text-blue-600 hover:bg-blue-50">
              ← Back
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Find Doctors</h1>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            {filteredDoctors.length} doctors available
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for doctors by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
            />
            <Filter className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>

          <div className="flex items-center space-x-4 overflow-x-auto pb-2">
            {specialties.map((specialty) => (
              <Button
                key={specialty}
                variant={selectedSpecialty === specialty ? "default" : "outline"}
                onClick={() => setSelectedSpecialty(specialty)}
                className={`whitespace-nowrap ${
                  selectedSpecialty === specialty 
                    ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white' 
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {specialty}
              </Button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-32"></div>
                      <div className="h-3 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  </div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Doctors List */}
        {!loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <Card 
                key={doctor.id} 
                className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
                onClick={() => navigate(`/doctor/${doctor.id}`)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative">
                      <img
                        src={doctor.image_url || `https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face`}
                        alt={doctor.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-blue-100"
                      />
                      {doctor.is_verified && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <Award className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                        {doctor.name}
                      </h3>
                      <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                      {doctor.qualification && (
                        <p className="text-sm text-gray-500">{doctor.qualification}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{doctor.rating.toFixed(1)}</span>
                      <span>({doctor.total_ratings} reviews)</span>
                    </div>
                    {doctor.experience_years && (
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{doctor.experience_years} years experience</span>
                      </div>
                    )}
                    {doctor.location && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{doctor.location}</span>
                      </div>
                    )}
                    {doctor.consultation_fee && (
                      <div className="flex items-center space-x-2 text-green-600 font-medium">
                        <span>₹{doctor.consultation_fee} consultation</span>
                      </div>
                    )}
                  </div>

                  {doctor.bio && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {doctor.bio}
                    </p>
                  )}

                  <div className="flex space-x-2">
                    <Button 
                      className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/doctor/${doctor.id}`);
                      }}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Now
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="border-gray-200 hover:bg-gray-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add to favorites functionality
                      }}
                    >
                      <Star className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && filteredDoctors.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No doctors found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or browse all specialties
            </p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setSelectedSpecialty('All Specialties');
              }}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Doctors;
