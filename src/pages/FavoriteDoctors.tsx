
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Star, MapPin, Phone } from 'lucide-react';

const FavoriteDoctors = () => {
  const navigate = useNavigate();

  const favoriteDoctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      rating: 4.8,
      location: "City Hospital",
      phone: "+1 234-567-8900",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            ← Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Favorite Doctors</h1>
          <Button onClick={() => navigate('/doctors')}>
            Find More Doctors
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {favoriteDoctors.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">You haven't added any favorite doctors yet.</p>
              <Button onClick={() => navigate('/doctors')}>
                Find Doctors
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {favoriteDoctors.map((doctor) => (
              <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
                          <p className="text-blue-600">{doctor.specialty}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-gray-600">{doctor.rating}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>{doctor.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>{doctor.phone}</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-3">
                        <Button 
                          onClick={() => navigate(`/doctor/${doctor.id}`)}
                          className="flex-1"
                        >
                          Book Appointment
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => navigate('/coming-soon')}
                        >
                          Remove from Favorites
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default FavoriteDoctors;
