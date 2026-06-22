export const clinicName = "The Tooth Wellness Dental Clinic";
export const clinicShort = "The Tooth Wellness";
export const tagline = "Where Smile Begins";
export const doctorName = "Dr. Manisha";
export const doctorCredentials = "BDS";
export const phone = "+917973369195";
export const phoneDisplay = "+91 79733 69195";
export const whatsapp = "917973369195";
export const address = "SCO No. 14, SBP Homes, Sector 126, Kharar, Punjab";
export const city = "Kharar";
export const region = "Punjab";

// Google Maps embed for SCO 14, SBP Homes, Sector 126, Kharar
export const mapEmbedUrl =
  "https://www.google.com/maps?q=SBP+Homes+Sector+126+Kharar+Punjab&output=embed";
export const mapDirectionsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=" +
  encodeURIComponent("SCO 14, SBP Homes, Sector 126, Kharar, Punjab");

export const hours = [
  { day: "Monday", time: "10:00 AM – 8:00 PM", closed: false },
  { day: "Tuesday", time: "10:00 AM – 8:00 PM", closed: false },
  { day: "Wednesday", time: "10:00 AM – 8:00 PM", closed: false },
  { day: "Thursday", time: "10:00 AM – 8:00 PM", closed: false },
  { day: "Friday", time: "10:00 AM – 8:00 PM", closed: false },
  { day: "Saturday", time: "10:00 AM – 8:00 PM", closed: false },
  { day: "Sunday", time: "Closed", closed: true },
];

export const hoursShort = "Mon – Sat · 10 AM – 8 PM";

export const whatsappLink = (msg: string) =>
  `https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`;

export const telLink = `tel:${phone}`;
