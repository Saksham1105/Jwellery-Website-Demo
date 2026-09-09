import React from 'react';
import { Instagram, Facebook, Globe } from 'lucide-react';
import { ProductCategory } from '../types';

interface FooterProps {
  onSelectCategory: (cat: ProductCategory) => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onNavigateToSection }) => {
  return (
    <footer id="main-footer" className="bg-[#151413] text-[#FAF8F5] pt-16 sm:pt-20 pb-12 border-t border-[#262422]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Brand & Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 sm:gap-12 pb-16 border-b border-[#2C2926]">
          
          {/* Brand Info (2 columns) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="space-y-1">
              <span className="font-serif text-2xl tracking-[0.24em] text-[#FAF8F5] uppercase block font-light">
                Maison Aurélia
              </span>
              <span className="text-[10px] tracking-[0.38em] uppercase text-[#B76E79] block">
                Haute Joaillerie • Paris
              </span>
            </div>

            <p className="text-xs text-[#9C948B] font-light leading-relaxed max-w-sm">
              Conceived in our historical Place Vendôme atelier, each Maison Aurélia creation unites high-craft goldsmithing with ethical diamonds to celebrate enduring personal legacies.
            </p>

            <div className="pt-2 text-xs text-[#9C948B] space-y-1">
              <p>12 Place Vendôme, 75001 Paris, France</p>
              <p>Private Atelier: concierge@aurelia-paris.com</p>
            </div>
          </div>

          {/* Column 1: Repertoire */}
          <div className="space-y-3 text-xs">
            <h4 className="font-serif text-sm tracking-[0.16em] uppercase text-[#FAF8F5]">
              The Repertoire
            </h4>
            <ul className="space-y-2 text-[#9C948B]">
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('rings');
                    onNavigateToSection('catalog');
                  }}
                  className="hover:text-[#B76E79] transition-colors cursor-pointer"
                >
                  Solitaires & Rings
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('necklaces');
                    onNavigateToSection('catalog');
                  }}
                  className="hover:text-[#B76E79] transition-colors cursor-pointer"
                >
                  Pendants & Collars
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('earrings');
                    onNavigateToSection('catalog');
                  }}
                  className="hover:text-[#B76E79] transition-colors cursor-pointer"
                >
                  Pearls & Ear Huggies
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('bracelets');
                    onNavigateToSection('catalog');
                  }}
                  className="hover:text-[#B76E79] transition-colors cursor-pointer"
                >
                  Tennis Bracelets & Cuffs
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('all');
                    onNavigateToSection('catalog');
                  }}
                  className="hover:text-[#B76E79] transition-colors cursor-pointer"
                >
                  View All Collections
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Client Care */}
          <div className="space-y-3 text-xs">
            <h4 className="font-serif text-sm tracking-[0.16em] uppercase text-[#FAF8F5]">
              Client Concierge
            </h4>
            <ul className="space-y-2 text-[#9C948B]">
              <li>
                <span className="hover:text-[#B76E79] cursor-pointer transition-colors">
                  Complimentary Ring Sizer
                </span>
              </li>
              <li>
                <span className="hover:text-[#B76E79] cursor-pointer transition-colors">
                  Insured Armored Courier
                </span>
              </li>
              <li>
                <span className="hover:text-[#B76E79] cursor-pointer transition-colors">
                  Lifetime Clean & Polish
                </span>
              </li>
              <li>
                <span className="hover:text-[#B76E79] cursor-pointer transition-colors">
                  Authenticity Certification
                </span>
              </li>
              <li>
                <span className="hover:text-[#B76E79] cursor-pointer transition-colors">
                  Book Salon Appointment
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Boutiques & Heritage */}
          <div className="space-y-3 text-xs">
            <h4 className="font-serif text-sm tracking-[0.16em] uppercase text-[#FAF8F5]">
              Flagship Salons
            </h4>
            <div className="space-y-2 text-[#9C948B]">
              <p><strong className="text-[#FAF8F5]">Paris:</strong> Place Vendôme</p>
              <p><strong className="text-[#FAF8F5]">New York:</strong> Madison Avenue</p>
              <p><strong className="text-[#FAF8F5]">London:</strong> New Bond Street</p>
              <p><strong className="text-[#FAF8F5]">Tokyo:</strong> Ginza Chuo-ku</p>
            </div>
          </div>

        </div>

        {/* Bottom Strip: Social, Payment Badges, Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#9C948B]">
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <span className="text-[10px] tracking-widest uppercase text-[#B76E79]">Follow Maison:</span>
            <a href="#instagram" aria-label="Instagram" className="hover:text-[#FAF8F5] transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#facebook" aria-label="Facebook" className="hover:text-[#FAF8F5] transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#global" aria-label="Worldwide Boutiques" className="hover:text-[#FAF8F5] transition-colors">
              <Globe className="w-4 h-4" />
            </a>
          </div>

          {/* Payment Method Badges Placeholders */}
          <div className="flex items-center gap-2 text-[10px] tracking-wider uppercase text-[#D9D2C7]">
            <span className="bg-[#262422] border border-[#3E3A36] px-2.5 py-1">Visa</span>
            <span className="bg-[#262422] border border-[#3E3A36] px-2.5 py-1">Mastercard</span>
            <span className="bg-[#262422] border border-[#3E3A36] px-2.5 py-1">Amex</span>
            <span className="bg-[#262422] border border-[#3E3A36] px-2.5 py-1">Apple Pay</span>
          </div>

          {/* Copyright */}
          <div className="text-[11px] text-center md:text-right">
            <p>© {new Date().getFullYear()} Maison Aurélia Joaillerie. All rights reserved.</p>
          </div>

        </div>

      </div>
    </footer>
  );
};
