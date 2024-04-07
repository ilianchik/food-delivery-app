import FlyingButton from "react-flying-item";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function AddToCartButton({
  hasSizesOrExtras,
  onClick,
  basePrice,
  image,
}) {
  const session = useSession();
  const status = session?.status;
  const router = useRouter();

  if (!hasSizesOrExtras) {
    if (status !== "authenticated" && status !== "loading") {
      return (
        <div className="flying-button-parent mt-4">
          <div className="w-full" onClick={() => router.push("/login")}>
            <button className="text-xs md:text-base">
              Add to cart ${basePrice}
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="flying-button-parent mt-4 text-xs md:text-base">
        <div className="w-full" onClick={onClick}>
          <FlyingButton targetTop={"5%"} targetLeft={"95%"} src={image}>
            Add to cart ${basePrice}
          </FlyingButton>
        </div>
      </div>
    );
  }

  if (status !== "authenticated" && status !== "loading") {
    return (
      <button
        type="button"
        onClick={() => router.push("/login")}
        className="mt-4 bg-primary text-white rounded-full md:px-8 py-2 text-xs md:text-base"
      >
        <span>Add to cart (from ${basePrice})</span>
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-4 bg-primary text-white rounded-full md:px-8 py-2 text-xs md:text-base"
    >
      <span>Add to cart (from ${basePrice})</span>
    </button>
  );
}
