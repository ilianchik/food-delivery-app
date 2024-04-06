import AddToCartButton from "@/components/menu/AddToCartButton";
import Image from "next/image";

export default function MenuItemTile({ onAddToCart, ...item }) {
  const { image, description, name, basePrice, sizes, extraIngredientPrices } =
    item;
  const hasSizesOrExtras =
    sizes?.length > 0 || extraIngredientPrices?.length > 0;
  return (
    <div
      className="bg-gray-200 rounded-2xl text-center
      group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all flex flex-col"
    >
      <div className="text-center">
        <Image
          src={image}
          className="w-full block mx-auto rounded-t-2xl"
          alt="pizza"
          objectFit="contain"
          width={500}
          height={500}
        />
      </div>
      <div className="p-4 flex flex-col h-[100%] justify-between">
        <h4 className="font-semibold text-xl my-3">{name}</h4>
        <p className="text-gray-500 text-sm line-clamp-3">{description}</p>
        <AddToCartButton
          image={image}
          hasSizesOrExtras={hasSizesOrExtras}
          onClick={onAddToCart}
          basePrice={basePrice}
        />
      </div>
    </div>
  );
}
