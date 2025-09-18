import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Stethoscope, 
  Users, 
  AlertTriangle, 
  MapPin, 
  Clock, 
  FileText,
  UserCheck,
  Activity,
  TrendingUp,
  Calendar
} from 'lucide-react';

const HealthcareDashboard = () => {
  const { user } = useAuth();
  const [selectedCase, setSelectedCase] = useState<number | null>(null);

  const stats = {
    totalCases: 43,
    criticalCases: 5,
    todayCases: 8,
    assignedCases: 12
  };

  const cases = [
    {
      id: 1,
      patientName: 'Anonymous #001',
      symptoms: ['Fever', 'Cough', 'Headache'],
      severity: 'Medium',
      reportedAt: '2 hours ago',
      status: 'Pending',
      notes: '',
      location: 'Camp A, Section 3'
    },
    {
      id: 2,
      patientName: 'Anonymous #002',
      symptoms: ['Chest Pain', 'Difficulty Breathing'],
      severity: 'High',
      reportedAt: '4 hours ago',
      status: 'In Progress',
      notes: 'Patient scheduled for immediate consultation',
      location: 'Camp B, Section 1'
    },
    {
      id: 3,
      patientName: 'Anonymous #003',
      symptoms: ['Stomach Pain', 'Nausea'],
      severity: 'Low',
      reportedAt: '6 hours ago',
      status: 'Resolved',
      notes: 'Provided medication and dietary advice',
      location: 'Community Center'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-destructive text-destructive-foreground';
      case 'Medium': return 'bg-warning text-warning-foreground';
      case 'Low': return 'bg-success text-success-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-warning/20 text-warning border-warning/20';
      case 'In Progress': return 'bg-primary/20 text-primary border-primary/20';
      case 'Resolved': return 'bg-success/20 text-success border-success/20';
      default: return 'bg-secondary/20 text-secondary border-secondary/20';
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
          <h1 className="text-3xl font-bold text-foreground">Healthcare Provider Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Dr. {user?.name}</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Cases', value: stats.totalCases, icon: Users, color: 'text-primary' },
            { label: 'Critical Cases', value: stats.criticalCases, icon: AlertTriangle, color: 'text-destructive' },
            { label: 'Today\'s Cases', value: stats.todayCases, icon: Activity, color: 'text-accent' },
            { label: 'Assigned to Me', value: stats.assignedCases, icon: UserCheck, color: 'text-success' }
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
          {/* Case Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-primary" />
                  Patient Cases
                </CardTitle>
                <CardDescription>
                  Review and manage refugee symptom reports
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {cases.map((case_, index) => (
                  <motion.div
                    key={case_.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className={`p-4 rounded-lg border transition-all cursor-pointer ${
                      selectedCase === case_.id ? 'bg-primary/5 border-primary' : 'bg-card hover:bg-accent/5'
                    }`}
                    onClick={() => setSelectedCase(selectedCase === case_.id ? null : case_.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold">{case_.patientName}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getSeverityColor(case_.severity)}>
                            {case_.severity} Priority
                          </Badge>
                          <Badge variant="outline" className={getStatusColor(case_.status)}>
                            {case_.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {case_.reportedAt}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" />
                          {case_.location}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {case_.symptoms.map((symptom) => (
                        <Badge key={symptom} variant="secondary" className="text-xs">
                          {symptom}
                        </Badge>
                      ))}
                    </div>

                    {selectedCase === case_.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-3 pt-3 border-t"
                      >
                        <div>
                          <label className="text-sm font-medium">Notes:</label>
                          <Textarea 
                            placeholder="Add your notes here..."
                            className="mt-1"
                            defaultValue={case_.notes}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Assign to Volunteer
                          </Button>
                          <Button size="sm" variant="outline">
                            Schedule Consultation
                          </Button>
                          <Button size="sm">
                            Update Status
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Resource Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Resource Map
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-accent/10 rounded-lg p-8 text-center">
                    <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground mb-4">
                      Interactive map showing hospitals, camps, and vaccination sites
                    </p>
                    <Button size="sm" className="w-full">
                      Open Full Map
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Clinic Visit
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthcareDashboard;