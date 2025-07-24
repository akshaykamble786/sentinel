import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Check, Globe, Lock, Shield, Users, Smartphone, Zap } from "lucide-react";

const Features = () => {
  return (
    <>
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Manage All of Your
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Passwords In One Place
              </span>
              <br />
              Efficiently
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl leading-relaxed">
              Manage your passwords, timelines and team mates all at once. Set
              and follow timelines, assign tasks and keep your projects in
              check.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md">
              <Input
                placeholder="Enter your email"
                className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-400 rounded-full px-6 py-3 text-lg"
              />
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100 rounded-full px-8 py-3 font-semibold"
              >
                Get started
              </Button>
            </div>
          </div>

          {/* Floating Cards */}
          <div className="absolute right-0 top-20 hidden lg:block">
            <div className="relative">
              <Card className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 border-purple-500/20 backdrop-blur-sm w-80 mb-6">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-purple-400" />
                      <span className="text-white font-medium">Sentinel</span>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="text-white font-semibold mb-2">
                    Password Vault
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">Gmail</span>
                      <span className="text-green-400">●●●●●●●●</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">GitHub</span>
                      <span className="text-green-400">●●●●●●●●</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">Netflix</span>
                      <span className="text-green-400">●●●●●●●●</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-blue-500/20 backdrop-blur-sm w-72 ml-8">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <Lock className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-medium text-sm">
                        Security Alert
                      </div>
                      <div className="text-gray-400 text-xs">
                        2 weak passwords detected
                      </div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20"
                  >
                    Review Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section> 
    
      {/* Features Section */}
      <section
        id="features"
        className="py-20 px-6 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black"
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">
              Everything you need for password security
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Comprehensive password management with enterprise-grade security
              and seamless user experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white">Password Generator</CardTitle>
                <CardDescription className="text-gray-400">
                  Create unbreakable passwords with customizable length and
                  complexity
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:border-purple-500/50 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white">Cross-Device Sync</CardTitle>
                <CardDescription className="text-gray-400">
                  Access your passwords seamlessly across all your devices and
                  platforms
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:border-purple-500/50 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white">Auto-Fill</CardTitle>
                <CardDescription className="text-gray-400">
                  Automatically fill login forms with one click across websites
                  and apps
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:border-purple-500/50 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white">Secure Sharing</CardTitle>
                <CardDescription className="text-gray-400">
                  Share passwords safely with family and team members with
                  granular permissions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:border-purple-500/50 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white">
                  Security Monitoring
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Get alerts for weak, reused, or compromised passwords in
                  real-time
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:border-purple-500/50 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white">Emergency Access</CardTitle>
                <CardDescription className="text-gray-400">
                  Grant trusted contacts emergency access to your vault when
                  needed
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section
        id="security"
        className="py-20 px-6 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black"
      >
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-bold text-white mb-6">
                Bank-level security you can trust
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Your data is protected with military-grade encryption and
                zero-knowledge architecture. We can't see your passwords, and
                neither can anyone else.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg">
                      AES-256 Encryption
                    </h3>
                    <p className="text-gray-400">
                      Military-grade encryption protects your data
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg">
                      Zero-Knowledge Architecture
                    </h3>
                    <p className="text-gray-400">
                      We never see or store your master password
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg">
                      Multi-Factor Authentication
                    </h3>
                    <p className="text-gray-400">
                      Add extra layers of security to your account
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg">
                      Regular Security Audits
                    </h3>
                    <p className="text-gray-400">
                      Third-party security assessments and compliance
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/80 to-blue-600/80"></div>
                <div className="relative z-10">
                  <Shield className="h-16 w-16 mb-6" />
                  <h3 className="text-2xl font-bold mb-4">Your data is safe</h3>
                  <p className="text-purple-100 mb-8">
                    End-to-end encryption ensures that only you can access your
                    passwords. Not even we can see them.
                  </p>
                  <div className="grid grid-cols-2 gap-6 text-center">
                    <div>
                      <div className="text-4xl font-bold">256-bit</div>
                      <div className="text-purple-200 text-sm">Encryption</div>
                    </div>
                    <div>
                      <div className="text-4xl font-bold">99.9%</div>
                      <div className="text-purple-200 text-sm">Uptime</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black"></div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-5xl font-bold mb-6 text-white">
            Ready to secure your digital life?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join millions of users who trust Sentinel to keep their passwords
            safe. Start your free trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input
              placeholder="Enter your email"
              className="bg-white/10 border-white/20 text-white placeholder:text-purple-200 rounded-full px-6 py-3"
            />
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 rounded-full px-8 py-3 font-semibold"
            >
              Get started
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
