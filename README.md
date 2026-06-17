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

### ECS 静态部署（当前使用）

```bash
bash deploy/deploy.sh          # 构建 + 上传至 8.166.121.81
```

域名 `resume.wxz.asia` 已解析至 ECS。因阿里云备案限制，**必须启用 HTTPS** 才能外网访问。

**SSL 证书（DNS 验证）：**

1. 获取 TXT 记录值：`ssh ecs-user@8.166.121.81 'bash -s' < deploy/ssl-issue.sh`
2. 在阿里云 DNS 添加 TXT：主机记录 `_acme-challenge.resume`，值为脚本输出
3. 签发证书：`ssh ecs-user@8.166.121.81 'bash -s' < deploy/ssl-finish.sh`

### Vercel（备选）

```bash
vercel login
npx vercel --prod
```

### GitHub Pages

Settings → Pages → Source 选 **GitHub Actions**，推送 `main` 后自动部署。

## 导出 PDF

点击「下载 PDF」直接下载 `王显朝-前端开发工程师.pdf`（与 Boss 直聘投递版一致）。
