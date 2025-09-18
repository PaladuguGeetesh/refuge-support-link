import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Heart, 
  MapPin, 
  Calendar, 
  Phone, 
  MessageSquare, 
  Mic, 
  AlertCircle,
  Navigation,
  Clock,
  Users
} from 'lucide-react';

const RefugeeDashboard = () => {
  const { user } = useAuth();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const symptoms = [
    'Fever', 'Cough', 'Headache', 'Fatigue', 'Nausea', 'Chest Pain', 'Difficulty Breathing', 'Stomach Pain'
  ];

  const triageAdvice = {
    fever: { severity: 'Medium', advice: 'Mild fever – rest and fluids. Visit clinic if persists over 3 days.' },
    cough: { severity: 'Low', advice: 'Persistent cough – stay hydrated. Seek help if blood is present.' },
    chest_pain: { severity: 'High', advice: 'Chest pain requires immediate medical attention. Go to nearest emergency facility.' },
    breathing: { severity: 'High', advice: 'Difficulty breathing is serious. Seek emergency care immediately.' }
  };

  const nearbyServices = [
    { name: 'Central Health Clinic', type: 'Hospital', distance: '1.2 km', phone: '+1-555-0123' },
    { name: 'Refugee Camp Medical Unit', type: 'Medical Camp', distance: '2.5 km', phone: '+1-555-0124' },
    { name: 'Mobile Vaccination Unit', type: 'Vaccination', distance: '0.8 km', phone: '+1-555-0125' }
  ];

  const campaigns = [
    {
      name: 'Polio Vaccination Drive',
      location: 'Community Center',
      date: '2024-01-15',
      time: '9:00 AM - 4:00 PM',
      facilities: ['Medical', 'Food', 'Water']
    },
    {
      name: 'Mental Health Support',
      location: 'Health Clinic',
      date: '2024-01-18',
      time: '10:00 AM - 2:00 PM',
      facilities: ['Medical', 'Counseling']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <h1 className="text-3xl font-bold text-foreground">Welcome, {user?.name}</h1>
          <p className="text-muted-foreground">Get the healthcare assistance you need</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Symptom Checker */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  Symptom Checker
                </CardTitle>
                <CardDescription>
                  Tell us about your symptoms to get medical guidance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {symptoms.map((symptom) => (
                    <Badge
                      key={symptom}
                      variant={selectedSymptoms.includes(symptom) ? "default" : "outline"}
                      className="cursor-pointer transition-colors"
                      onClick={() => {
                        setSelectedSymptoms(prev =>
                          prev.includes(symptom)
                            ? prev.filter(s => s !== symptom)
                            : [...prev, symptom]
                        );
                      }}
                    >
                      {symptom}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Text Input
                  </Button>
                  <Button variant="outline">
                    <Mic className="w-4 h-4" />
                  </Button>
                </div>

                {selectedSymptoms.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-4 bg-accent/10 rounded-lg border-l-4 border-warning"
                  >
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-warning mt-0.5" />
                      <div>
                        <p className="font-medium">Preliminary Guidance</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Based on fever symptoms: Rest, stay hydrated, and monitor temperature. 
                          Visit a clinic if symptoms persist or worsen.
                        </p>
                        <Badge variant="secondary" className="mt-2">Medium Priority</Badge>
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Nearby Services */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Nearby Services
                </CardTitle>
                <CardDescription>
                  Healthcare facilities and services near you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {nearbyServices.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-card rounded-lg border hover:shadow-md transition-shadow"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium">{service.name}</h4>
                      <p className="text-sm text-muted-foreground">{service.type} • {service.distance}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Navigation className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Phone className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
                <Button className="w-full mt-4" variant="outline">
                  <MapPin className="w-4 h-4 mr-2" />
                  View Full Map
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Campaigns Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Upcoming Campaigns & Services
              </CardTitle>
              <CardDescription>
                Health campaigns and aid services available to you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {campaigns.map((campaign, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border"
                  >
                    <h4 className="font-semibold text-lg mb-2">{campaign.name}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{campaign.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{campaign.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{campaign.time}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      {campaign.facilities.map((facility) => (
                        <Badge key={facility} variant="secondary" className="text-xs">
                          {facility}
                        </Badge>
                      ))}
                    </div>
                    <Button size="sm" className="w-full mt-3">
                      <Users className="w-4 h-4 mr-2" />
                      Register
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default RefugeeDashboard;