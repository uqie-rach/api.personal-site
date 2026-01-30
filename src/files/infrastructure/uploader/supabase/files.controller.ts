import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FilesSupabaseService } from './files.service';
import { Public } from '../../../../auth/decorators/public.decorator';
import { FileResponseDto } from './dto/file-response.dto';
import { AuthGuard } from '../../../../auth/guards/auth.guard';

@ApiTags('Files')
@Controller({
  path: 'files',
  version: '1',
})
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class FilesSupabaseController {
  constructor(private readonly filesSupabaseService: FilesSupabaseService) {}

  @Post('upload')
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    schema: {
      type: 'object',
      example: {
        file: {
          id: 'dc1c7165-5242-4fa4-a6e7-b18a7cd5b6ba',
          path: 'https://noclvlfgyyldjlkuhmbr.supabase.co/storage/v1/object/public/images/uploads/82d9287f-73d9-427c-a9eb-216429b2796e.png',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<FileResponseDto> {
    return this.filesSupabaseService.create(file);
  }

  @Public()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
  })
  @ApiResponse({
    schema: {
      type: 'object',
      example: {
        file: {
          id: 'dc1c7165-5242-4fa4-a6e7-b18a7cd5b6ba',
          path: 'https://noclvlfgyyldjlkuhmbr.supabase.co/storage/v1/object/public/images/uploads/82d9287f-73d9-427c-a9eb-216429b2796e.png',
        },
      },
    },
  })
  async findById(@Param('id') id: string): Promise<FileResponseDto> {
    return this.filesSupabaseService.findById(id);
  }
}
