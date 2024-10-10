"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useIPFS } from "@/hooks/use-ipfs";
import { FileText, Image as ImageIcon, Upload } from "lucide-react";
import { useState } from "react";

const MetadataUploader = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploadedUri, setUploadedUri] = useState("");
  const [metadata, setMetadata] = useState<{
    name: string;
    description: string;
    image: string;
  } | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { uploadMetadata, getMetadata } = useIPFS();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      const newFile = new File(
        [selectedFile],
        selectedFile.name.replace(/\s+/g, ""),
        {
          type: selectedFile.type,
          lastModified: selectedFile.lastModified,
        }
      );
      setFile(newFile);
    }
  };

  const handleUpload = async () => {
    if (!file || !name || !description) return;

    setIsUploading(true);
    try {
      const uri = await uploadMetadata(name, description, file);
      setUploadedUri(uri);

      const metadata = await getMetadata(uri);
      setMetadata(metadata);
    } catch (error) {
      console.error("Error uploading metadata:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Metadata Uploader</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="metadata-name">Metadata Name</Label>
            <Input
              id="metadata-name"
              type="text"
              placeholder="Enter metadata name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="metadata-description">Metadata Description</Label>
            <Textarea
              id="metadata-description"
              placeholder="Enter metadata description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="metadata-file">Upload File</Label>
            <Input id="metadata-file" type="file" onChange={handleFileChange} />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="button"
            onClick={handleUpload}
            disabled={isUploading || !file || !name || !description}
            className="w-full"
          >
            {isUploading ? (
              "Uploading..."
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Upload Metadata
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {metadata && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Uploaded Metadata</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span className="font-semibold">IPFS URI:</span>
              <span className="text-sm break-all">{uploadedUri}</span>
            </div>
            <div className="flex items-center space-x-2">
              <ImageIcon className="w-5 h-5" />
              <span className="font-semibold">Name:</span>
              <span>{metadata.name}</span>
            </div>
            <div className="flex items-start space-x-2">
              <FileText className="w-5 h-5 mt-1" />
              <span className="font-semibold">Description:</span>
              <p className="text-sm">{metadata.description}</p>
            </div>
            <div className="mt-4">
              <img
                src={metadata.image}
                alt="Uploaded Metadata"
                className="max-w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MetadataUploader;