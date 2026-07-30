"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { ColumnField } from "@/data/sources/shared/visible-column";

type Props = {
  fields: ColumnField[];
};

function InfoIcon() {
  return (
    <svg
      className="record-info-icon"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
      focusable="false"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <circle cx="12" cy="8" r="1.25" fill="currentColor" />
      <path
        d="M12 11.25v5.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
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

  return (
    <div className="record-info" ref={rootRef}>
      <button
        type="button"
        className="record-info-button"
        aria-label="Примечания"
        aria-expanded={open}
        aria-controls={tooltipId}
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
