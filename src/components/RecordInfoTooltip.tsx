"use client";

import { useEffect, useId, useRef, useState } from "react";

export type RecordInfoField = {
  key: string;
  label: string;
  value: string;
};

type Props = {
  fields: RecordInfoField[];
};

function InfoIcon() {
  return (
    <svg
      className="record-info-icon"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 7v4.5M8 5.25v.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function RecordInfoTooltip({ fields }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const tooltipId = useId();

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  if (fields.length === 0) {
    return null;
  }

  return (
    <div className="record-info" ref={rootRef}>
      <button
        type="button"
        className="record-info-button"
        aria-expanded={open}
        aria-controls={tooltipId}
        aria-label="Дополнительная информация"
        onClick={() => setOpen((current) => !current)}
      >
        <InfoIcon />
      </button>
      {open ? (
        <div className="record-info-tooltip" id={tooltipId} role="tooltip">
          <dl>
            {fields.map((field) => (
              <div key={field.key} className="record-info-field">
                <dt>{field.label}</dt>
                <dd>{field.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}
    </div>
  );
}
