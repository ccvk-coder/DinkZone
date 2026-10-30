import { motion } from 'framer-motion';
import { cn } from '../../utils/classNames';
function SuccessMark({ size = 96, tone = 'success', className }) {
  const bg = tone === 'success' ? 'bg-success' : 'bg-destructive';
  return (
    <div
      className={cn('relative grid place-items-center', className)}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <motion.span
        className={cn(
          'absolute inset-0 rounded-full',
          tone === 'success' ? 'bg-highlight' : 'bg-destructive/40'
        )}
        initial={{ scale: 0.95, opacity: 0.8 }}
        animate={{ scale: 1.7, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      />
      <motion.span
        className={cn('absolute inset-0 rounded-full', bg)}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 16, stiffness: 420 }}
      />
      <svg
        viewBox="0 0 52 52"
        className="relative"
        style={{ width: size * 0.5, height: size * 0.5 }}
      >
        {tone === 'success' ? (
          <motion.path
            d="M14 27 L23 36 L39 18"
            fill="none"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.28, delay: 0.12, ease: [0.23, 1, 0.32, 1] }}
          />
        ) : (
          <motion.path
            d="M17 17 L35 35 M35 17 L17 35"
            fill="none"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.25, delay: 0.1 }}
          />
        )}
      </svg>
    </div>
  );
}
export { SuccessMark };
