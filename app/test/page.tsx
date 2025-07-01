export default function TestPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">测试页面</h1>
      <p>如果你能看到这个页面，说明路由系统正常工作。</p>
      <p className="mt-4">
        <a href="/debug" className="text-blue-500 underline">
          前往调试页面
        </a>
      </p>
    </div>
  );
} 