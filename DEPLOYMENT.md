# 🚀 WanderConnect Frontend - Deployment Guide

## Quick Deployment Options

### 1. Vercel (Recommended - Easiest)

Vercel is the company behind Next.js and offers seamless deployment.

#### Steps:
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Select your WanderConnect repository
5. Configure environment variables
6. Click "Deploy"

#### Environment Variables on Vercel:
```
NEXT_PUBLIC_API_URL=https://your-api.com/api
NEXT_PUBLIC_APP_NAME=WanderConnect
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key
```

#### Deploy Commands (Automatic):
```bash
npm install
npm run build
npm start
```

#### Result:
- Auto-deployed to `wanderconnect.vercel.app`
- Automatic preview deployments on pull requests
- Automatic production deployments on main branch push

---

### 2. Netlify

#### Steps:
1. Connect GitHub repository
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. Add environment variables
4. Deploy

#### Note:
Netlify works but has slightly less optimized Next.js support than Vercel.

---

### 3. Traditional VPS/Cloud Hosting

#### AWS EC2, DigitalOcean, Linode, etc.

```bash
# SSH into server
ssh user@your-server.com

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repository
git clone https://github.com/yourusername/WanderConnect.git
cd WanderConnect/frontend

# Install dependencies
npm install

# Build
npm run build

# Install PM2 for process management
npm install -g pm2

# Start application
pm2 start "npm start" --name "wanderconnect"

# Monitor
pm2 monit
```

#### Nginx Configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### SSL with Let's Encrypt:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

### 4. Docker Deployment

#### Dockerfile:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

#### Docker Compose:
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_API_URL: ${API_URL}
      NEXT_PUBLIC_APP_NAME: WanderConnect
    restart: always
```

#### Build and run:
```bash
docker build -t wanderconnect .
docker run -p 3000:3000 wanderconnect
```

---

### 5. GitHub Pages (Static Export Only)

For static export (no server-side rendering):

#### Modify `next.config.js`:
```javascript
const nextConfig = {
  output: 'export',
  // ... rest of config
}
module.exports = nextConfig
```

#### Build:
```bash
npm run build
```

#### Deploy:
Push the `out` folder to GitHub Pages.

---

## Pre-Deployment Checklist

### Code Quality
- [ ] Run `npm run lint` - No errors
- [ ] Run `npm run type-check` - No TypeScript errors
- [ ] Test all pages locally: `npm run dev`
- [ ] Check responsive design on mobile
- [ ] Verify animations work smoothly

### Configuration
- [ ] `.env.example` is up to date
- [ ] All API endpoints configured
- [ ] API base URL set correctly
- [ ] Google Maps API key set (if needed)

### Performance
- [ ] Run Lighthouse audit
- [ ] Bundle size is reasonable
- [ ] Images are optimized
- [ ] No console errors

### Security
- [ ] No hardcoded secrets in code
- [ ] API keys only in environment variables
- [ ] HTTPS enabled
- [ ] CORS configured properly

### Testing
- [ ] Manual testing on target device
- [ ] Cross-browser testing
- [ ] All links working
- [ ] Forms submit correctly

---

## Performance Optimization

### 1. Image Optimization
```typescript
import Image from 'next/image';

// Instead of <img>, use Next.js Image component
<Image
  src="/image.jpg"
  alt="Description"
  width={500}
  height={500}
  quality={75}
  placeholder="blur"
/>
```

### 2. Code Splitting
Next.js does this automatically with dynamic imports:
```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>,
});
```

### 3. CSS Optimization
```bash
npm run build
# Check bundle size
npm install --save-dev @next/bundle-analyzer
```

### 4. Caching Strategy
Set cache headers in `next.config.js`:
```javascript
module.exports = {
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
}
```

---

## Monitoring & Logging

### Sentry (Error Tracking)
```bash
npm install @sentry/nextjs
```

### Google Analytics
```bash
npm install @react-ga/core
```

### Web Vitals
```bash
npm install web-vitals

# In your app
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

---

## Troubleshooting Deployment

### Build Fails
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Server Not Starting
```bash
# Check logs
npm start -- --debug

# Check port availability
lsof -i :3000
```

### Environment Variables Not Set
```bash
# Verify in production
console.log(process.env.NEXT_PUBLIC_API_URL);
```

### Slow Performance
```bash
# Analyze bundle
npm install --save-dev @next/bundle-analyzer
# Add to next.config.js and run build
```

---

## Post-Deployment

### Monitor Performance
- Check Lighthouse scores
- Monitor Core Web Vitals
- Track error rates
- Monitor API response times

### Updates & Maintenance
```bash
# Keep dependencies updated
npm update

# Security audit
npm audit fix

# Check for vulnerabilities
npm audit
```

### Backup & Recovery
- Regular backups of production data
- Keep git history clean
- Tag releases: `git tag v1.0.0`
- Use semantic versioning

---

## Production Best Practices

### Environment Variables
```env
# .env.production
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.wanderconnect.com
NEXT_PUBLIC_APP_NAME=WanderConnect
```

### CORS Setup (Backend)
```javascript
// Backend needs to allow frontend origin
res.setHeader('Access-Control-Allow-Origin', 'https://wanderconnect.com');
```

### Rate Limiting
Implement rate limiting to prevent abuse:
```javascript
// Use express-rate-limit
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);
```

---

## CI/CD Pipeline Setup

### GitHub Actions Example
```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - run: npm install
      - run: npm run lint
      - run: npm run type-check
      - run: npm run build
      
      - name: Deploy to Vercel
        uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

---

## Domain & SSL

### Custom Domain (Vercel)
1. Go to project settings
2. Add custom domain
3. Update DNS records
4. SSL certificate auto-issued

### Custom Domain (Other Hosting)
1. Register domain (Namecheap, GoDaddy, etc.)
2. Point DNS to server IP
3. Configure SSL with Let's Encrypt
4. Update server configuration

---

## Rollback Procedure

### If Deployment Goes Wrong
```bash
# Revert to previous version
git revert <commit-hash>
git push origin main

# Or rollback on hosting platform
# Vercel: Click "Rollback" on deployment
# Netlify: Manually deploy previous commit
```

---

## Support & Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Web Vitals](https://web.dev/vitals/)

---

## Success Checklist

- [ ] Application deployed successfully
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Environment variables set
- [ ] Backend API connected
- [ ] Monitoring configured
- [ ] Error tracking enabled
- [ ] Performance verified
- [ ] Mobile responsive tested
- [ ] All animations working
- [ ] User can sign up/log in
- [ ] Gamification features functional
- [ ] Team notified
- [ ] Documentation updated

---

## Deployment Summary

Your WanderConnect frontend is production-ready! Choose a deployment platform based on your needs:

- **Easiest**: Vercel (30 seconds to deploy)
- **Most Control**: VPS with Docker
- **Budget-Friendly**: Netlify or GitHub Pages
- **Enterprise**: AWS, Azure, or Google Cloud

All platforms will handle HTTPS, domain configuration, and auto-scaling for you.

---

**Happy Deploying! 🚀**
