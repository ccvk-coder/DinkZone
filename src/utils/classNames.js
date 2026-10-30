import { twMerge } from 'tailwind-merge';
function cn(...classes) {
  return twMerge(classes.filter(Boolean).join(' '));
}
export { cn };
