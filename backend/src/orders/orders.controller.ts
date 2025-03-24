import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Req,
  UseGuards,
  Patch,
  HttpCode,
  HttpStatus,
  Delete,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RequestWithUser } from 'src/auth/types/request-with-user';
import { FindOrdersDto } from './dto/find-orders.dto';

@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'USER')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  create(@Body() dto: CreateOrderDto, @Req() req: RequestWithUser) {
    const userId = req.user['userId'];
    return this.ordersService.create(dto, userId);
  }

  @Get()
  @ApiOperation({
    summary: 'List all orders with pagination and filter by user',
  })
  findAll(@Query() query: FindOrdersDto) {
    return this.ordersService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID' })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id/complete')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Mark an order as completed' })
  async completeOrder(@Param('id') id: string) {
    return this.ordersService.markAsCompleted(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cancel an order if not completed' })
  async delete(@Param('id') id: string) {
    return this.ordersService.delete(id);
  }
}
