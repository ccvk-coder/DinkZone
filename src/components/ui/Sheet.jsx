import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useDragControls } from 'framer-motion';
import { Icon } from './Icon';
import { useIsTablet } from '../../hooks/useMediaQuery';
import { cn } from '../../utils/classNames';
const spring = { type: 'spring', damping: 34, stiffness: 380, mass: 0.9 };
function Sheet({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  side = 'auto',
  width = 'md:w-[440px]'
}) {
  const isTablet = useIsTablet();
  const asPanel = side === 'right' || (side === 'auto' && isTablet);
  const controls = useDragControls();
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[1000]" role="dialog" aria-modal="true" aria-label={title}>
          <motion.div
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          {asPanel ? (
            <motion.div
              className={cn(
                'absolute inset-y-0 right-0 flex w-full flex-col bg-card text-card-foreground shadow-lg',
                width
              )}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={spring}
            >
              <SheetHeader title={title} description={description} onClose={onClose} />
              <div className="flex-1 overflow-y-auto px-5 pb-6">{children}</div>
              {footer && <div className="border-t border-border p-4">{footer}</div>}
            </motion.div>
          ) : (
            <motion.div
              className="absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col rounded-t-[24px] bg-card text-card-foreground shadow-lg"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={spring}
              drag="y"
              dragControls={controls}
              dragListener={false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.7 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 110 || info.velocity.y > 550) onClose();
              }}
            >
              <div
                className="flex cursor-grab touch-none justify-center pb-1 pt-3 active:cursor-grabbing"
                onPointerDown={(e) => controls.start(e)}
              >
                <span className="h-1.5 w-10 rounded-full bg-border" aria-hidden />
              </div>
              <div onPointerDown={(e) => controls.start(e)} className="touch-none">
                <SheetHeader title={title} description={description} onClose={onClose} />
              </div>
              <div className="flex-1 overflow-y-auto px-5 pb-6">{children}</div>
              {footer && (
                <div className="border-t border-border p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                  {footer}
                </div>
              )}
            </motion.div>
          )}
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
function SheetHeader({ title, description, onClose }) {
  if (!title) return null;
  return (
    <div className="flex items-start justify-between gap-4 px-5 pb-3 pt-2 md:pt-5">
      <div>
        <h2 className="text-xl font-bold">{title}</h2>
        {description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
      </div>
      <button
        type="button"
        onClick={onClose}
        className="pressable -mr-2 grid h-11 w-11 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
        aria-label="Close"
      >
        <Icon name="x" className="h-5 w-5" />
      </button>
    </div>
  );
}
export { Sheet };
