"use client";
import React from 'react';

export default function Header() {
  return (
    <div className="bg-blue-900 p-4 flex items-center justify-between text-white">
      <span className="text-xl font-bold">Sistema Odontológico</span>
      <div className="rounded-full bg-white w-10 h-10 text-blue-900 flex items-center justify-center">
        👤
      </div>
    </div>
  );
}
