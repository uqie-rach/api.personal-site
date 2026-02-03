import { Injectable, Logger, UnprocessableEntityException } from '@nestjs/common';

import { FileType } from './domain/file';
import { NullableType } from '../utils/types/nullable.type';
import { FilesSupabaseService } from './infrastructure/uploader/supabase/files.service';
import { FileRepository } from './infrastructure/persistence/file.repository';

@Injectable()
export class FilesService {
  constructor(
    private readonly fileRepository: FileRepository,
    private readonly supabaseService: FilesSupabaseService,
  ) {}

  create(data: Omit<FileType, 'id'>): Promise<FileType> {
    return this.fileRepository.create(data);
  }

  findById(id: FileType['id']): Promise<NullableType<FileType>> {
    return this.fileRepository.findById(id);
  }

  findByIds(ids: FileType['id'][]): Promise<FileType[]> {
    return this.fileRepository.findByIds(ids);
  }

  /**
   * ORCHESTRATOR: Menghapus file dari storage dan database
   * Urutan: Storage → Database (Fail-safe: jika storage gagal, database tidak terhapus)
   *
   * @param path Path file di storage
   * @returns File yang dihapus dari database, atau null jika tidak ditemukan
   * @throws UnprocessableEntityException jika gagal menghapus dari storage
   */
  async _delete(path: FileType['path']): Promise<NullableType<FileType>> {
    console.log('[2] delete from storage')
    try {
      // 1. Hapus dari storage terlebih dahulu via adapter
      // Jika ini gagal, exception akan thrown dan database tidak akan terhapus
      await this.supabaseService.delete(path);
    } catch (error) {
      Logger.error(error instanceof Error && error.message)
      throw new UnprocessableEntityException(
        `Failed to delete image from storage: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      );
    }
    
    console.log('[3] delete from db')
    // 2. Setelah storage berhasil dihapus, hapus dari database
    try {
      return this.fileRepository._delete(path);
    } catch (error) {
      Logger.error(error instanceof Error && error.message)
      // Database deletion failed - ini adalah error scenario
      throw new UnprocessableEntityException(
        `File deleted from storage but failed to delete from database: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      );
    }
  }
}
