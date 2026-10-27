"use client";

import type { ReactNode } from "react";
import { useConsultation } from "./ConsultationProvider";

type Props = {
  children?: ReactNode;
  source: string;
  interest?: string;
  /** Program title when the CTA registers interest in a specific program. */
  program?: string;
  className?: string;
  onBeforeOpen?: () => void;
};

/** Any "Book a Consultation"-style CTA. Opens the shared modal and records where it came from. */
export function ConsultationButton({ children = "Book a Consultation", source, interest, program, className = "btn-primary", onBeforeOpen }: Props) {
  const { open } = useConsultation();
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      className={className}
      onClick={(e) => {
        onBeforeOpen?.();
        open({ source, interest, program, trigger: e.currentTarget });
      }}
    >
      {children}
    </button>
  );
}
