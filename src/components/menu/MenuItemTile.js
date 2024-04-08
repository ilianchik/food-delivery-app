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
      group lg:hover:bg-white lg:hover:shadow-md lg:hover:shadow-black/25 transition-all grid !z-0 w-[300px] md:w-full mx-auto"
    >
      <div className="text-center h-[200px] relative">
        <Image
          src={image}
          className="w-full block h-full rounded-t-2xl"
          alt="pizza"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="md:p-4 p-2 flex flex-col h-[100%] justify-between">
        <h4 className="font-semibold text-lg md:text-xl my-3">{name}</h4>
        <p className="text-gray-500 text-xs md:text-sm line-clamp-3">
          {description}
        </p>
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
