import React from 'react';
import Logo from './Logo';
import { Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full py-16 px-6 md:px-12 border-t bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="md:col-span-2 space-y-6">
            <Logo />
            <p className="text-muted-foreground max-w-xs">
              Secure and transparent password management.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.x.com/awkshhay" target="_blank" className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 3.01s-2.018 1.192-3.14 1.53a4.48 4.48 0 00-7.86 3v1a10.66 10.66 0 01-9-4.53s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5 0-.278-.028-.556-.08-.83C21.94 5.674 23 3.01 23 3.01z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="https://akshhay.vercel.app" target="_blank" className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
              <Globe />
              </a>
            </div>
          </div>
          
          <div className="space-y-4 md:col-start-5 md:col-span-1 md:justify-self-end">
            <h4 className="font-medium text-lg text-foreground">Product</h4>
            <ul className="space-y-3">
              <li><a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Integrations</a></li>
              <li><a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Updates</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Roadmap</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-muted-foreground text-sm">
          <div>© 2025 Sentinel. All rights reserved.</div>
          
        <div className="flex flex-row space-x-6 text-center">
          <p className="text-sm text-gray-400">
            Built by&nbsp;
            <a
              href="https://www.x.com/awkshhay"
              target="_blank"
              rel="noopener noreferrer"
            >
              <u>Akshay Kamble</u>
            </a>
          </p>
          <p className="text-sm text-gray-400">
            <a
              href="https://www.github.com/akshaykamble786/sentinel"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source code available on&nbsp;
              <u>GitHub</u>
            </a>
          </p>
        </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;