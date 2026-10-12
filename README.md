<<<<<<< HEAD
# MediConnect — Healthcare Appointment Frontend Demo

MediConnect is a responsive, frontend-only college mini-project built with **HTML5, CSS3, vanilla JavaScript, and browser localStorage**.

## Run locally
1. Extract the project folder.
2. Open `index.html` in a modern browser. No backend, database, package installation, or build command is required.
3. For the best experience, use a local editor such as VS Code and open `index.html` in your browser.

## Demo roles
Open **Demo Login**, choose a role, and enter any non-empty demo password.
- Patient: `patient@demo.test`
- Doctor: `doctor@demo.test`
- Administrator: `admin@demo.test`

The role selector is demonstration-only and is not secure authentication. The doctor demo workspace is attached to the fictional Dr. Ananya Rao profile.

## Implemented features
- Responsive landing page and mobile navigation
- Demo login and fictional profile registration with client-side validation
- Fictional doctor directory with search, specialty, availability, fee filters, and sorting
- Doctor profile pages
- Appointment booking with past-date validation, slot availability checks, and duplicate-slot prevention
- Appointment list, search/status/date filters, details, cancellation, and rescheduling
- Patient, doctor, and administrator demo dashboards with statistics
- Doctor appointment confirmation/completion actions
- Sample medical records and detail modals
- Sample prescriptions with print view
- Notification centre: mark read, mark all read, delete, clear
- Patient profile editing
- Admin doctor activation/deactivation and appointment filtering
- Contact/feedback form stored locally
- Confirmation dialogs, toast messages, empty states, accessible labels and focus styles
- Reset Demo Data confirmation

## localStorage keys
All keys are prefixed with `mediconnect_demo_`:
- `profile`
- `role`
- `doctors`
- `appointments`
- `medical_records`
- `prescriptions`
- `notifications`
- `feedback`
- `activity`
- `theme`
- `demoUsers`

Data is initialized only when a key is missing. Existing demo changes are not overwritten on each page load. Use **Reset demo data** to restore the sample dataset.

## Quick testing checklist
1. Open the home page and use the navigation links.
2. Visit Find Doctors; search for a specialty and change filters/sorting.
3. Select a doctor, book a future appointment, and refresh the page.
4. Try booking the same doctor's same date/time again; the slot should be blocked.
5. Cancel a booking; it remains in history but no longer blocks the slot.
6. Reschedule an appointment to another available slot.
7. Log in as Doctor and confirm/complete a pending appointment.
8. Open records, prescriptions, and notifications; mark notifications as read.
9. Edit the patient profile and refresh.
10. Log in as Administrator to view statistics and toggle doctor availability.
11. Submit feedback, then view it in the admin workspace.
12. Use Reset demo data and confirm the original sample dataset returns.
13. Resize the browser to test mobile layout.

## Important limitations and safety
- Educational prototype only. All seeded doctor, appointment, record, and prescription data is fictional.
- No backend, external database, secure authentication, server-side authorization, real doctor verification, or real clinic booking.
- No real email/SMS, video consultation, or clinical diagnosis.
- Do not enter real patient details or sensitive health information.
- Browser `localStorage` is device/browser-specific and can be edited or cleared by the user. It is not secure and must not be used as a medical database.
- The demo login does not validate passwords against a server and never stores the entered password.
- Online demo is only a label; no real video call or consultation is provided.

## Project structure
```text
MediConnect/
├── index.html
├── css/
│   ├── styles.css
│   └── responsive.css
├── js/
│   ├── app.js
│   ├── storage.js
│   ├── doctors.js
│   ├── appointments.js
│   ├── dashboard.js
│   ├── notifications.js
│   └── validation.js
├── assets/
└── README.md
```
=======
# health-care
Patients spend a long time waiting for appointments. A web application could allow them to book time slots and track their appointments.
>>>>>>> origin/main
