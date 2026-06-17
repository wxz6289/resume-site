# resume-site

王显朝的交互式在线简历（hacknical 风格）。

**线上地址：** https://resume.wxz.asia

## 技术栈

- Vite + React 19 + TypeScript
- Tailwind CSS 4
- Framer Motion
- Recharts（技能雷达图）

## 本地开发

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # 输出到 dist/
npm run preview
```

## 更新简历内容

编辑 `src/data/resume-2026.json`，保存后刷新页面即可。

> 主简历仓库 [`wxz6289/resume`](https://github.com/wxz6289/resume) 中的 `content/resume-2026.json` 为同源数据，更新后请同步到本仓库。

## 部署

### Vercel（推荐）

导入本仓库，Vercel 自动读取 `vercel.json`。自定义域名 `resume.wxz.asia` CNAME 指向 `cname.vercel-dns.com`。

### GitHub Pages

Settings → Pages → Source 选 **GitHub Actions**，推送 `main` 后自动部署。

## 导出 PDF

打开站点后点击「导出 PDF」，或使用浏览器打印（Ctrl/Cmd + P）。
