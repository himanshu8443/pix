import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Hero(): JSX.Element {
  return (
    <div className="flex flex-col">
      <section className="bg-gray-950 relative py-20 md:py-32">
        <div className="absolute inset-0 bg-gray-900 backdrop-blur-3xl opacity-15"></div>
        <div className="blob w-96 max-md:w-40" />
        <div className="container relative mx-auto px-4 md:px-6 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl text-white font-serif font-bold tracking-tight">
                Discover the best free stock photos
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Pexels offers high-quality, royalty-free stock photos and videos
                shared by talented creators.
              </p>
              <form className="flex items-center space-x-2">
                <Input
                  className="flex-1 rounded-md border border-gray-200 border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent dark:border-gray-800"
                  placeholder="Search for photos..."
                  type="search"
                />
                <Button type="submit">Search</Button>
              </form>
            </div>
            <img
              alt="Hero Image"
              className="rounded-lg shadow-lg"
              height={600}
              src="https://images.pexels.com/photos/18846660/pexels-photo-18846660.jpeg?cs=srgb&dl=pexels-matt-g-623574593-18846660.jpg&fm=jpg"
              style={{
                aspectRatio: "800/600",
                objectFit: "cover",
              }}
              width={800}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
