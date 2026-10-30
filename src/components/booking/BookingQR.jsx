import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { cn } from '../../utils/classNames';
function BookingQR({ value, size = 208, dimmed = false, className, label }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}
      className={cn('relative overflow-hidden rounded-lg bg-white p-4', className)}
      role="img"
      aria-label={label}
    >
      <QRCodeSVG
        value={value}
        size={size}
        level="M"
        fgColor="#0B1F17"
        bgColor="#FFFFFF"
        className={cn(
          'block h-auto w-full max-w-full transition-opacity duration-200',
          dimmed && 'opacity-20'
        )}
      />
      {!dimmed && (
        <motion.span
          aria-hidden
          className="absolute inset-x-3 top-0 h-[3px] rounded-full bg-highlight shadow-[0_0_12px_2px_rgba(212,242,58,0.8)]"
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: size + 8, opacity: [0, 1, 1, 0] }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
        />
      )}
    </motion.div>
  );
}
export { BookingQR };
