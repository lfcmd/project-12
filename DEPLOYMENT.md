# 部署到 Vercel 指南

本指南将帮助你将项目部署到 Vercel 并设置持续集成（CI/CD），实现代码变更后自动部署。

## 1. 准备工作

### a. 确认本地环境可运行

在部署之前，请确保你的本地开发环境可以正常工作。

1.  在项目根目录创建 `.env.local` 文件。
2.  将你的 Supabase URL 和 Key 添加到文件中：

    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

3.  运行 `pnpm run dev`，确保网站能在本地无错访问。

### b. 将代码推送到 Git 仓库

Vercel 通过连接 Git 仓库（如 GitHub, GitLab, Bitbucket）来部署项目。

1.  确保你的项目已经是一个 Git 仓库。
2.  将代码推送到远程仓库（例如 GitHub）。

## 2. 在 Vercel 上创建项目

1.  **登录 Vercel**: 使用你的 GitHub (或其他) 账号登录 [Vercel](https://vercel.com/)。
2.  **创建新项目**:
    *   在 Vercel Dashboard，点击 "Add New..." -> "Project"。
    *   从列表中选择并导入你刚刚推送的 Git 仓库。
3.  **配置项目**:
    *   Vercel 会自动识别出这是一个 Next.js 项目，并为你选择正确的框架预设。你无需修改构建和输出设置。
    *   **最重要的一步**: 展开 "Environment Variables" (环境变量) 部分。
    *   添加以下两个环境变量：

| 名称 | 值 |
| :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | `your_supabase_project_url` (从Supabase后台获取) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`| `your_supabase_anon_key` (从Supabase后台获取) |

4.  **部署**:
    *   点击 "Deploy" 按钮。
    *   Vercel 会开始获取你的代码、安装依赖、构建项目并部署。

## 3. 自动部署

完成首次部署后，Vercel 的 CI/CD 就已经自动设置好了。

-   之后，每当你向项目的主分支（通常是 `main`）推送代码（`git push`），Vercel 都会自动抓取最新的代码，并重新构建和部署你的应用。
-   你可以在 Vercel Dashboard 的 "Deployments" 标签页看到所有的部署历史。

现在，你可以按照这个指南开始部署了！ 