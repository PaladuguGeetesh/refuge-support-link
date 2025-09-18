import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Heart, Shield, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('refugee');
  const { login, isLoading } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      await login(email, password, role);
      toast({
        title: "Welcome!",
        description: "Successfully logged in",
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again",
        variant: "destructive",
      });
    }
  };

  const roleOptions = [
    { value: 'refugee' as UserRole, label: 'Refugee', icon: Heart, description: 'Get medical help and find services' },
    { value: 'healthcare_provider' as UserRole, label: 'Healthcare Provider', icon: Shield, description: 'Manage patient cases and provide care' },
    { value: 'aid_coordinator' as UserRole, label: 'Aid Coordinator', icon: Users, description: 'Coordinate campaigns and resources' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              RefugeeCare
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Connecting refugees with healthcare and humanitarian aid
          </p>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Card className="shadow-elegant border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-semibold text-center">Welcome Back</CardTitle>
              <CardDescription className="text-center">
                Sign in to access your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Role Selection */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Select Your Role</Label>
                  <RadioGroup value={role} onValueChange={(value) => setRole(value as UserRole)}>
                    {roleOptions.map((option) => (
                      <motion.div
                        key={option.value}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Label
                          htmlFor={option.value}
                          className="flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-accent/5 transition-colors"
                        >
                          <RadioGroupItem value={option.value} id={option.value} />
                          <option.icon className="w-5 h-5 text-primary" />
                          <div className="flex-1">
                            <div className="font-medium">{option.label}</div>
                            <div className="text-sm text-muted-foreground">{option.description}</div>
                          </div>
                        </Label>
                      </motion.div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                {/* Login Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-200 shadow-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.p 
          className="text-center text-sm text-muted-foreground mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Secure, confidential, and always available
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;