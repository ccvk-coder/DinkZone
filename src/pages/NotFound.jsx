import { Link } from 'react-router-dom';
import { Wordmark } from '../components/ui/Wordmark';
import { Icon } from '../components/ui/Icon';

function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-background px-5 py-16 text-foreground">
      <div className="w-full max-w-lg text-center">
        <Link to="/courts" aria-label="DinkZone home" className="mb-8 inline-flex">
          <Wordmark />
        </Link>
        <div className="rounded-lg border border-border bg-card p-8 shadow-sm sm:p-10">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-muted text-court dark:text-highlight">
            <Icon name="map-pin-off" className="h-7 w-7" />
          </span>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Error 404
          </p>
          <h1 className="mt-2 font-heading text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            This court is out of bounds
          </h1>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            The page you were looking for has moved, been renamed, or never existed. Let’s get you
            back on a court.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-2 sm:flex-row">
            <Link
              to="/courts"
              className="pressable inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Icon name="map-pin" className="h-4 w-4" />
              Back to Courts
            </Link>
            <Link
              to="/events"
              className="pressable inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border border-border bg-card px-5 text-sm font-semibold hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Icon name="trophy" className="h-4 w-4" />
              Browse events
            </Link>
          </div>
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          DinkZone · Cebu City pickleball community
        </p>
      </div>
    </div>
  );
}

export { NotFound };
