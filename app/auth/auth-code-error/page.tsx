export default function AuthCodeError() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">认证失败</h1>
        <p className="text-gray-400 mb-6">登录过程中出现错误，请重试。</p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
        >
          返回首页
        </a>
      </div>
    </div>
  )
} 