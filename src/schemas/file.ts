import { z } from "zod";

export const ACCEPT_MIME = [
  "application/pdf",
  "image/jpeg",
  "image/png",
] as const;

export function validateFiles(
  files: File[],
  opts?: { maxSizeMB?: number; accept?: string[] },
) {
  const maxSizeMB = opts?.maxSizeMB ?? 10;
  const accept = new Set((opts?.accept ?? ACCEPT_MIME) as string[]);

  for (const f of files) {
    if (!accept.has(f.type)) return `허용되지 않는 형식: ${f.name}`;
    if (f.size > maxSizeMB * 1024 * 1024)
      return `파일 용량 초과: ${f.name} (최대 ${maxSizeMB}MB)`;
  }
  return null;
}

export const FileInfoSchema = z.object({
  name: z.string(),
  size: z.number(),
  type: z.string(),
  url: z.string().optional(),
});
export type FileInfo = z.infer<typeof FileInfoSchema>;
