export function scroll(side, element, number) {
  if (side == "left") {
    element.scrollLeft -= number;
  }
  if (side == "right") {
    element.scrollLeft += number;
  }
  return;
}
