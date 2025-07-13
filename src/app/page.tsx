import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FlashcardItem from "@/components/flashcards/FlashcardItem";

export default function Home() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8 px-4">
          <div className="md:w-1/2 space-y-4 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Learn English Easily with Flashcards
            </h1>
            <p className="text-gray-600">
              Master vocabulary through interactive flashcards and track your progress effortlessly.
            </p>
            <Button asChild>
              <Link href="/flashcards">Get Started</Link>
            </Button>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/images/hero-illustration.svg"
              alt="Learning Illustration"
              width={500}
              height={400}
              className="mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 container mx-auto grid md:grid-cols-3 gap-8 px-4">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">Interactive Flashcards</h3>
          <p className="text-gray-500">Learn and review vocabulary easily.</p>
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">Track Your Progress</h3>
          <p className="text-gray-500">See how your skills improve over time.</p>
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">Accessible Anywhere</h3>
          <p className="text-gray-500">Learn on desktop or mobile devices.</p>
        </div>
      </section>

      {/* Flashcards Grid */}
      <section className="py-12 container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-6">Popular Flashcards</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <FlashcardItem word="Apple" meaning="Quả táo" />
          <FlashcardItem word="Orange" meaning="Quả cam" />
          <FlashcardItem word="Banana" meaning="Quả chuối" />
          <FlashcardItem word="Grape" meaning="Nho" />
          <FlashcardItem word="Pineapple" meaning="Dứa" />
          <FlashcardItem word="Strawberry" meaning="Dâu tây" />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-blue-50 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Start Learning Today</h2>
        <p className="text-gray-600 mt-2">
          Join thousands of learners improving their English vocabulary.
        </p>
        <Button className="mt-4" asChild>
          <Link href="/flashcards">Get Started</Link>
        </Button>
      </section>
    </main>
  );
}
