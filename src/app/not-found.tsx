import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function NotFound() {
  return (
    <div className="py-20">
      <Container>
        <div className="max-w-md mx-auto text-center space-y-5">
          <div className="w-20 h-20 bg-brand-light text-brand-primary rounded-full flex items-center justify-center mx-auto text-3xl font-black">
            404
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-content-primary">
            Page Not Found
          </h1>
          <p className="text-sm text-content-secondary leading-relaxed">
            The page or product category you are looking for does not exist or may have been moved.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link href="/">
              <Button variant="primary" leftIcon={<Home className="w-4 h-4" />}>
                Back to Homepage
              </Button>
            </Link>
            <Link href="#featured">
              <Button variant="outline" leftIcon={<Search className="w-4 h-4" />}>
                Browse Deals
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
