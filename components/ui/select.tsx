"use client";

import * as React from "react";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = "Select";

export interface SelectTriggerProps
  extends React.HTMLAttributes<HTMLDivElement> {}

function SelectTrigger({ className = "", ...props }: SelectTriggerProps) {
  return (
    <div
      className={`flex h-10 items-center justify-between rounded-md border border-gray-300 bg-white px-3 text-sm ${className}`}
      {...props}
    />
  );
}

export interface SelectValueProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

function SelectValue({ className = "", ...props }: SelectValueProps) {
  return <span className={`truncate ${className}`} {...props} />;
}

export interface SelectContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

function SelectContent({ className = "", ...props }: SelectContentProps) {
  return (
    <div
      className={`absolute mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg ${className}`}
      {...props}
