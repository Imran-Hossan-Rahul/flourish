"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { fetchApi } from "@/lib/api";
import { CalendarDays, MapPin, Users, Mail, Phone, User } from "lucide-react";

export default function EventsPage() {
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    eventType: "Wedding",
    date: "",
    location: "",
    guestCount: "",
    floralPreferences: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      await fetchApi('/events', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      setSuccess(true);
      setFormData({
        clientName: "", clientEmail: "", clientPhone: "", eventType: "Wedding",
        date: "", location: "", guestCount: "", floralPreferences: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Banner */}
      <div className="relative bg-primary text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-10" />
        <div className="container mx-auto px-4 relative z-20 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl md:text-6xl font-bold mb-4"
          >
            Bespoke Event Florals
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/80 max-w-2xl mx-auto text-lg"
          >
            Weddings, corporate galas, and intimate celebrations. Let us transform your venue with breathtaking botanical designs.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-white dark:bg-foreground/5 p-8 md:p-12 rounded-3xl shadow-xl border border-border">
          <div className="mb-10 text-center">
            <h2 className="font-serif text-3xl font-bold text-primary">Inquiry Form</h2>
            <p className="text-foreground/60 mt-2">Please provide details about your upcoming event, and our design team will be in touch shortly.</p>
          </div>

          {success && (
            <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl mb-8 border border-emerald-200 text-center">
              Thank you! Your event booking request has been successfully submitted. We will contact you soon.
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-8 border border-red-200 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                  <User className="w-4 h-4 text-primary" /> Full Name
                </label>
                <input required type="text" name="clientName" value={formData.clientName} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-input border-transparent focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
              </div>
              
              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                  <Mail className="w-4 h-4 text-primary" /> Email Address
                </label>
                <input required type="email" name="clientEmail" value={formData.clientEmail} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-input border-transparent focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                  <Phone className="w-4 h-4 text-primary" /> Phone Number
                </label>
                <input required type="tel" name="clientPhone" value={formData.clientPhone} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-input border-transparent focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
              </div>

              {/* Event Type */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Event Type</label>
                <select name="eventType" value={formData.eventType} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-input border-transparent focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all">
                  <option>Wedding</option>
                  <option>Corporate Gala</option>
                  <option>Birthday / Anniversary</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                  <CalendarDays className="w-4 h-4 text-primary" /> Event Date
                </label>
                <input required type="date" name="date" value={formData.date} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-input border-transparent focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
              </div>

              {/* Guest Count */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                  <Users className="w-4 h-4 text-primary" /> Estimated Guests
                </label>
                <input required type="number" name="guestCount" value={formData.guestCount} onChange={handleChange} min="1"
                  className="w-full px-4 py-3 rounded-lg bg-input border-transparent focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                <MapPin className="w-4 h-4 text-primary" /> Venue Location
              </label>
              <input required type="text" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. The Grand Hotel, Dhaka"
                className="w-full px-4 py-3 rounded-lg bg-input border-transparent focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
            </div>

            {/* Floral Preferences */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Floral Vision & Preferences</label>
              <textarea name="floralPreferences" value={formData.floralPreferences} onChange={handleChange} rows="4" placeholder="Tell us about your theme, preferred colors, specific flowers..."
                className="w-full px-4 py-3 rounded-lg bg-input border-transparent focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"></textarea>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-medium text-lg hover:bg-primary/90 transition-colors disabled:opacity-70 mt-6 shadow-lg shadow-primary/20"
            >
              {isSubmitting ? "Submitting Request..." : "Request Consultation"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
