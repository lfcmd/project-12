# Supabase 配置说明

## 环境变量配置

在项目根目录创建 `.env.local` 文件，并添加以下环境变量：

```env
NEXT_PUBLIC_SUPABASE_URL=https://dzafcoshgdyoxmobguvr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6YWZjb3NoZ2R5b3htb2JndXZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5ODk4NTEsImV4cCI6MjA2NzU2NTg1MX0.HA3JP_JT-NwMUtBarpTGrDFeFlT3K4fMbLFK9IWqQnI
```

## 如何获取这些值

1. 登录 [Supabase Dashboard](https://app.supabase.com/)
2. 创建新项目或选择现有项目
3. 在项目设置中找到 "API" 部分
4. 复制 "Project URL" 和 "anon public" key

## Google OAuth 配置

1. 在 Supabase Dashboard 中：
   - 进入 Authentication > Providers
   - 启用 Google 提供商
   - 添加 Google OAuth 客户端 ID 和密钥

2. 在 Google Cloud Console 中：
   - 创建 OAuth 2.0 客户端 ID
   - 在 "Authorized redirect URIs" 中，添加你的 Supabase 回调 URL：
     `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`

## 数据库配置

Supabase 会自动创建用户表，无需额外配置。

## 测试配置

启动开发服务器后，右上角应该会显示 Google 登录按钮。 