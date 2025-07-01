'use client';

import { useState } from 'react';

export default function DebugPage() {
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [useCustomKey, setUseCustomKey] = useState(false);

  const checkApiStatus = async () => {
    setLoading(true);
    try {
      // 先获取环境变量状态
      const envResponse = await fetch('/api/env-check', {
        method: 'GET',
      }).catch(() => null);
      
      let envData = null;
      if (envResponse) {
        try {
          envData = await envResponse.json();
        } catch (e) {}
      }
      
      // 测试实际 API
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: '测试',
          style: 'LINEART',
          numImages: 1
        })
      });

      const data = await response.json();
      setDebugInfo({
        status: response.status,
        ok: response.ok,
        data: data,
        envCheck: envData,
        timestamp: new Date().toLocaleString()
      });
    } catch (error) {
      setDebugInfo({
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toLocaleString()
      });
    } finally {
      setLoading(false);
    }
  };

  const testWithCustomKey = async () => {
    if (!apiKey.trim()) {
      alert('请输入API Key');
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch('https://fal.run/fal-ai/flux-lora', {
        method: 'POST',
        headers: {
          'Authorization': `Key ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: "a beautiful cat sitting on a sofa",
          image_size: "landscape_4_3",
          num_inference_steps: 28,
          guidance_scale: 3.5,
          num_images: 1,
          enable_safety_checker: true,
          output_format: "jpeg"
        })
      });

      let data;
      try {
        data = await response.json();
      } catch (e) {
        data = { error: '无法解析响应JSON' };
      }

      setDebugInfo({
        status: response.status,
        ok: response.ok,
        data: data,
        timestamp: new Date().toLocaleString(),
        message: response.ok ? 'API Key 有效！' : 'API Key 无效或请求失败'
      });
    } catch (error) {
      setDebugInfo({
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toLocaleString()
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">API 调试页面</h1>
      
      <div className="space-y-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="font-semibold mb-3">测试方式</h3>
          <div className="flex flex-col space-y-4">
            <div>
              <label className="flex items-center">
                <input 
                  type="radio" 
                  checked={!useCustomKey} 
                  onChange={() => setUseCustomKey(false)} 
                  className="mr-2"
                />
                使用环境变量中的 API Key (.env.local)
              </label>
            </div>
            
            <div>
              <label className="flex items-center">
                <input 
                  type="radio" 
                  checked={useCustomKey} 
                  onChange={() => setUseCustomKey(true)} 
                  className="mr-2"
                />
                使用自定义 API Key (直接测试)
              </label>
              
              {useCustomKey && (
                <div className="mt-3">
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="输入你的 FAL_KEY"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    此密钥不会保存，仅用于当前测试
                  </p>
                </div>
              )}
            </div>
            
            <button
              onClick={useCustomKey ? testWithCustomKey : checkApiStatus}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? '测试中...' : '测试 API 状态'}
            </button>
          </div>
        </div>

        {debugInfo && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">
              调试信息
              {debugInfo.message && (
                <span className={`ml-2 text-sm ${debugInfo.ok ? 'text-green-600' : 'text-red-600'}`}>
                  {debugInfo.message}
                </span>
              )}
            </h2>
            <pre className="text-sm overflow-auto max-h-80">
              {JSON.stringify(debugInfo, null, 2)}
            </pre>
          </div>
        )}

        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h3 className="font-semibold mb-2">调试步骤：</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>检查 <code>.env.local</code> 文件是否存在，并包含有效的 <code>FAL_KEY</code></li>
            <li>重启开发服务器：<code>npm run dev</code> 或 <code>pnpm dev</code></li>
            <li>查看浏览器控制台和终端输出的日志</li>
            <li>使用 <code>test-fal-api.sh</code> 脚本测试 API Key 是否有效</li>
            <li>检查 fal.ai 控制台，确认 Key 没有被禁用且有足够额度</li>
          </ol>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="font-semibold mb-2">环境变量设置：</h3>
          <p className="text-sm mb-2">在项目根目录创建 <code>.env.local</code> 文件：</p>
          <pre className="bg-gray-800 text-green-400 p-2 rounded text-xs">
{`FAL_KEY=your_actual_fal_key_here`}
          </pre>
          <p className="text-xs text-red-500 mt-2">
            <strong>注意：</strong> 上面只是示例格式，不是你实际的 API Key。出于安全考虑，浏览器中无法直接显示 .env.local 中的实际值。
          </p>
        </div>
      </div>
    </div>
  );
} 