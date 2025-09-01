import type { FileInfo } from "@/schemas/file";

export async function mockLocalUpload(
  file: File,
  onProgress?: (pct: number) => void,
): Promise<FileInfo> {
  // 로컬 미리보기 URL (이미지에만 의미 있음)
  const url = file.type.startsWith("image/")
    ? URL.createObjectURL(file)
    : undefined;

  // 가짜 업로드 진행률
  let pct = 0;
  await new Promise<void>((resolve) => {
    const id = setInterval(() => {
      pct = Math.min(100, pct + 12);
      onProgress?.(pct);
      if (pct >= 100) {
        clearInterval(id);
        resolve();
      }
    }, 120);
  });

  return { name: file.name, size: file.size, type: file.type, url };
}

export async function mockLocalUploads(
  files: File[],
  onProgress?: (i: number, pct: number) => void,
) {
  const results = [];
  for (let i = 0; i < files.length; i++) {
    const res = await mockLocalUpload(files[i], (p) => onProgress?.(i, p));
    results.push(res);
  }
  return results;
}
