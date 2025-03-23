import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';

describe('ProductsController', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let productId: string;
  let token: string;
  let username: string;

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
});