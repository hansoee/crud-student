This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### Setting up Database
1. Install mysql if there it is not available on your machine

On Ubuntu/Debian
```bash
sudo apt update
sudo apt install mysql-server
```

On MacOS
```bash
brew update
brew install mysql
```

On Windows
Download from the website

2. Login to mysql
3. Create a new database
CREATE DATABASE studentdb;
4. Create the Students table (check lib/database.db)
5. Insert dummy data
6. Configure .env.local