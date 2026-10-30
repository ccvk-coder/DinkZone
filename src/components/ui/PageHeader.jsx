import { useNavigate } from 'react-router-dom';
import { IconButton } from './IconButton';
import { cn } from '../../utils/classNames';
function PageHeader({ title, subtitle, back, actions, eyebrow }) {
  const navigate = useNavigate();
  const indent = back ? 'pl-[38px]' : '';
  return (
    <header className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 pb-4 pt-4 md:pt-8">
      <div className="min-w-0 flex-1 basis-64">
        {eyebrow && (
          <p
            className={cn(
              'mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-court dark:text-highlight',
              indent
            )}
          >
            {eyebrow}
          </p>
        )}
        {(back || title) && (
          <div className="flex min-h-11 items-center gap-1">
            {back && (
              <IconButton
                icon="arrow-left"
                label="Go back"
                className="-ml-2.5"
                onClick={() => (typeof back === 'string' ? navigate(back) : navigate(-1))}
              />
            )}
            {title && (
              <h1 className="min-w-0 break-words text-2xl font-extrabold leading-tight tracking-tight [text-wrap:balance] sm:text-[28px] lg:text-[32px]">
                {title}
              </h1>
            )}
          </div>
        )}
        {subtitle && (
          <p
            className={cn(
              'mt-1 text-sm leading-relaxed text-muted-foreground md:text-[15px]',
              indent
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </header>
  );
}
export { PageHeader };
