import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  return (
    <section className="py-8 bg-stone-800">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center text-white">
          <h2 className="text-lg font-medium mb-2">Join Our Newsletter</h2>
          <p className="text-stone-300 text-xs mb-4">
            Get exclusive access to new arrivals and special offers
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-white text-stone-800 border-0 text-xs rounded-sm"
            />
            <Button className="bg-stone-600 hover:bg-stone-700 text-white text-xs rounded-sm">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
