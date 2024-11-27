// src/components/ContactForm.tsx
import { useForm } from "react-hook-form";

interface FormValues {
  name: string;
  subject: string;
  email: string;
  body: string;
}

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
    // Since there's no backend connection, we'll simulate a successful submission.
    // In a real-world scenario, you'd send `data` to your backend here.
    // After handling the submission, reset the form fields.
    reset();
  };

  return (
    <div className="max-w-lg p-6 bg-tin text-paleSand rounded-md mt-5">
      {/* Success Message */}
      {isSubmitSuccessful && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          Your message has been sent successfully!
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Name Field */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-paleSand font-medium mb-2"
          >
            Your Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name", {
              required: "Your name is required.",
              minLength: {
                value: 3,
                message: "Your name must be at least 3 characters long.",
              },
            })}
            className={`w-full px-3 py-2 border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Subject Field */}
        <div className="mb-4">
          <label
            htmlFor="subject"
            className="block text-paleSand font-medium mb-2"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            {...register("subject", {
              required: "Subject is required.",
              minLength: {
                value: 5,
                message: "Subject must be at least 5 characters long.",
              },
            })}
            className={`w-full px-3 py-2 border ${
              errors.subject ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter the subject"
          />
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1">
              {errors.subject.message}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-paleSand font-medium mb-2"
          >
            Your Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
                message: "Please enter a valid email address.",
              },
            })}
            className={`w-full px-3 py-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Message Body Field */}
        <div className="mb-4">
          <label
            htmlFor="body"
            className="block text-paleSand font-medium mb-2"
          >
            Message
          </label>
          <textarea
            id="body"
            {...register("body", {
              required: "Message body is required.",
              minLength: {
                value: 10,
                message: "Message must be at least 10 characters long.",
              },
            })}
            className={`w-full px-3 py-2 border ${
              errors.body ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter your message"
            rows={5}
          ></textarea>
          {errors.body && (
            <p className="text-red-500 text-sm mt-1">{errors.body.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-btns text-white px-6 py-2 rounded-md hover:bg-amber-100 hover:text-black transition-colors duration-300"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
