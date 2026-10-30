import { useMemo, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Icon } from '../../components/ui/Icon';
import { KpiCard } from '../../components/admin/KpiCard';
import { useToast } from '../../components/Toast';
import { ScanSummary } from '../../components/staff/ScanSummary';
import { SalesTodayCard } from '../../components/staff/SalesTodayCard';
import { BookingsPeriodCard } from '../../components/staff/BookingsPeriodCard';
import { RentalsPanel } from '../../components/staff/RentalsPanel';
import { RentalLog } from '../../components/staff/RentalLog';
import { ProductSalesPanel } from '../../components/staff/ProductSalesPanel';
import { venues } from '../../data/venues';
import { products } from '../../data/products';
import {
  counterSales,
  courtFeesCollectedToday,
  recentScans,
  scanTotalsToday
} from '../../data/staffActivity';
import { rentalItems, rentalRecordsToday } from '../../data/rentals';
import { compactPeso } from '../../utils/format';
import { periodSummary } from '../../utils/venueStats';
function StaffOverview() {
  const { venueId } = useOutletContext();
  const { toast } = useToast();
  const venue = venues.find((v) => v.id === venueId) ?? venues[0];
  const [items, setItems] = useState(rentalItems);
  const [records, setRecords] = useState(rentalRecordsToday);
  const today = useMemo(() => periodSummary([venue], 'today'), [venue]);
  const checkIns = scanTotalsToday.reduce((s, t) => s + t.count - t.rejected, 0);
  const rentalRevenue = items.reduce((s, i) => s + i.rentedToday * i.rate, 0);
  const priceOf = (id) => products.find((p) => p.id === id)?.price ?? 0;
  const shopRevenue = counterSales.reduce((s, x) => s + priceOf(x.productId) * x.qty, 0);
  const lines = [
    {
      label: 'Court fees',
      icon: 'land-plot',
      amount: courtFeesCollectedToday.amount,
      detail: `${courtFeesCollectedToday.transactions} walk-in & pay-at-venue`
    },
    {
      label: 'Rentals',
      icon: 'hand',
      amount: rentalRevenue,
      detail: `${items.reduce((s, i) => s + i.rentedToday, 0)} items rented`
    },
    {
      label: 'Pro shop',
      icon: 'shopping-bag',
      amount: shopRevenue,
      detail: `${counterSales.length} counter orders`
    }
  ];
  const salesTotal = lines.reduce((s, l) => s + l.amount, 0);
  const payments = ['Cash', 'GCash', 'Card', 'Maya'].map((method) => ({
    method,
    amount: counterSales
      .filter((s) => s.payment === method)
      .reduce((s, x) => s + priceOf(x.productId) * x.qty, 0)
  }));
  function handleReturn(r, condition) {
    const d = /* @__PURE__ */ new Date();
    const returnedAt = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    setRecords((list) => list.map((x) => (x.id === r.id ? { ...x, returnedAt, condition } : x)));
    setItems((list) =>
      list.map((i) =>
        i.id === r.itemId
          ? {
              ...i,
              out: Math.max(0, i.out - r.qty),
              maintenance: condition === 'Damaged' ? i.maintenance + r.qty : i.maintenance
            }
          : i
      )
    );
    const name = items.find((i) => i.id === r.itemId)?.name ?? 'Item';
    toast({
      title: condition === 'Damaged' ? `${name} sent to repair` : `${name} returned`,
      description: `${r.qty}\xD7 from ${r.playerName}, Court ${r.court}`,
      tone: condition === 'Damaged' ? 'info' : 'success'
    });
  }
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">
            {/* @__PURE__ */ new Date().toLocaleDateString('en-PH', {
              weekday: 'long',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          <h1 className="text-3xl font-extrabold">Overview · {venue.name}</h1>
        </div>
        <div className="flex gap-2">
          <Link
            to="/staff/schedule"
            className="pressable inline-flex min-h-[44px] items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-semibold hover:bg-muted"
          >
            <Icon name="calendar-clock" className="h-4 w-4" aria-hidden />
            Schedule
          </Link>
          <Link
            to="/staff/scan"
            className="pressable inline-flex min-h-[44px] items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
          >
            <Icon name="scan-line" className="h-4 w-4" aria-hidden />
            Open scanner
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KpiCard label="Checked in today" value={String(checkIns)} delta={11} icon="user-check" />
        <KpiCard label="Sales today" value={compactPeso(salesTotal)} delta={7} icon="banknote" />
        <KpiCard
          label="Booked today"
          value={String(today.bookings)}
          delta={today.delta.bookings}
          icon="calendar-check"
        />
        <KpiCard
          label="Rentals out now"
          value={String(items.reduce((s, i) => s + i.out, 0))}
          delta={-6}
          icon="package-open"
          hint="vs this time yesterday"
          invert
        />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <ScanSummary totals={scanTotalsToday} recent={recentScans} />
        <SalesTodayCard lines={lines} payments={payments} />
        <div className="lg:col-span-2 xl:col-span-1">
          <BookingsPeriodCard venue={venue} />
        </div>
      </div>
      <div className="mt-4">
        <RentalLog records={records} items={items} onReturn={handleReturn} />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <RentalsPanel items={items} />
        <ProductSalesPanel sales={counterSales} />
      </div>
    </div>
  );
}
export { StaffOverview };
