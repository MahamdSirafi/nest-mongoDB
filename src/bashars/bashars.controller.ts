import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { BasharsService } from './bashars.service';
import { CreateBasharDto } from './dto/create-bashar.dto';
import { UpdateBasharDto } from './dto/update-bashar.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Bashar } from './domain/bashar';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllBasharsDto } from './dto/find-all-bashars.dto';

@ApiTags('Bashars')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'bashars',
  version: '1',
})
export class BasharsController {
  constructor(private readonly basharsService: BasharsService) {}

  @Post()
  @ApiCreatedResponse({
    type: Bashar,
  })
  create(@Body() createBasharDto: CreateBasharDto) {
    return this.basharsService.create(createBasharDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Bashar),
  })
  async findAll(
    @Query() query: FindAllBasharsDto,
  ): Promise<InfinityPaginationResponseDto<Bashar>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.basharsService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Bashar,
  })
  findById(@Param('id') id: string) {
    return this.basharsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Bashar,
  })
  update(@Param('id') id: string, @Body() updateBasharDto: UpdateBasharDto) {
    return this.basharsService.update(id, updateBasharDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.basharsService.remove(id);
  }
}
