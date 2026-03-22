import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import { Check, Package, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useGetProducts } from "../hooks/useQueries";

export default function ShopPage() {
  const _navigate = useNavigate();
  const { data: products, isLoading } = useGetProducts();
  const [cart, setCart] = useState<Map<string, number>>(new Map());

  const addToCart = (productId: string) => {
    setCart((prev) => {
      const newCart = new Map(prev);
      const currentQty = newCart.get(productId) || 0;
      newCart.set(productId, currentQty + 1);
      return newCart;
    });
    toast.success("Added to cart");
  };

  const getCartTotal = () => {
    if (!products) return 0;
    let total = 0;
    for (const [productId, qty] of cart) {
      const product = products.find((p) => p.id === productId);
      if (product) {
        total += Number(product.price) * qty;
      }
    }
    return total;
  };

  const getCartItemCount = () => {
    let count = 0;
    for (const qty of cart.values()) {
      count += qty;
    }
    return count;
  };

  const handleCheckout = () => {
    if (getCartItemCount() === 0) {
      toast.error("Your cart is empty");
      return;
    }
    toast.info(
      "Checkout functionality coming soon with Razorpay/PayPal integration",
    );
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/generated/wellness-products.dim_800x600.jpg"
            alt="Wellness Products"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 font-heading animate-in fade-in slide-in-from-bottom-4 duration-700">
            Yoga & Wellness Shop
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            Enhance your practice with our curated collection of premium yoga
            essentials
          </p>
        </div>
      </section>

      {/* Shopping Cart Summary */}
      {getCartItemCount() > 0 && (
        <section className="sticky top-0 z-40 bg-primary text-primary-foreground py-4 px-4 shadow-lg">
          <div className="container mx-auto max-w-6xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <ShoppingBag className="h-6 w-6" />
              <span className="font-heading text-lg">
                {getCartItemCount()}{" "}
                {getCartItemCount() === 1 ? "item" : "items"} in cart
              </span>
            </div>
            <div className="flex items-center gap-6">
              <span className="font-heading text-2xl">₹{getCartTotal()}</span>
              <Button
                onClick={handleCheckout}
                variant="secondary"
                size="lg"
                className="rounded-full font-heading"
              >
                Checkout
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Products Grid */}
      <section className="py-20 px-4 bg-[oklch(0.98_0.02_85)]">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
            <h2 className="text-4xl md:text-5xl font-bold text-primary font-heading mb-4">
              Our Products
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Carefully selected yoga and wellness products to support your
              journey
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="aspect-square w-full" />
                  <CardContent className="p-4 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product, index) => {
                const inCart = cart.get(product.id) || 0;
                const isOutOfStock = product.inventory === BigInt(0);

                return (
                  <Card
                    key={product.id}
                    className="overflow-hidden bg-white border-secondary/30 shadow-soft hover:shadow-lg transition-all duration-300 group animate-in fade-in slide-in-from-bottom"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={product.image.getDirectURL()}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      {isOutOfStock && (
                        <div className="absolute inset-0 bg-primary/80 flex items-center justify-center">
                          <Badge
                            variant="secondary"
                            className="text-lg px-4 py-2"
                          >
                            Out of Stock
                          </Badge>
                        </div>
                      )}
                      {inCart > 0 && !isOutOfStock && (
                        <div className="absolute top-3 right-3 bg-accent text-accent-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-lg">
                          {inCart}
                        </div>
                      )}
                    </div>
                    <CardContent className="p-5 space-y-3">
                      <h3 className="font-heading text-lg font-bold text-primary line-clamp-2 min-h-[3.5rem]">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
                        {product.description}
                      </p>

                      <div className="pt-3 border-t border-secondary/30">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="text-2xl font-bold text-accent font-heading">
                              {product.currency} {Number(product.price)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {isOutOfStock
                                ? "Out of stock"
                                : `${Number(product.inventory)} in stock`}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            onClick={() => addToCart(product.id)}
                            disabled={isOutOfStock}
                            className="flex-1 rounded-full font-heading"
                            size="sm"
                          >
                            <ShoppingBag className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground">
                No products available at the moment. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-primary font-heading mb-4">
              Why Shop With Us?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Quality products to support your yoga journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 p-6 rounded-2xl bg-secondary/20 border border-secondary/30 shadow-soft hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-primary font-heading">
                Authentic Products
              </h3>
              <p className="text-muted-foreground">
                Carefully curated yoga and wellness items from trusted brands
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-2xl bg-secondary/20 border border-secondary/30 shadow-soft hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
                <Package className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-primary font-heading">
                Secure Shipping
              </h3>
              <p className="text-muted-foreground">
                Safe and reliable delivery to your doorstep, worldwide
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-2xl bg-secondary/20 border border-secondary/30 shadow-soft hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-primary font-heading">
                Secure Payment
              </h3>
              <p className="text-muted-foreground">
                Multiple payment options including Razorpay and PayPal (coming
                soon)
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
