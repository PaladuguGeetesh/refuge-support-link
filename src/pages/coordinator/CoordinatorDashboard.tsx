import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Megaphone, 
  Plus, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Edit,
  Trash2,
  Send,
  BarChart3,
  Target,
  Globe
} from 'lucide-react';

const CoordinatorDashboard = () => {
  const { user } = useAuth();
  const [showAddCampaign, setShowAddCampaign] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    location: '',
    latitude: '',
    longitude: '',
    date: '',
    startTime: '',
    endTime: '',
    description: '',
    facilities: [] as string[]
  });

  const stats = {
    activeCampaigns: 12,
    totalReach: 1547,
    completedCampaigns: 28,
    volunteersEngaged: 89
  };

  const campaigns = [
    {
      id: 1,
      name: 'Polio Vaccination Drive',
      location: 'Community Center Alpha',
      coordinates: { lat: 40.7128, lng: -74.0060 },
      date: '2024-01-15',
      time: '9:00 AM - 4:00 PM',
      description: 'Free polio vaccination for children under 5 years',
      facilities: ['Medical', 'Food', 'Water'],
      status: 'Active',
      participants: 156
    },
    {
      id: 2,
      name: 'Mental Health Support Session',
      location: 'Health Clinic Beta',
      coordinates: { lat: 40.7589, lng: -73.9851 },
      date: '2024-01-18',
      time: '10:00 AM - 2:00 PM',
      description: 'Counseling and mental health support services',
      facilities: ['Medical', 'Counseling'],
      status: 'Upcoming',
      participants: 45
    },
    {
      id: 3,
      name: 'Emergency Food Distribution',
      location: 'Refugee Camp Gamma',
      coordinates: { lat: 40.7831, lng: -73.9712 },
      date: '2024-01-20',
      time: '8:00 AM - 6:00 PM',
      description: 'Emergency food packages for displaced families',
      facilities: ['Food', 'Water', 'Shelter'],
      status: 'Planning',
      participants: 0
    }
  ];

  const facilityOptions = ['Medical', 'Food', 'Water', 'Shelter', 'Counseling', 'Education', 'Legal Aid'];

  const handleFacilityChange = (facility: string, checked: boolean) => {
    setNewCampaign(prev => ({
      ...prev,
      facilities: checked 
        ? [...prev.facilities, facility]
        : prev.facilities.filter(f => f !== facility)
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-success text-success-foreground';
      case 'Upcoming': return 'bg-primary text-primary-foreground';
      case 'Planning': return 'bg-warning text-warning-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <h1 className="text-3xl font-bold text-foreground">Aid Coordinator Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Active Campaigns', value: stats.activeCampaigns, icon: Target, color: 'text-primary' },
            { label: 'Total Reach', value: stats.totalReach, icon: Users, color: 'text-accent' },
            { label: 'Completed', value: stats.completedCampaigns, icon: BarChart3, color: 'text-success' },
            { label: 'Volunteers', value: stats.volunteersEngaged, icon: Globe, color: 'text-warning' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="shadow-card hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Campaign Management */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Megaphone className="w-5 h-5 text-primary" />
                    Campaign Management
                  </CardTitle>
                  <CardDescription>
                    Create and manage humanitarian aid campaigns
                  </CardDescription>
                </div>
                <Button 
                  onClick={() => setShowAddCampaign(!showAddCampaign)}
                  className="bg-gradient-to-r from-primary to-accent"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Campaign
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {showAddCampaign && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-4 bg-accent/10 rounded-lg border space-y-4"
                  >
                    <h4 className="font-semibold">Create New Campaign</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Campaign Name</Label>
                        <Input 
                          id="name"
                          value={newCampaign.name}
                          onChange={(e) => setNewCampaign(prev => ({...prev, name: e.target.value}))}
                          placeholder="e.g., Emergency Medical Drive"
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input 
                          id="location"
                          value={newCampaign.location}
                          onChange={(e) => setNewCampaign(prev => ({...prev, location: e.target.value}))}
                          placeholder="e.g., Community Center"
                        />
                      </div>
                      <div>
                        <Label htmlFor="latitude">Latitude</Label>
                        <Input 
                          id="latitude"
                          value={newCampaign.latitude}
                          onChange={(e) => setNewCampaign(prev => ({...prev, latitude: e.target.value}))}
                          placeholder="e.g., 40.7128"
                        />
                      </div>
                      <div>
                        <Label htmlFor="longitude">Longitude</Label>
                        <Input 
                          id="longitude"
                          value={newCampaign.longitude}
                          onChange={(e) => setNewCampaign(prev => ({...prev, longitude: e.target.value}))}
                          placeholder="e.g., -74.0060"
                        />
                      </div>
                      <div>
                        <Label htmlFor="date">Date</Label>
                        <Input 
                          id="date"
                          type="date"
                          value={newCampaign.date}
                          onChange={(e) => setNewCampaign(prev => ({...prev, date: e.target.value}))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="time">Time Range</Label>
                        <div className="flex gap-2">
                          <Input 
                            type="time"
                            value={newCampaign.startTime}
                            onChange={(e) => setNewCampaign(prev => ({...prev, startTime: e.target.value}))}
                          />
                          <Input 
                            type="time"
                            value={newCampaign.endTime}
                            onChange={(e) => setNewCampaign(prev => ({...prev, endTime: e.target.value}))}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea 
                        value={newCampaign.description}
                        onChange={(e) => setNewCampaign(prev => ({...prev, description: e.target.value}))}
                        placeholder="Describe the campaign objectives and details..."
                      />
                    </div>
                    <div>
                      <Label>Facilities Offered</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                        {facilityOptions.map((facility) => (
                          <div key={facility} className="flex items-center space-x-2">
                            <Checkbox 
                              id={facility}
                              checked={newCampaign.facilities.includes(facility)}
                              onCheckedChange={(checked) => handleFacilityChange(facility, checked as boolean)}
                            />
                            <Label htmlFor={facility} className="text-sm">{facility}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1">Create Campaign</Button>
                      <Button variant="outline" onClick={() => setShowAddCampaign(false)}>Cancel</Button>
                    </div>
                  </motion.div>
                )}

                {campaigns.map((campaign, index) => (
                  <motion.div
                    key={campaign.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">{campaign.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{campaign.description}</p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Badge className={getStatusColor(campaign.status)}>
                          {campaign.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm mb-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{campaign.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{campaign.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{campaign.participants} participants</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {campaign.facilities.map((facility) => (
                        <Badge key={facility} variant="secondary" className="text-xs">
                          {facility}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        <Send className="w-4 h-4 mr-2" />
                        Broadcast
                      </Button>
                      <Button size="sm" variant="outline" className="text-destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Broadcast Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5 text-primary" />
                  Broadcast Updates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea 
                  placeholder="Send important updates to refugees and staff..."
                  className="min-h-[100px]"
                />
                <Button className="w-full bg-gradient-to-r from-primary to-accent">
                  <Send className="w-4 h-4 mr-2" />
                  Send Broadcast
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Today's Broadcasts</span>
                  <Badge variant="secondary">5</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Active Volunteers</span>
                  <Badge variant="secondary">23</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Pending Approvals</span>
                  <Badge variant="secondary">3</Badge>
                </div>
                <Button variant="outline" className="w-full">
                  View Full Analytics
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorDashboard;