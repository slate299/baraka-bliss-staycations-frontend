// src/client/components/apartments/InquiryForm.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaPaperPlane,
  FaSpinner,
  FaPhone,
  FaUser,
  FaEnvelope,
  FaComment,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { submitPublicInquiry } from "../../../services/clientApi";
import { showSuccessToast, showErrorToast } from "../../utils/toastUtils";
import LoadingButton from "../common/LoadingButton";

const InquiryForm = ({ apartmentId, onSuccess }) => {
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  // Kenyan phone number validation
  const validateKenyanPhone = (value) => {
    const kenyanPhoneRegex = /^(?:\+?254|0)[17]\d{8}$/;
    return (
      kenyanPhoneRegex.test(value) ||
      "Please enter a valid Kenyan phone number (e.g., 0712345678 or +254712345678)"
    );
  };

  const onSubmit = async (data) => {
    setSubmitting(true);

    try {
      const response = await submitPublicInquiry({
        ...data,
        apartmentId,
      });

      if (response.success) {
        showSuccessToast(
          "Inquiry sent successfully! We'll get back to you soon.",
        );
        reset();
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to send inquiry. Please try again.";

      // Handle rate limiting
      if (error.response?.status === 429) {
        showErrorToast(
          "Too many requests. Please wait 15 minutes before trying again.",
        );
      }
      // Handle validation errors
      else if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err) => {
          showErrorToast(err.message);
        });
      }
      // Handle duplicate submission
      else if (
        error.response?.status === 429 &&
        error.response?.data?.message?.includes("24 hours")
      ) {
        showErrorToast(error.response.data.message);
      } else {
        showErrorToast(message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-client-card rounded-xl border border-client-border p-6 sticky top-24 animate-fadeIn">
      <h2 className="text-2xl font-bold text-client-text-primary mb-6">
        Inquire Now
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        aria-label="Inquiry form"
        noValidate
      >
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-client-text-secondary mb-1"
          >
            Name <span className="text-red-600">*</span>
          </label>
          <div className="relative group">
            <FaUser
              aria-hidden="true"
              className="absolute left-3 top-1/2 -translate-y-1/2 
                              text-client-text-secondary transition-all duration-200
                              group-focus-within:text-client-green"
            />
            <input
              id="name"
              type="text"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
                maxLength: {
                  value: 100,
                  message: "Name must be less than 100 characters",
                },
              })}
              className="w-full pl-10 pr-4 py-2 border border-client-border rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-client-green 
                         focus:border-transparent bg-client-bg text-client-text-primary
                         transition-all duration-200 hover:border-client-green/50"
              placeholder="John Doe"
              disabled={submitting}
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
          </div>
          {errors.name && (
            <p
              id="name-error"
              className="mt-1 text-sm text-red-600 animate-fadeIn"
              role="alert"
            >
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-client-text-secondary mb-1"
          >
            Phone Number <span className="text-red-600">*</span>
          </label>
          <div className="relative group">
            <FaPhone
              aria-hidden="true"
              className="absolute left-3 top-1/2 -translate-y-1/2 
                                text-client-text-secondary transition-all duration-200
                                group-focus-within:text-client-green"
            />
            <input
              id="phone"
              type="tel"
              {...register("phone", {
                required: "Phone number is required",
                validate: validateKenyanPhone,
              })}
              className="w-full pl-10 pr-4 py-2 border border-client-border rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-client-green 
                         focus:border-transparent bg-client-bg text-client-text-primary
                         transition-all duration-200 hover:border-client-green/50"
              placeholder="0712345678 or +254712345678"
              disabled={submitting}
              aria-invalid={errors.phone ? "true" : "false"}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
          </div>
          {errors.phone && (
            <p
              id="phone-error"
              className="mt-1 text-sm text-red-600 animate-fadeIn"
              role="alert"
            >
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Email Field (Optional) */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-client-text-secondary mb-1"
          >
            Email (Optional)
          </label>
          <div className="relative group">
            <FaEnvelope
              aria-hidden="true"
              className="absolute left-3 top-1/2 -translate-y-1/2 
                                   text-client-text-secondary transition-all duration-200
                                   group-focus-within:text-client-green"
            />
            <input
              id="email"
              type="email"
              {...register("email", {
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
              className="w-full pl-10 pr-4 py-2 border border-client-border rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-client-green 
                         focus:border-transparent bg-client-bg text-client-text-primary
                         transition-all duration-200 hover:border-client-green/50"
              placeholder="john@example.com"
              disabled={submitting}
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
          </div>
          {errors.email && (
            <p
              id="email-error"
              className="mt-1 text-sm text-red-600 animate-fadeIn"
              role="alert"
            >
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-client-text-secondary mb-1"
          >
            Message <span className="text-red-600">*</span>
          </label>
          <div className="relative group">
            <FaComment
              aria-hidden="true"
              className="absolute left-3 top-3 
                                 text-client-text-secondary transition-all duration-200
                                 group-focus-within:text-client-green"
            />
            <textarea
              id="message"
              {...register("message", {
                required: "Message is required",
                minLength: {
                  value: 10,
                  message: "Message must be at least 10 characters",
                },
                maxLength: {
                  value: 1000,
                  message: "Message must be less than 1000 characters",
                },
              })}
              rows={4}
              className="w-full pl-10 pr-4 py-2 border border-client-border rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-client-green 
                         focus:border-transparent bg-client-bg text-client-text-primary 
                         resize-none transition-all duration-200 hover:border-client-green/50"
              placeholder="I'm interested in this apartment. Is it available for..."
              disabled={submitting}
              aria-invalid={errors.message ? "true" : "false"}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
          </div>
          {errors.message && (
            <p
              id="message-error"
              className="mt-1 text-sm text-red-600 animate-fadeIn"
              role="alert"
            >
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit Button - FIXED with visible colors */}
        <LoadingButton
          type="submit"
          loading={submitting}
          disabled={submitting}
          className="w-full bg-client-green text-white py-3 rounded-lg 
                     font-semibold hover:bg-client-green-dark 
                     transition-all duration-200 hover:scale-105 active:scale-95
                     shadow-md hover:shadow-lg"
          aria-label={submitting ? "Sending inquiry..." : "Send inquiry"}
        >
          <FaPaperPlane
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
          Send Inquiry
        </LoadingButton>

        <p className="text-xs text-client-text-secondary text-center mt-4">
          By submitting this form, you agree to be contacted by our team.
        </p>
      </form>
    </div>
  );
};

export default InquiryForm;
