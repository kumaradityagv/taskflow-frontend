"use client";

import { useRef } from "react";

const OTP_LENGTH = 6;

export default function OtpInput({ value, onChange, disabled = false }) {
  const inputsRef = useRef([]);

  const digits = Array.from({ length: OTP_LENGTH }, (_, index) => value[index] ?? "");

  function focusInput(index) {
    inputsRef.current[index]?.focus();
  }

  function updateDigit(index, digit) {
    const next = digits.slice();
    next[index] = digit;
    onChange(next.join("").slice(0, OTP_LENGTH));
  }

  function handleChange(index, event) {
    const digit = event.target.value.replace(/\D/g, "").slice(-1);
    updateDigit(index, digit);
    if (digit && index < OTP_LENGTH - 1) {
      focusInput(index + 1);
    }
  }

  function handleKeyDown(index, event) {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      focusInput(index - 1);
    }
    if (event.key === "ArrowLeft" && index > 0) {
      focusInput(index - 1);
    }
    if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      focusInput(index + 1);
    }
  }

  function handlePaste(event) {
    event.preventDefault();
    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    onChange(pasted);
    focusInput(Math.min(pasted.length, OTP_LENGTH - 1));
  }

  return (
    <div className="otp-group" onPaste={handlePaste}>
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(element) => {
            inputsRef.current[index] = element;
          }}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={1}
          value={digit}
          disabled={disabled}
          aria-label={`Digit ${index + 1} of ${OTP_LENGTH}`}
          className="otp-digit"
          onChange={(event) => handleChange(index, event)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onFocus={(event) => event.target.select()}
        />
      ))}
    </div>
  );
}
