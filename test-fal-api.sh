#!/bin/bash

# 测试 fal.ai API 的脚本
# 使用前请将 YOUR_FAL_KEY_HERE 替换为你的实际 FAL_KEY

FAL_KEY="YOUR_FAL_KEY_HERE"

echo "测试 fal.ai API..."
echo "使用 Key: ${FAL_KEY:0:10}..."

# 测试 API 连接
curl -X POST "https://fal.run/fal-ai/flux-lora" \
  -H "Authorization: Key $FAL_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "a beautiful cat sitting on a sofa",
    "image_size": "landscape_4_3",
    "num_inference_steps": 28,
    "guidance_scale": 3.5,
    "num_images": 1,
    "enable_safety_checker": true,
    "output_format": "jpeg"
  }' \
  --max-time 60

echo ""
echo "如果看到 JSON 响应或者队列信息，说明 API Key 有效"
echo "如果看到 401 错误，说明 API Key 无效或过期"
echo "如果看到网络错误，可能是网络连接问题" 