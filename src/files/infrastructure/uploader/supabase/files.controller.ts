import {
  Body,
  Controller,
  Delete,
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
import { DeleteFileDto } from '../../../dto/deleteFileDto';
import { FilesService } from '../../../files.service';

@ApiTags('Files')
@Controller({
  path: 'files',
  version: '1',
})
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class FilesSupabaseController {
  constructor(
    private readonly filesSupabaseService: FilesSupabaseService,
    private readonly filesService: FilesService,
  ) {}

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
          path: 'uploads/82d9287f-73d9-427c-a9eb-216429b2796e.png',
          publicUrl:
            'https://noclvlfgyyldjlkuhmbr.supabase.co/storage/v1/object/public/images/uploads/82d9287f-73d9-427c-a9eb-216429b2796e.png',
        },
      },
    },
  })
  async findById(@Param('id') id: string): Promise<FileResponseDto> {
    return this.filesSupabaseService.findById(id);
  }

  @Delete('delete')
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    schema: {
      type: 'object',
      example: {
        path: 'uploads/82d9287f-73d9-427c-a9eb-216429b2796e.png',
      },
    },
  })
  @ApiResponse({
    schema: {
      type: 'object',
      example: {
        message: 'ok',
      },
    },
  })
  async _delete(@Body() deleteFileDto: DeleteFileDto): Promise<void> {
    // Menggunakan FilesService._delete() yang orchestrate storage + database deletion
    // Bukan langsung FilesSupabaseService untuk maintain hexagonal architecture
    await this.filesService._delete(deleteFileDto.path);
  }
}
