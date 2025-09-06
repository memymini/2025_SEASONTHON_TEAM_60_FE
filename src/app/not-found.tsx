export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl p-8 text-center">
      <h1 className="headline-large">페이지를 찾을 수 없습니다.</h1>
      <p className="text-text-secondary mt-2">
        주소가 바뀌었거나 삭제되었습니다.
      </p>
      <a
        href="/"
        className="bg-primary text-text-inverse mt-6 inline-block rounded-md px-4 py-2"
      >
        홈으로
      </a>
    </div>
  );
}
