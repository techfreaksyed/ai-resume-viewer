// import { createClient } from '@supabase/supabase-js'
// import { environment } from '../environments/environment';

// // Create Supabase client
// const supabase = createClient(environment.supabaseProjectUrl, environment.supabaseApiKey)

// // Upload file using standard upload
// export async function uploadFile(file: string | ArrayBuffer | ArrayBufferView<ArrayBufferLike> | Blob | Buffer<ArrayBufferLike> | File | FormData | NodeJS.ReadableStream | ReadableStream<Uint8Array<ArrayBufferLike>> | URLSearchParams) {
//   const { data, error } = await supabase.storage.from('bucket_name').upload('file_path', file)
//   if (error) {
//     // Handle error
//     console.error('Error uploading file:', error.message);
//   } else {
//     // Handle success
//     console.log('File uploaded successfully:', data);
//   }
// }