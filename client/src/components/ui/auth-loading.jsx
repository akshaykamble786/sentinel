import { Loader2, Shield } from "lucide-react";

export function AuthLoading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* Animated logo/icon */}
        <div className="relative mx-auto w-24 h-24">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/40 rounded-2xl blur-xl animate-pulse" />
          <div className="relative bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 shadow-2xl animate-bounce">
            <Shield className="w-12 h-12 text-primary-foreground" />
          </div>
        </div>

        {/* Loading text */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-foreground animate-fade-in">
            Authenticating...
          </h1>
          <p className="text-muted-foreground max-w-sm mx-auto animate-fade-in-delay">
            Verifying your credentials and securing your session
          </p>
        </div>           

        {/* Spinning loader */}
        <div className="mt-8">
          <Loader2 className="w-8 h-8 text-primary mx-auto animate-spin" />
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        
        .animate-fade-in-delay {
          animation: fade-in 0.6s ease-out 0.2s forwards;
          opacity: 0;
        }
        
        .animate-fade-in-delay-2 {
          animation: fade-in 0.6s ease-out 0.4s forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
