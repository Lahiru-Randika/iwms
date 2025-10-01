// Loading.tsx
"use client";

import React from "react";

// Main Loading component
export default function Loading() {
  return (
    <div className="space-y-4 p-4">
      <div className="h-6 w-3/4 bg-slate-200 rounded animate-pulse"></div>
      <div className="h-6 w-1/2 bg-slate-200 rounded animate-pulse"></div>
      <div className="h-6 w-full bg-slate-200 rounded animate-pulse"></div>
    </div>
  );
}

// Card Skeleton
export function CardSkeleton() {
  return (
    <div className="flex items-start space-x-4">
      {/* Card 1 */}
      <div className="flex-1 p-4 border rounded-xl shadow animate-pulse space-y-4 bg-white">
        <div className="h-5 w-3/4 bg-slate-200 rounded"></div> {/* Title */}
        <div className="h-3 w-full bg-slate-200 rounded"></div> {/* Description line 1 */}
        <div className="h-3 w-full bg-slate-200 rounded"></div> {/* Description line 2 */}
        <div className="flex justify-between mt-2 space-x-2">
          <div className="h-5 w-20 bg-slate-200 rounded"></div> {/* Engagement */}
          <div className="h-5 w-16 bg-slate-200 rounded"></div> {/* Priority */}
        </div>
        <div className="flex justify-between mt-4 space-x-2">
          <div className="h-5 w-24 bg-slate-200 rounded"></div> {/* Pause */}
          <div className="h-5 w-32 bg-slate-200 rounded"></div> {/* View Details */}
        </div>
      </div>

      {/* Card 2 */}
      <div className="flex-1 p-4 border rounded-xl shadow animate-pulse space-y-4 bg-white">
        <div className="h-5 w-3/4 bg-slate-200 rounded"></div>
        <div className="h-3 w-full bg-slate-200 rounded"></div>
        <div className="h-3 w-full bg-slate-200 rounded"></div>
        <div className="flex justify-between mt-2 space-x-2">
          <div className="h-5 w-20 bg-slate-200 rounded"></div>
          <div className="h-5 w-16 bg-slate-200 rounded"></div>
        </div>
        <div className="flex justify-between mt-4 space-x-2">
          <div className="h-5 w-24 bg-slate-200 rounded"></div>
          <div className="h-5 w-32 bg-slate-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}

// Button Skeleton
export function ButtonSkeleton() {
  return <div className="h-10 w-24 bg-slate-200 rounded animate-pulse"></div>;
}

// Modal Skeleton
export function ModalSkeleton() {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 space-y-4 animate-pulse">
        <div className="h-6 w-1/2 bg-slate-200 rounded"></div>
        <div className="h-40 bg-slate-200 rounded"></div>
        <div className="flex space-x-2">
          <div className="h-10 w-24 bg-slate-200 rounded"></div>
          <div className="h-10 w-24 bg-slate-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Header */}
      <div className="grid grid-cols-5 gap-4">
        <div className="h-10 bg-slate-300 rounded"></div>
        <div className="h-10 bg-slate-300 rounded"></div>
        <div className="h-10 bg-slate-300 rounded"></div>
        <div className="h-10 bg-slate-300 rounded"></div>
        <div className="h-10 bg-slate-300 rounded"></div>
      </div>

      {/* Rows */}
      {Array.from({ length: 5 }).map((_, idx) => (
        <div key={idx} className="grid grid-cols-5 gap-4">
          <div className="h-14 bg-slate-200 rounded"></div>
          <div className="h-14 bg-slate-100 rounded"></div>
          <div className="h-14 bg-slate-200 rounded"></div>
          <div className="h-14 bg-slate-100 rounded"></div>
          <div className="h-14 bg-slate-200 rounded"></div>
        </div>
      ))}
    </div>
  );
}



export function SidebarSkeleton() {
  return (
    <div className="space-y-2 p-2 animate-pulse">
      {/* Home item */}
      <div className="flex items-center space-x-2 bg-slate-200 h-10 w-full rounded px-3"></div>
      
      {/* Other navigation items */}
      <div className="flex items-center space-x-2 bg-slate-100 h-10 w-full rounded px-3"></div>
      <div className="flex items-center space-x-2 bg-slate-100 h-10 w-full rounded px-3"></div>
      <div className="flex items-center space-x-2 bg-slate-100 h-10 w-full rounded px-3"></div>
      <div className="flex items-center space-x-2 bg-slate-100 h-10 w-full rounded px-3"></div>
    </div>
  );
}

export function CSESkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
      {Array.from({ length: 3 }).map((_, idx) => (
        <div
          key={idx}
          className="p-4 border rounded-xl shadow-sm bg-white space-y-4"
        >
          {/* Title & Badge */}
          <div className="flex justify-between items-center">
            <div className="h-6 w-32 bg-slate-200 rounded"></div>
            <div className="h-5 w-16 bg-slate-100 rounded-full"></div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="h-4 w-3/4 bg-slate-200 rounded"></div>
            <div className="h-4 w-2/3 bg-slate-200 rounded"></div>
            <div className="h-4 w-1/2 bg-slate-200 rounded"></div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center">
            <div className="h-9 w-24 bg-slate-200 rounded-lg"></div>
            <div className="h-6 w-6 bg-slate-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      {/* Sidebar Skeleton */}
      <aside className="w-64 p-4 border-r border-gray-200 bg-white">
        <div className="flex items-center space-x-2 mb-8 animate-pulse">
          <div className="h-8 w-8 bg-slate-300 rounded-full"></div>
          <div className="h-6 w-3/4 bg-slate-200 rounded"></div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className={`h-10 rounded-lg animate-pulse ${
                index === 0 ? "bg-blue-100" : "bg-slate-100"
              }`}
            ></div>
          ))}
        </nav>

        {/* User Profile */}
        <div className="mt-8">
          <div className="flex items-center space-x-2 animate-pulse">
            <div className="h-10 w-10 bg-slate-300 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 bg-slate-200 rounded"></div>
              <div className="h-4 w-1/2 bg-slate-100 rounded"></div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Skeleton */}
      <main className="flex-1 p-8 space-y-6">
        {/* Header Section */}
        <header className="flex justify-between items-center animate-pulse">
          <div className="h-8 w-24 bg-slate-200 rounded"></div>
          <div className="flex items-center space-x-2">
            <div className="h-6 w-24 bg-green-100 rounded-full"></div>
            <div className="h-6 w-16 bg-slate-200 rounded-full"></div>
          </div>
        </header>

        {/* Main Title and Subtitle */}
        <div className="space-y-4 animate-pulse">
          <div className="h-12 w-3/4 bg-slate-300 rounded"></div>
          <div className="h-6 w-1/2 bg-slate-200 rounded"></div>
        </div>

        {/* Placeholder for the rest of the content */}
        <div className="p-4 border border-gray-200 rounded-xl bg-white shadow-sm space-y-4 animate-pulse">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-4 w-full bg-slate-100 rounded"></div>
          ))}
        </div>
      </main>
    </div>
  );
}