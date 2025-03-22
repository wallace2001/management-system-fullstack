FROM node:18-alpine AS builder
WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile
ENV NEXT_PUBLIC_API_URL=/api
ENV NEXT_PUBLIC_API_URL_SERVER=http://api:3000/
RUN yarn build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock

ENV NEXT_PUBLIC_API_URL_SERVER=http://api:3000/
ENV AUTH_SECRET=4CCz8g57rXRPiqz0U/O2kffIf/o8bh5FIDs45ybq0Gk=

EXPOSE 3001

CMD ["yarn", "start", "-p", "3001"]
