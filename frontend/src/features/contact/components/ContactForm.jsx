// import ContactButton from "./ContactButton";
// import ContactInput from "./ContactInput";
// import ContactTextArea from "./ContactTextArea";

// const ContactForm = () => {
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // TODO:
//     // React Hook Form
//     // Zod Validation
//     // API Integration
//     console.log("Form Submitted");
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="rounded-3xl border border-gray-100 bg-white p-8 sm:p-10"
//     >
//       <h3 className="text-3xl font-semibold text-[#1E293B]">
//         Send us a Message
//       </h3>

//       <p className="mt-3 text-gray-500">
//         We'd love to hear from you. Fill out the form below and we'll get back
//         to you as soon as possible.
//       </p>

//       <div className="mt-10 grid gap-6 md:grid-cols-2">
//         <ContactInput
//           label="First Name"
//           name="firstName"
//           placeholder="John"
//           required
//         />

//         <ContactInput
//           label="Last Name"
//           name="lastName"
//           placeholder="Doe"
//           required
//         />

//         <ContactInput
//           label="Email Address"
//           type="email"
//           name="email"
//           placeholder="john@example.com"
//           required
//         />

//         <ContactInput
//           label="Phone Number"
//           type="tel"
//           name="phone"
//           placeholder="+91 9876543210"
//         />

//         <div className="md:col-span-2">
//           <ContactInput
//             label="Company Name"
//             name="company"
//             placeholder="Your Company"
//           />
//         </div>

//         <div className="md:col-span-2">
//           <ContactInput
//             label="Subject"
//             name="subject"
//             placeholder="How can we help you?"
//             required
//           />
//         </div>

//         <div className="md:col-span-2">
//           <ContactTextArea
//             label="Message"
//             name="message"
//             rows={6}
//             placeholder="Tell us more about your requirements..."
//             required
//           />
//         </div>

//         <div className="md:col-span-2">
//           <ContactButton type="submit">Send Message</ContactButton>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default ContactForm;
