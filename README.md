# EcomNest

[EcomNest](https://api.ecom.tranphuoclong.io.vn/documentation) is a REST API built with [Nest.js](https://nestjs.com/).

## 🚀 Tech Stack

- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Zod](https://zod.dev/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Redis](https://redis.io/)
- [Socket.io](https://socket.io/)

## ⚙️ Installation

You can set up the project in **two ways**:

### ✅ Option 1: Using `make`

```bash
make bootstrap
```

### ✅ Option 2: Manually

```bash
npm install
cp .env.example .env
npx prisma migrate deploy
npx prisma generate
npm run start:dev
```

After that, backend will be available at [http://localhost:4000](http://localhost:4000)

## 📚 Documentation & Prisma Studio

You can access the documentation at [http://localhost:4000/documentation](http://localhost:4000/documentation)

You can start Prisma Studio by running:

```bash
npx prisma studio
```

After that, Prisma Studio will be available at [http://localhost:5555](http://localhost:5555)
