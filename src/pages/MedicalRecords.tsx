
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Upload, Camera, Plus, Calendar, Download } from 'lucide-react';

const MedicalRecords = () => {
  const navigate = useNavigate();
  const [records] = useState([
    {
      id: 1,
      title: "Blood Test Results",
      date: "2024-01-15",
      type: "Lab Report",
      doctor: "Dr. Sarah Johnson"
    },
    {
      id: 2,
      title: "Prescription - Heart Medication",
      date: "2024-01-10",
      type: "Prescription",
      doctor: "Dr. Sarah Johnson"
    }
  ]);

  const handleUpload = (method: 'camera' | 'gallery' | 'file') => {
    // TODO: Implement file upload logic
    console.log(`Upload via ${method}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            ← Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Medical Records</h1>
          <div></div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Upload Options */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Add New Record</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="h-24 flex-col space-y-2"
                onClick={() => handleUpload('camera')}
              >
                <Camera className="w-8 h-8" />
                <span>Take Photo</span>
              </Button>
              <Button
                variant="outline"
                className="h-24 flex-col space-y-2"
                onClick={() => handleUpload('gallery')}
              >
                <Upload className="w-8 h-8" />
                <span>Upload from Gallery</span>
              </Button>
              <Button
                variant="outline"
                className="h-24 flex-col space-y-2"
                onClick={() => handleUpload('file')}
              >
                <FileText className="w-8 h-8" />
                <span>Upload File</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Records List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Medical Records</CardTitle>
          </CardHeader>
          <CardContent>
            {records.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No medical records yet.</p>
                <p className="text-sm text-gray-500">Upload your first record using the options above.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {records.map((record) => (
                  <div key={record.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-8 h-8 text-blue-600" />
                        <div>
                          <h3 className="font-medium text-gray-900">{record.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(record.date).toLocaleDateString()}</span>
                            </span>
                            <span>Type: {record.type}</span>
                            <span>Doctor: {record.doctor}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default MedicalRecords;
