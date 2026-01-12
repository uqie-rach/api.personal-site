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
import { TechStacksService } from './tech-stacks.service';
import { CreateTechStackDto } from './dto/create-tech-stack.dto';
import { UpdateTechStackDto } from './dto/update-tech-stack.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { TechStack } from './domain/tech-stack';
import { AuthGuard } from '../auth/guards/auth.guard';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllTechStacksDto } from './dto/find-all-tech-stacks.dto';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Techstacks')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller({
  path: 'tech-stacks',
  version: '1',
})
export class TechStacksController {
  constructor(private readonly techStacksService: TechStacksService) {}

  @Post()
  @ApiCreatedResponse({
    type: TechStack,
  })
  create(@Body() createTechStackDto: CreateTechStackDto) {
    return this.techStacksService.create(createTechStackDto);
  }

  @Get()
  @Public()
  @ApiOkResponse({
    type: InfinityPaginationResponse(TechStack),
  })
  async findAll(
    @Query() query: FindAllTechStacksDto,
  ): Promise<InfinityPaginationResponseDto<TechStack>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.techStacksService.findAllWithPagination({
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
    type: TechStack,
  })
  findById(@Param('id') id: string) {
    return this.techStacksService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: TechStack,
  })
  update(
    @Param('id') id: string,
    @Body() updateTechStackDto: UpdateTechStackDto,
  ) {
    return this.techStacksService.update(id, updateTechStackDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.techStacksService.remove(id);
  }
}
