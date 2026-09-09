import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Lock, CreditCard, Truck, ArrowLeft } from 'lucide-react';
import { CartItem, ShippingFormData } from '../types';
import { SafeImage } from './SafeImage';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderPlaced: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderPlaced,
}) => {
  const [formData, setFormData] = useState<ShippingFormData>({
    firstName: 'Eleanor',
    lastName: 'Vance',
    email: 'eleanor.vance@luxury-estate.com',
    phone: '+1 (555) 234-8901',
    address: '740 Park Avenue',
    apartment: 'Suite 14B',
    city: 'New York',
    state: 'NY',
    postalCode: '10021',
    country: 'United States',
    shippingMethod: 'complimentary',
    cardNumber: '•••• •••• •••• 4242',
    cardExpiry: '08/29',
    cardCvc: '888',
    giftWrap: true,
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingCost = formData.shippingMethod === 'express' ? 120 : 0;
  const estimatedTax = 0; // High jewelry luxury tax included or zero
  const total = subtotal + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate luxury order verification
    setTimeout(() => {
      const generatedOrderNum = `MA-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(generatedOrderNum);
      setIsProcessing(false);
      setOrderConfirmed(true);
      onOrderPlaced();
    }, 1200);
  };

  const handleResetAndClose = () => {
    setOrderConfirmed(false);
    onClose();
  };

  return (
    <div
      id="checkout-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#1D1B19]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-fadeIn"
    >
      <div
        id="checkout-modal-container"
        className="relative bg-[#FAF8F5] w-full max-w-4xl shadow-2xl border border-[#EAE5DD] my-8 overflow-hidden"
      >
        {/* Header Bar */}
        <div className="bg-[#FFFDF9] px-6 py-5 border-b border-[#EAE5DD] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif text-xl sm:text-2xl tracking-[0.18em] uppercase text-[#1D1B19]">
              Maison Aurélia
            </span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#9A535E] border-l border-[#D9D2C7] pl-3">
              Secure Atelier Checkout
            </span>
          </div>

          <button
            onClick={handleResetAndClose}
            aria-label="Close Checkout"
            className="p-2 text-[#6D6862] hover:text-[#1D1B19] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confirmation Screen */}
        {orderConfirmed ? (
          <div id="order-confirmation-screen" className="p-8 sm:p-14 text-center space-y-6 max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#EBF4EE] text-[#2E6B4F] flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] tracking-[0.28em] uppercase text-[#B76E79] font-semibold">
                Order Confirmed • Receipt Sent
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#1D1B19] font-light">
                Thank You, {formData.firstName}
              </h3>
              <p className="text-sm text-[#6D6862] leading-relaxed pt-1">
                Your order <strong className="text-[#1D1B19]">{orderNumber}</strong> has been received by our Paris atelier. A master jeweler is preparing your pieces with white-glove inspection.
              </p>
            </div>

            {/* Order Recap Card */}
            <div className="bg-[#FFFDF9] border border-[#EAE5DD] p-6 text-left space-y-4 text-xs">
              <div className="flex justify-between border-b border-[#EAE5DD] pb-3">
                <span className="text-[#6D6862]">Delivery Destination:</span>
                <span className="font-medium text-[#1D1B19] text-right">
                  {formData.address}, {formData.apartment ? `${formData.apartment}, ` : ''}{formData.city}, {formData.state} {formData.postalCode}
                </span>
              </div>
              <div className="flex justify-between border-b border-[#EAE5DD] pb-3">
                <span className="text-[#6D6862]">Courier Protocol:</span>
                <span className="font-medium text-[#1D1B19]">
                  {formData.shippingMethod === 'express' ? 'White-Glove Armored Courier' : 'Complimentary Insured Courier'}
                </span>
              </div>
              <div className="flex justify-between border-b border-[#EAE5DD] pb-3">
                <span className="text-[#6D6862]">Packaging & Enclosure:</span>
                <span className="font-medium text-[#2E6B4F]">
                  Signature Velvet Presentation Casket with Wax Seal
                </span>
              </div>
              <div className="flex justify-between pt-1 text-sm font-medium">
                <span className="text-[#1D1B19]">Total Paid:</span>
                <span className="font-serif text-base text-[#1D1B19]">${total.toLocaleString()}</span>
              </div>
            </div>

            {/* Note & Close Action */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                id="confirmation-continue-shopping-btn"
                onClick={handleResetAndClose}
                className="w-full sm:w-auto px-8 py-4 bg-[#1D1B19] hover:bg-[#B76E79] active:bg-[#9A535E] text-[#FAF8F5] text-xs tracking-[0.2em] uppercase font-medium transition-colors cursor-pointer"
              >
                Return to Boutique
              </button>
            </div>

            <p className="text-[11px] text-[#9C948B]">
              A confirmation email and tracking link have been dispatched to {formData.email}.
            </p>
          </div>
        ) : (
          /* Checkout Form & Summary Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[82vh] overflow-y-auto">
            
            {/* Left: Shipping & Payment Form (7 columns) */}
            <form onSubmit={handleSubmitOrder} className="lg:col-span-7 p-6 sm:p-8 space-y-6 border-b lg:border-b-0 lg:border-r border-[#EAE5DD]">
              
              {/* Client Details */}
              <div className="space-y-4">
                <h4 className="font-serif text-lg text-[#1D1B19] tracking-wide flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#1D1B19] text-[#FAF8F5] text-[10px] flex items-center justify-center font-sans font-medium">1</span>
                  Client & Shipping Address
                </h4>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#6D6862] mb-1">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2.5 bg-[#FFFDF9] border border-[#D9D2C7] focus:border-[#B76E79] text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#6D6862] mb-1">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2.5 bg-[#FFFDF9] border border-[#D9D2C7] focus:border-[#B76E79] text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#6D6862] mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2.5 bg-[#FFFDF9] border border-[#D9D2C7] focus:border-[#B76E79] text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#6D6862] mb-1">Phone (Courier Contact)</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2.5 bg-[#FFFDF9] border border-[#D9D2C7] focus:border-[#B76E79] text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#6D6862] mb-1">Street Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2.5 bg-[#FFFDF9] border border-[#D9D2C7] focus:border-[#B76E79] text-xs focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#6D6862] mb-1">Suite / Apt</label>
                    <input
                      type="text"
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleInputChange}
                      className="w-full p-2.5 bg-[#FFFDF9] border border-[#D9D2C7] focus:border-[#B76E79] text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#6D6862] mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2.5 bg-[#FFFDF9] border border-[#D9D2C7] focus:border-[#B76E79] text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#6D6862] mb-1">Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2.5 bg-[#FFFDF9] border border-[#D9D2C7] focus:border-[#B76E79] text-xs focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Delivery Method */}
              <div className="space-y-3 pt-3 border-t border-[#EAE5DD]">
                <h4 className="font-serif text-lg text-[#1D1B19] tracking-wide flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#1D1B19] text-[#FAF8F5] text-[10px] flex items-center justify-center font-sans font-medium">2</span>
                  Courier Selection
                </h4>

                <div className="space-y-2">
                  <label
                    className={`flex items-start justify-between p-3 border cursor-pointer transition-colors ${
                      formData.shippingMethod === 'complimentary'
                        ? 'border-[#B76E79] bg-[#FFFDF9]'
                        : 'border-[#D9D2C7] bg-[#FAF8F5]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="shippingMethod"
                        value="complimentary"
                        checked={formData.shippingMethod === 'complimentary'}
                        onChange={() => setFormData((prev) => ({ ...prev, shippingMethod: 'complimentary' }))}
                        className="mt-0.5 accent-[#B76E79]"
                      />
                      <div>
                        <p className="text-xs font-medium text-[#1D1B19]">Complimentary Insured Courier</p>
                        <p className="text-[11px] text-[#6D6862]">Direct signature required, fully insured transit (2–4 business days)</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[#2E6B4F]">Free</span>
                  </label>

                  <label
                    className={`flex items-start justify-between p-3 border cursor-pointer transition-colors ${
                      formData.shippingMethod === 'express'
                        ? 'border-[#B76E79] bg-[#FFFDF9]'
                        : 'border-[#D9D2C7] bg-[#FAF8F5]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="shippingMethod"
                        value="express"
                        checked={formData.shippingMethod === 'express'}
                        onChange={() => setFormData((prev) => ({ ...prev, shippingMethod: 'express' }))}
                        className="mt-0.5 accent-[#B76E79]"
                      />
                      <div>
                        <p className="text-xs font-medium text-[#1D1B19]">White-Glove Overnight Armored Delivery</p>
                        <p className="text-[11px] text-[#6D6862]">Dedicated security courier, tailored delivery appointment window</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[#1D1B19]">$120</span>
                  </label>
                </div>
              </div>

              {/* Payment UI Simulation */}
              <div className="space-y-3 pt-3 border-t border-[#EAE5DD]">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-lg text-[#1D1B19] tracking-wide flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#1D1B19] text-[#FAF8F5] text-[10px] flex items-center justify-center font-sans font-medium">3</span>
                    Payment Information
                  </h4>
                  <span className="text-[10px] tracking-wider uppercase text-[#2E6B4F] flex items-center gap-1 font-medium">
                    <Lock className="w-3 h-3" />
                    Demo Mode (No Real Charge)
                  </span>
                </div>

                <div className="space-y-3 bg-[#FFFDF9] p-4 border border-[#EAE5DD]">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#6D6862] mb-1">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full p-2.5 bg-white border border-[#D9D2C7] focus:border-[#B76E79] text-xs focus:outline-none pr-10 font-mono"
                      />
                      <CreditCard className="w-4 h-4 text-[#9C948B] absolute right-3 top-3" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#6D6862] mb-1">Expiration Date</label>
                      <input
                        type="text"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        className="w-full p-2.5 bg-white border border-[#D9D2C7] focus:border-[#B76E79] text-xs focus:outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#6D6862] mb-1">Security Code (CVV)</label>
                      <input
                        type="text"
                        name="cardCvc"
                        value={formData.cardCvc}
                        onChange={handleInputChange}
                        className="w-full p-2.5 bg-white border border-[#D9D2C7] focus:border-[#B76E79] text-xs focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Place Order Submit */}
              <div className="pt-2">
                <button
                  id="place-order-submit-btn"
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 bg-[#1D1B19] hover:bg-[#B76E79] active:bg-[#9A535E] text-[#FAF8F5] text-xs tracking-[0.22em] uppercase font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md disabled:opacity-70"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Authorizing Order...
                    </span>
                  ) : (
                    <span>Place Order — ${total.toLocaleString()}</span>
                  )}
                </button>
              </div>
            </form>

            {/* Right: Order Summary Sidebar (5 columns) */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-[#F3EFE9] flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h4 className="font-serif text-lg text-[#1D1B19] tracking-wide border-b border-[#EAE5DD] pb-3">
                  Order Summary ({items.reduce((s, i) => s + i.quantity, 0)} Items)
                </h4>

                {/* Items Mini List */}
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={item.cartId} className="flex gap-3 items-center">
                      <div className="w-14 h-14 bg-white shrink-0 overflow-hidden border border-[#EAE5DD] relative">
                        <SafeImage src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-serif text-xs text-[#1D1B19] truncate">{item.product.name}</p>
                        <p className="text-[10px] text-[#6D6862]">{item.selectedMaterial} • Qty: {item.quantity}</p>
                      </div>
                      <span className="text-xs font-semibold text-[#1D1B19]">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Pricing Summary */}
                <div className="border-t border-[#EAE5DD] pt-4 space-y-2 text-xs text-[#6D6862]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium text-[#1D1B19]">${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Courier</span>
                    <span className="text-[#1D1B19]">
                      {shippingCost === 0 ? 'Complimentary' : `$${shippingCost}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Duties & Taxes</span>
                    <span className="text-[#1D1B19]">Included</span>
                  </div>
                  <div className="flex justify-between text-base font-serif pt-3 border-t border-[#EAE5DD] text-[#1D1B19]">
                    <span>Total Amount</span>
                    <span className="font-sans font-semibold">${total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Reassurance Block */}
              <div className="bg-[#FFFDF9] p-4 border border-[#EAE5DD] space-y-2.5 text-[11px] text-[#6D6862]">
                <div className="flex items-center gap-2 text-[#1D1B19] font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#B76E79]" />
                  <span>The Maison Aurélia Guarantee</span>
                </div>
                <p className="leading-relaxed">
                  Every creation is accompanied by an individual Certificate of Authenticity, lifetime atelier cleaning, and complimentary ring resizing within 60 days.
                </p>
              </div>

            </div>

          </div>
        )}
      </div>
    </div>
  );
};
