export function FocusCategorySkeleton() {
  return (
    <section className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2].map((_, index) => (
          <div
            key={index}
            className="bg-white border border-stone-200 shadow-sm rounded-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row items-center p-4">
              {/* Text Section Placeholder */}
              <div className="md:w-1/3 text-center md:text-left mb-4 md:mb-0">
                <div className="h-4 bg-stone-200 rounded w-24 mx-auto md:mx-0 mb-2 animate-pulse"></div>
                <div className="h-3 bg-stone-200 rounded w-16 mx-auto md:mx-0 animate-pulse"></div>
              </div>
              {/* Image Section Placeholder */}
              <div className="md:w-2/3 w-full">
                <div className="h-48 bg-stone-200 animate-pulse rounded-sm"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
