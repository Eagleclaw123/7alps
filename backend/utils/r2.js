const crypto = require('crypto');
const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');

const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const BUCKET = process.env.R2_BUCKET_NAME;
const PUBLIC_URL = process.env.R2_PUBLIC_URL;

// Uploads a buffer to R2 and returns its public URL.
const uploadToR2 = async (file, folder = 'products') => {
  const ext = file.originalname.includes('.') ? file.originalname.split('.').pop() : 'bin';
  const key = `${folder}/${Date.now()}-${crypto.randomBytes(6).toString('hex')}.${ext}`;

  await r2Client.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    }),
  );

  return `${PUBLIC_URL}/${key}`;
};

// Deletes an object given its public URL. No-ops silently on failure/missing url.
const deleteFromR2 = async (url) => {
  if (!url) return;
  const key = url.replace(`${PUBLIC_URL}/`, '');

  try {
    await r2Client.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));
  } catch (err) {
    console.error('Failed to delete R2 object:', key, err.message);
  }
};

module.exports = { uploadToR2, deleteFromR2 };
