import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderStatus } from '@prisma/client';

describe('ProductsController & OrdersController', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let productId: string;
  let token: string;
  let username: string;
  let orderId: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    prisma = app.get(PrismaService);
  });

  afterAll(async () => {
    await prisma.orderProduct.deleteMany();
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany({ where: { username } });
    await app.close();
  });

  beforeEach(async () => {
    username = `testuser_${Date.now()}`;

    await prisma.orderProduct.deleteMany();
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany({ where: { username } });

    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ username, password: 'testpass' });

    await prisma.user.update({
      where: { username },
      data: { role: 'ADMIN' },
    });

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username, password: 'testpass' });

    token = JSON.parse(loginRes.text)['access_token'];
    expect(token).toBeDefined();

    const product = await prisma.product.create({
      data: {
        name: 'Mouse',
        category: 'Tech',
        description: 'Mouse testing',
        price: 25,
        stockQuantity: 10,
      },
    });

    productId = product.id;
  });

  afterEach(async () => {
    await prisma.orderProduct.deleteMany();
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany({ where: { username } });
  });

  it('/GET products - retorna produtos paginados', async () => {
    const res = await request(app.getHttpServer())
      .get('/products?page=1&limit=5')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body).toHaveProperty('totalItems');
    expect(res.body).toHaveProperty('totalPages');
    expect(res.body).toHaveProperty('currentPage');
    expect(res.body).toHaveProperty('perPage');
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(1);
  });

  it('/GET products/all - retorna todos os produtos sem paginação', async () => {
    const res = await request(app.getHttpServer())
      .get('/products/all')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  it('/GET products/:id - retorna um produto por ID', async () => {
    const res = await request(app.getHttpServer())
      .get(`/products/${productId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', productId);
  });

  it('/GET products/:id - 404 para ID inexistente', async () => {
    const res = await request(app.getHttpServer())
      .get('/products/invalid-id')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(404);
  });

  it('/PUT products/:id - atualiza um produto', async () => {
    const res = await request(app.getHttpServer())
      .put(`/products/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Novo Nome', category: 'Nova', description: 'Nova desc', price: 99, stockQuantity: 99 });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('name', 'Novo Nome');
  });

  it('/PUT products/:id - falha com dados inválidos', async () => {
    const res = await request(app.getHttpServer())
      .put(`/products/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: '', category: '', description: '', price: -10, stockQuantity: -5 });

    expect(res.status).toBe(400);
  });

  it('/DELETE product - deve funcionar para ADMIN', async () => {
    const res = await request(app.getHttpServer())
      .delete(`/products/${productId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', productId);
  });

  it('/POST orders - cria um pedido', async () => {
    const res = await request(app.getHttpServer())
      .post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({ products: { [productId]: 2 }, status: OrderStatus.COMPLETED });

    expect(res.status).toBe(201);
    expect(res.body.total).toBe(50);
    expect(res.body.userId).toBeDefined();
    orderId = res.body.id;
    expect(orderId).toBeDefined();
  });

  it('/GET order by id - retorna pedido por ID', async () => {
    const user = await prisma.user.findUnique({ where: { username } });
    const order = await prisma.order.create({
      data: {
        status: OrderStatus.PENDING,
        total: 0,
        userId: user!.id,
        products: { create: [{ productId, quantity: 1 }] },
      },
    });

    const res = await request(app.getHttpServer())
      .get(`/orders/${order.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(order.id);
    expect(res.body.userId).toBe(user!.id);
  });

  it('/GET orders - retorna pedidos paginados', async () => {
    const user = await prisma.user.findUnique({ where: { username } });

    for (let i = 0; i < 3; i++) {
      await prisma.order.create({
        data: {
          status: OrderStatus.PENDING,
          total: 30,
          userId: user!.id,
          products: { create: [{ productId, quantity: 1 }] },
        },
      });
    }

    const res = await request(app.getHttpServer())
      .get('/orders?page=1&limit=2')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body).toHaveProperty('totalItems');
    expect(res.body).toHaveProperty('totalPages');
    expect(res.body).toHaveProperty('currentPage');
    expect(res.body.data.length).toBeLessThanOrEqual(2);
  });
});