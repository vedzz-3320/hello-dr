
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, FileText, Search, User } from 'lucide-react';

const DoctorPrescriptions = () => {
  const navigate = useNavigate();
  const [prescriptions] = useState([
    {
      id: 1,
      patientName: 'John Smith',
      date: '2024-07-04',
      diagnosis: 'Hypertension',
      medications: ['Lisinopril 10mg', 'Amlodipine 5mg']
    },
    {
      id: 2,
      patientName: 'Sarah Johnson',
      date: '2024-07-03',
      diagnosis: 'Common Cold',
      medications: ['Paracetamol 500mg', 'Cough Syrup']
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="outline" onClick={() => navigate('/doctor-dashboard')}>
            ← Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Patient Prescriptions</h1>
          <div></div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Upload New Prescription */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="w-5 h-5" />
              <span>Upload New Prescription</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="patientName">Patient Name</Label>
                  <Input id="patientName" placeholder="Enter patient name" />
                </div>
                <div>
                  <Label htmlFor="diagnosis">Diagnosis</Label>
                  <Input id="diagnosis" placeholder="Enter diagnosis" />
                </div>
                <div>
                  <Label htmlFor="medications">Medications</Label>
                  <Input id="medications" placeholder="Enter medications (comma separated)" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label>Upload Prescription File</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
                    <Button variant="outline" className="mt-2">
                      Choose File
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <Button>Save Prescription</Button>
            </div>
          </CardContent>
        </Card>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input placeholder="Search prescriptions..." className="pl-10" />
          </div>
        </div>

        {/* Prescription List */}
        <div className="space-y-4">
          {prescriptions.map((prescription) => (
            <Card key={prescription.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{prescription.patientName}</h3>
                      <p className="text-gray-600 mb-2">{prescription.date}</p>
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>Diagnosis:</strong> {prescription.diagnosis}
                      </p>
                      <div>
                        <p className="text-sm text-gray-700 mb-1"><strong>Medications:</strong></p>
                        <ul className="text-sm text-gray-600 list-disc list-inside">
                          {prescription.medications.map((med, index) => (
                            <li key={index}>{med}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DoctorPrescriptions;
