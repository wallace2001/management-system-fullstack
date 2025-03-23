import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumberString } from 'class-validator';

export class FindUsersQueryDto {
  @ApiPropertyOptional({ example: '2', description: 'Número da página' })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiPropertyOptional({ example: '10', description: 'Itens por página' })
  @IsOptional()
  @IsNumberString()
  limit?: string;

  @ApiPropertyOptional({ example: 'admin', description: 'Filtro por nome de usuário' })
  @IsOptional()
  @IsString()
  name?: string;
}
