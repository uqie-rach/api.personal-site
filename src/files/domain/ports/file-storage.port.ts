/**
 * FileStoragePort - Output Port untuk abstraksi storage operations
 * Sesuai dengan Hexagonal Architecture pattern
 * Domain tidak tergantung pada infrastruktur storage tertentu (Supabase, S3, Local, dll)
 */
export interface FileStoragePort {
  /**
   * Upload file ke storage dan return public URL
   */
  upload(file: Express.Multer.File): Promise<{
    filePath: string;
    publicUrl: string;
  }>;

  /**
   * Delete file dari storage berdasarkan path
   */
  delete(filePath: string): Promise<void>;
}

// Token untuk dependency injection
export const FILE_STORAGE_PORT = Symbol('FileStoragePort');
