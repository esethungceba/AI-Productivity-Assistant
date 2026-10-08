// DEMO / SAMPLE DATA — for demonstration only. Not real clients.

export type JobStatus = "Scheduled" | "In Progress" | "Completed" | "Delayed" | "Cancelled";
export type Priority = "High" | "Medium" | "Low";
export type ClientStatus = "New" | "Active" | "Pending" | "Completed" | "Cancelled";

export const CLEANERS = [
  { name: "Thandi", available: true },
  { name: "Lerato", available: true },
  { name: "Nomsa", available: true },
  { name: "Ayanda", available: false },
];

export const SERVICES = [
  "Standard Home Cleaning",
  "Deep Cleaning",
  "Office Cleaning",
  "Move-out Cleaning",
  "Window Cleaning",
];

export type Client = {
  id: string;
  name: string;
  contact: string;
  location: string;
  service: string;
  bookingDate: string;
  frequency: string;
  requirements: string;
  status: ClientStatus;
};

export const CLIENTS: Client[] = [
  { id: "C-001", name: "Sarah Williams", contact: "sarah.w•••@example.com · 082 ••• 4471", location: "Cape Town CBD", service: "Standard Home Cleaning", bookingDate: "10 October 2026", frequency: "Weekly", requirements: "Pet-friendly products (1 cat)", status: "Active" },
  { id: "C-002", name: "David Jacobs", contact: "d.jacobs•••@example.com · 071 ••• 9032", location: "Observatory", service: "Deep Cleaning", bookingDate: "10 October 2026", frequency: "Monthly", requirements: "Focus on kitchen and bathrooms", status: "Active" },
  { id: "C-003", name: "Cape Town Office Solutions", contact: "admin•••@example.co.za · 021 ••• 5520", location: "City Bowl", service: "Office Cleaning", bookingDate: "12 October 2026", frequency: "Twice weekly", requirements: "After-hours access only (after 17:00)", status: "Pending" },
  { id: "C-004", name: "Fatima Abrahams", contact: "fatima.a•••@example.com · 083 ••• 1188", location: "Woodstock", service: "Move-out Cleaning", bookingDate: "14 October 2026", frequency: "Once-off", requirements: "Keys collected from agent", status: "New" },
  { id: "C-005", name: "Michael van der Merwe", contact: "m.vdm•••@example.com · 076 ••• 6603", location: "Rondebosch", service: "Standard Home Cleaning", bookingDate: "3 October 2026", frequency: "Fortnightly", requirements: "None", status: "Completed" },
  { id: "C-006", name: "Lindiwe Mokoena", contact: "lindiwe.m•••@example.com · 084 ••• 2245", location: "Sea Point", service: "Window Cleaning", bookingDate: "9 October 2026", frequency: "Quarterly", requirements: "Apartment, 4th floor", status: "Cancelled" },
];

export type Job = {
  id: string;
  client: string;
  location: string;
  service: string;
  date: string; // ISO
  time: string;
  cleaner: string;
  duration: number; // hours
  priority: Priority;
  status: JobStatus;
  notes: string;
};

export const JOBS: Job[] = [
  { id: "SC-1041", client: "Sarah Williams", location: "Cape Town CBD", service: "Deep Cleaning", date: "2026-10-10", time: "09:00", cleaner: "Thandi", duration: 3, priority: "High", status: "Scheduled", notes: "Pet-friendly products." },
  { id: "SC-1042", client: "David Jacobs", location: "Observatory", service: "Deep Cleaning", date: "2026-10-10", time: "13:00", cleaner: "Thandi", duration: 4, priority: "Medium", status: "Scheduled", notes: "Kitchen and bathrooms focus." },
  { id: "SC-1043", client: "Cape Town Office Solutions", location: "City Bowl", service: "Office Cleaning", date: "2026-10-12", time: "17:30", cleaner: "Lerato", duration: 3, priority: "High", status: "Scheduled", notes: "After-hours access, sign in at security." },
  { id: "SC-1044", client: "Fatima Abrahams", location: "Woodstock", service: "Move-out Cleaning", date: "2026-10-14", time: "08:00", cleaner: "Nomsa", duration: 5, priority: "Medium", status: "Scheduled", notes: "Collect keys from agent at 07:45." },
  { id: "SC-1039", client: "Michael van der Merwe", location: "Rondebosch", service: "Standard Home Cleaning", date: "2026-10-08", time: "10:00", cleaner: "Lerato", duration: 2, priority: "Low", status: "In Progress", notes: "" },
  { id: "SC-1038", client: "Lindiwe Mokoena", location: "Sea Point", service: "Window Cleaning", date: "2026-10-08", time: "14:00", cleaner: "Nomsa", duration: 2, priority: "Low", status: "Delayed", notes: "Cleaner running 30 min late from previous job." },
  { id: "SC-1036", client: "Sarah Williams", location: "Cape Town CBD", service: "Standard Home Cleaning", date: "2026-10-03", time: "09:00", cleaner: "Thandi", duration: 3, priority: "Medium", status: "Completed", notes: "" },
  { id: "SC-1035", client: "Michael van der Merwe", location: "Rondebosch", service: "Standard Home Cleaning", date: "2026-10-05", time: "11:00", cleaner: "Lerato", duration: 2, priority: "Low", status: "Completed", notes: "" },
  { id: "SC-1034", client: "Lindiwe Mokoena", location: "Sea Point", service: "Window Cleaning", date: "2026-10-06", time: "09:00", cleaner: "Nomsa", duration: 2, priority: "Low", status: "Cancelled", notes: "Client cancelled — rescheduling requested." },
];

export function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" });
}

export const DEMO_MEETING_NOTES = `Weekly operations meeting – 6 October 2026
Present: Zanele (Operations Manager), Thandi, Lerato, Nomsa, Pieter (Admin)

- Zanele said two clients complained last week about late arrivals in Observatory. Traffic on the N2 was the main cause.
- Agreed that all cleaners must leave 30 minutes earlier for jobs in Observatory and Woodstock from next week.
- Pieter will send appointment reminder SMSes to clients the day before each booking. Start by 13 October.
- Lerato raised that we are running low on eco-friendly bathroom cleaner. Pieter to order more stock by Friday.
- Discussed the new office cleaning enquiry from Cape Town Office Solutions. Zanele will prepare a quotation.
- Nomsa asked about training on the new steam mop. No decision yet — need to check the supplier's training costs.
- Ayanda is on leave until 20 October; jobs need to be redistributed.
- Next meeting: 13 October 2026, 08:00.`;
