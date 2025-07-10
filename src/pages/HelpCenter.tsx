
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Phone, Mail, Video, ShoppingCart, Activity, Heart, Lightbulb } from 'lucide-react';

const HelpCenter = () => {
  const navigate = useNavigate();

  const helpTopics = [
    {
      title: "Online Consultations",
      icon: <Video className="w-8 h-8 text-blue-600" />,
      description: "Connect with doctors virtually",
      comingSoon: true
    },
    {
      title: "Medicine Orders",
      icon: <ShoppingCart className="w-8 h-8 text-green-600" />,
      description: "Order medicines online",
      comingSoon: false,
      externalUrl: "https://ema.iitdh.ac.in/meds"
    },
    {
      title: "Diagnostic Tests",
      icon: <Activity className="w-8 h-8 text-purple-600" />,
      description: "Book lab tests and health checkups",
      comingSoon: true
    },
    {
      title: "Health Plans",
      icon: <Heart className="w-8 h-8 text-red-600" />,
      description: "Explore health insurance options",
      comingSoon: true
    }
  ];

  const handleTopicClick = (topic: any) => {
    if (topic.externalUrl) {
      window.open(topic.externalUrl, '_blank');
    } else if (topic.comingSoon) {
      navigate('/coming-soon');
    }
  };

  const handleContactSupport = (method: string) => {
    if (method === 'email') {
      window.location.href = 'mailto:bugevedant@gmail.com';
    } else {
      navigate('/coming-soon');
    }
  };

  const handleFeedback = () => {
    window.location.href = 'mailto:bugevedant@gmail.com?subject=Feature Request - Hello Dr';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="outline" onClick={() => navigate('/doctors')}>
            ← Back to Doctors
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Help Center</h1>
          <div></div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Help Topics */}
        <Card>
          <CardHeader>
            <CardTitle>How can we help you?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {helpTopics.map((topic, index) => (
                <div
                  key={index}
                  className="p-6 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleTopicClick(topic)}
                >
                  <div className="flex items-center space-x-4 mb-3">
                    {topic.icon}
                    <h3 className="text-lg font-semibold">{topic.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-2">{topic.description}</p>
                  {topic.comingSoon && (
                    <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                      Coming Soon
                    </span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="h-20 flex-col space-y-2"
                onClick={() => handleContactSupport('chat')}
              >
                <MessageCircle className="w-6 h-6" />
                <span>Live Chat</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col space-y-2"
                onClick={() => handleContactSupport('phone')}
              >
                <Phone className="w-6 h-6" />
                <span>Call Us</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col space-y-2"
                onClick={() => handleContactSupport('email')}
              >
                <Mail className="w-6 h-6" />
                <span>Email Support</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-semibold mb-2">How do I book an appointment?</h3>
              <p className="text-gray-600">
                You can book an appointment by searching for doctors, selecting your preferred doctor, 
                and choosing an available time slot.
              </p>
            </div>
            <div className="border-b pb-4">
              <h3 className="font-semibold mb-2">Can I cancel or reschedule my appointment?</h3>
              <p className="text-gray-600">
                Yes, you can cancel or reschedule your appointment up to 2 hours before the scheduled time.
              </p>
            </div>
            <div className="border-b pb-4">
              <h3 className="font-semibold mb-2">How do I upload my medical records?</h3>
              <p className="text-gray-600">
                Go to the Medical Records section and use the upload options to add your documents, 
                prescriptions, or test results.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Is my data secure?</h3>
              <p className="text-gray-600">
                Yes, we use industry-standard security measures to protect your personal and medical information.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Feature Request */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              <span>Have a feature in mind?</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              We'd love to hear your suggestions! Send us your ideas to help improve Hello Dr.
            </p>
            <Button onClick={handleFeedback}>
              Send Feedback
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default HelpCenter;
