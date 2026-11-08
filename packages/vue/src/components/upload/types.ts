export type UploadStatus = 'ready' | 'uploading' | 'success' | 'error'

export type UploadListType = 'text' | 'picture'

/** Attachment rows are 60px normally and 40px in the small form (specified in upload.md). */
export type UploadSize = 'normal' | 'small'

export interface UploadFile {
  uid: string
  name: string
  size: number
  status: UploadStatus
  percent: number
  url?: string
  error?: string
  raw?: File
}

export interface UploadHandlers {
  onProgress: (percent: number) => void
  onSuccess: (url?: string) => void
  onError: (message: string) => void
}
