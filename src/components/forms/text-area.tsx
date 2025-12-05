"use client";

import { forwardRef } from "react";

type TextAreaProps = {
  label: string;
  name: string;
};

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, name }, ref) => {
    return (
      <div className="flex flex-col">
        <label htmlFor={name} className="font-bold mb-1">
          {label}
        </label>
        <textarea
          ref={ref}
          name={name}
          className="border border-zinc-700/80 hover:border-primary-hover focus-visible:border-primary outline-none transition-all duration-500 rounded shadow p-2 h-24 text-sm"
          rows={3}
        />
      </div>
    );
  }
);

TextArea.displayName = "TextArea";
