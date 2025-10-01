"use client";

import * as React from "react";

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className = "", ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={`relative w-full rounded-lg border border-gray-300 bg-white p-4 text-sm ${className}`}
      {...props}
    />
  )
);

Alert.displayName = "Alert";

export interface AlertDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const AlertDescription = React.forwardRef<HTMLParagraphElement, AlertDescriptionProps>(
  ({ className = "", ...props }, ref) => (
    <p
      ref={ref}
      className={`text-sm leading-relaxed text-gray-700 ${className}`}
      {...props}
    />
  )
);

AlertDescription.displayName = "AlertDescription";

export { Alert, AlertDescription };
