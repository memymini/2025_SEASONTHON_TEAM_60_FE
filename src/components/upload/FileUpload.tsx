"use client";

import { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/cn";
import { validateFiles, ACCEPT_MIME } from "@/schemas/file";

type Props = {
  onSelect: (files: File[]) => void;
  accept?: string[];
  multiple?: boolean;
  maxSizeMB?: number;
  className?: string;
  children?: React.ReactNode;
};

export default function FileUpload({
  onSelect,
  accept = ACCEPT_MIME as unknown as string[],
  multiple = false,
  maxSizeMB = 10,
  className,
  children,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleFiles = (files: FileList | File[]) => {
    const arr = Array.from(files);
    const msg = validateFiles(arr, { accept, maxSizeMB });
    if (msg) return setErr(msg);
    setErr(null);
    onSelect(multiple ? arr : [arr[0]]);
  };

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
  }, []);

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  };
  const onDragLeave = () => setDragOver(false);

  const openPicker = () => inputRef.current?.click();
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openPicker();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onClick={openPicker}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      className={cn(
        "flex items-center justify-center rounded-xl transition-colors",
        dragOver && "bg-text-accent/5",
        className,
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
        multiple={multiple}
        className="sr-only"
        onChange={(e) => e.target.files && handleFiles(e.target.files)}
      />
      <div className="flex flex-col items-center gap-3">
        {children}
        {err && <p className="body-small text-text-accent mt-2">{err}</p>}
      </div>
    </div>
  );
}
