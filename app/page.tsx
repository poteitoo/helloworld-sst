import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Bucket } from "sst/node/bucket";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { UploadFileForm } from "@/components/form";

export default async function Home() {
  const command = new PutObjectCommand({
    ACL: "public-read",
    Key: crypto.randomUUID(),
    Bucket: Bucket.public.bucketName,
  });
  const url = await getSignedUrl(new S3Client({}), command);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadFileForm url={url} />
    </main>
  );
}
