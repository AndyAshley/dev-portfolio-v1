"use client";

import { forwardRef } from "react";

type TextInputProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  honeypot?: boolean;
};

/**
 * Text input component with label and optional honeypot field
 */
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, name, type = "text", required = false, honeypot = false }, ref) => {
    const classNames = [
      "flex flex-col w-full",
      honeypot
        ? "absolute top-0 left-[-9999px] h-[1px] w-[1px] overflow-hidden"
        : "",
    ]
      .join(" ")
      .trim();

    return (
      <div className={classNames} aria-hidden={honeypot}>
        <label htmlFor={name} className="font-bold mb-1">
          {label}
          {required && <span className="text-ember-500 ml-1">*</span>}
        </label>
        <input
          ref={ref}
          type={type}
          name={name}
          className="border border-zinc-700/80 hover:border-ember-800 focus-visible:border-ember-500 outline-none transition-all duration-500 rounded shadow px-2 h-8 text-sm"
          required={required}
          tabIndex={honeypot ? -1 : 0}
        />
      </div>
    );
  }
);

TextInput.displayName = "TextInput";
