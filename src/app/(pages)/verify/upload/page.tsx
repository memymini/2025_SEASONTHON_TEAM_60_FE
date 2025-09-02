import FileUploadZone from "@/components/upload/FileUploadZone";
import UploadIntro from "@/components/upload/UploadIntro";

export default function UploadPage() {
  return (
    <div className="flex h-fit w-full flex-col gap-10">
      <h1 className="headline-large">소득 증명서 업로드</h1>
      <UploadIntro />
      <FileUploadZone />
    </div>
  );
}
