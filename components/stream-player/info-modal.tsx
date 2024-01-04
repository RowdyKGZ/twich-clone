"use client";

import Image from "next/image";
import { toast } from "sonner";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition, useRef, ElementRef } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UploadDropzone } from "@/lib/uploadthing";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { updateStream } from "@/actions/stream";
import { Hint } from "@/components/hint";

interface InfoModalProps {
  initialName: string;
  initialThumbnailUrl: string | null;
}

export const InfoModal = ({
  initialName,
  initialThumbnailUrl,
}: InfoModalProps) => {
  const router = useRouter();
  const closeRef = useRef<ElementRef<"button">>(null);

  const [name, setName] = useState(initialName);
  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);

  const [isPending, startTransition] = useTransition();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onRemove = () => {
    startTransition(() => {
      updateStream({ thumbnailUrl: null })
        .then(() => {
          toast.success("Thumbnail removed");
          closeRef.current?.click();
        })
        .catch(() => {
          toast.error("Somthing went wrong");
        });
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      updateStream({ name: name })
        .then(() => {
          toast.success("Stream updated");
          setThumbnailUrl("");
          closeRef.current?.click();
        })
        .catch(() => {
          toast.error("Somthing went wrong");
        });
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="ml-auto">
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Stream Info</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-14">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              placeholder="Stream name"
              onChange={onChange}
              value={name}
              disabled={isPending}
            />

            <div className="space-y-2">
              <Label>{thumbnailUrl}</Label>
              {thumbnailUrl ? (
                <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                  <div className="absolute top-2 right-2 z-[10]">
                    <Hint label="Remove thumbnail" side="left" asChild>
                      <Button
                        type="button"
                        disabled={isPending}
                        onClick={onRemove}
                        className="h-auto w-auto p-1.5"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </Hint>
                  </div>
                  <Image
                    src={thumbnailUrl}
                    alt="thumbnail"
                    className="object-cover"
                    fill
                  />
                </div>
              ) : (
                <div className="rounded-xl border outline-dashed outline-muted">
                  <UploadDropzone
                    endpoint="thumbnailUploader"
                    appearance={{
                      label: { color: "#FFFFFF" },
                      allowedContent: { color: "#FFFFFF" },
                    }}
                    onClientUploadComplete={(res) => {
                      setThumbnailUrl(res?.[0]?.url);
                      router.refresh();
                      closeRef?.current?.click();
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between">
            <DialogClose asChild>
              <Button ref={closeRef} type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={false} variant="primary" type="submit">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
