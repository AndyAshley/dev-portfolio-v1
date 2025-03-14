"use client";

import { useRef, useState } from "react";

// Components
import { Button } from "@/components/ui/button";
import { TextArea } from "@/components/forms/text-area";
import { TextInput } from "@/components/forms/text-input";
import sanitizeText from "@/components/utils/sanitize-text";

// Icons
import { Send, LoaderCircle, Check, RotateCcw } from "lucide-react";

// Toast
import { useToastContext } from "@/context/toast-context";

/**
 * Contact form component
 */
export const ContactForm = () => {
  const { showToast } = useToastContext();
  const [buttonStatus, setButtonStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  // TODO: Overengineer this later
  const honeyRef = useRef<HTMLInputElement>(null);
  const fNameRef = useRef<HTMLInputElement>(null);
  const lNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  // Refs object for easy iteration
  const refs = {
    fNameRef,
    lNameRef,
    emailRef,
    companyRef,
    phoneRef,
    messageRef,
  };

  // Button content based on status
  const buttonContent = {
    idle: { text: "Submit", icon: <Send size={16} className="ml-1" /> },
    submitting: {
      text: "Submitting",
      icon: <LoaderCircle size={16} className="ml-1 animate-spin" />,
    },
    success: { text: "Sent!", icon: <Check size={16} className="ml-1" /> },
    error: { text: "Retry?", icon: <RotateCcw size={16} className="ml-1" /> },
  }[buttonStatus];

  // Reset Form
  const resetForm = () => {
    Object.values(refs).forEach((ref) => {
      if (ref.current) ref.current.value = "";
    });
  };

  // Form submission handler
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    // no submission if the honeypot field is filled out
    if (honeyRef.current?.value) return;

    setButtonStatus("submitting");

    // Aggregate form data and sanitize inputs
    const data = Object.entries(refs).reduce((acc, [key, ref]) => {
      if (ref.current)
        acc[key.replace("Ref", "")] = sanitizeText(ref.current.value);
      return acc;
    }, {} as Record<string, string>);

    // Submit form data
    try {
      const response = await fetch("/api/form-submit-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to submit form");

      resetForm();
      setButtonStatus("success");

      showToast(
        {
          title: "Success",
          body: `Thank you for reaching out, ${data.fName}! I'll be in touch soon.`,
        },
        "success"
      );
    } catch (error) {
      setButtonStatus("error");
      showToast(
        {
          title: "Error",
          body: `There was an issue submitting your form. Please try again. Error: ${error}`,
        },
        "error"
      );
    }
  };

  return (
    <form
      className="relative w-full flex flex-col rounded shadow-lg border border-gray-700 bg-steel-grey-800/75 px-4 pb-4 space-y-4"
      onSubmit={submitHandler}
    >
      <div className="md:w-1/2 w-3/4 rounded-b-2xl bg-gray-700 h-2 mx-auto mb-10"></div>
      <TextInput label="Full Name" name="full_name" honeypot ref={honeyRef} />
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <TextInput label="First Name" name="fName" required ref={fNameRef} />
        <TextInput label="Last Name" name="lName" required ref={lNameRef} />
      </div>
      <TextInput
        label="Email"
        name="email"
        type="email"
        required
        ref={emailRef}
      />
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <TextInput label="Company" name="company" ref={companyRef} />
        <TextInput label="Phone" name="phone" type="tel" ref={phoneRef} />
      </div>

      <TextArea label="Message" name="message" ref={messageRef} />
      <Button
        align="end"
        type="submit"
        disabled={buttonStatus === "submitting"}
      >
        {buttonContent.text}
        {buttonContent.icon}
      </Button>
    </form>
  );
};
