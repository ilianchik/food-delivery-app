import { useUploadImageToBucket } from "@/libs/Tanstack/queries";
import Image from "next/image";
import toast from "react-hot-toast";

export default function EditableImage({ link, setLink }) {
  const { mutateAsync: uploadImageToBucket } = useUploadImageToBucket();

  async function handleFileChange(ev) {
    const files = ev.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);

      toast.promise(
        uploadImageToBucket(data).then((link) => setLink(link)),
        {
          loading: "Saving...",
          success: "Profile saved!",
          error: "Error",
        }
      );
    }
  }

  return (
    <>
      {link && (
        <Image
          className="rounded-lg w-full h-full mb-1"
          src={link}
          width={250}
          height={250}
          alt={"avatar"}
          loading="lazy"
        />
      )}
      {!link && (
        <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
          No image
        </div>
      )}
      <label>
        <input type="file" className="hidden" onChange={handleFileChange} />
        <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">
          Change image
        </span>
      </label>
    </>
  );
}
