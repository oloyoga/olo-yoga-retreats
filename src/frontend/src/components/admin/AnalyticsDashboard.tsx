import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Loader2, Package, TrendingUp, Users } from "lucide-react";
import {
  useGetAllBookings,
  useGetAllRetreatsWithPackages,
  useGetProducts,
  useGetVideoCourses,
} from "../../hooks/useQueries";

export default function AnalyticsDashboard() {
  const { data: bookings = [], isLoading: bookingsLoading } =
    useGetAllBookings();
  const { data: products = [], isLoading: productsLoading } = useGetProducts();
  const { data: retreats = [], isLoading: retreatsLoading } =
    useGetAllRetreatsWithPackages();
  const { data: _videoCourses = [], isLoading: coursesLoading } =
    useGetVideoCourses();

  const isLoading =
    bookingsLoading || productsLoading || retreatsLoading || coursesLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const completedBookings = bookings.filter((b) => b.status === "completed");
  const totalRevenue = completedBookings.reduce(
    (sum, b) => sum + Number(b.amount),
    0,
  );
  const totalBookings = bookings.length;
  const totalProducts = products.length;
  const totalRetreats = retreats.length;

  const bookingsByType = bookings.reduce(
    (acc, booking) => {
      acc[booking.itemType] = (acc[booking.itemType] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const popularItems = Object.entries(bookingsByType)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const recentBookings = [...bookings]
    .sort((a, b) => Number(b.bookingDate) - Number(a.bookingDate))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold font-heading">Analytics Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              From {completedBookings.length} completed bookings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Bookings
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBookings}</div>
            <p className="text-xs text-muted-foreground">All time bookings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Retreats
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRetreats}</div>
            <p className="text-xs text-muted-foreground">
              Available for booking
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">In inventory</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Popular Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularItems.length === 0 ? (
                <p className="text-sm text-muted-foreground">No bookings yet</p>
              ) : (
                popularItems.map(([type, count]) => (
                  <div key={type} className="flex justify-between items-center">
                    <span className="text-sm font-medium">{type}</span>
                    <span className="text-sm text-muted-foreground">
                      {count} bookings
                    </span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.length === 0 ? (
                <p className="text-sm text-muted-foreground">No bookings yet</p>
              ) : (
                recentBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex justify-between items-center text-sm"
                  >
                    <div>
                      <p className="font-medium">{booking.itemType}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(
                          Number(booking.bookingDate) / 1000000,
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="font-medium">
                      {booking.currency}{" "}
                      {Number(booking.amount).toLocaleString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
