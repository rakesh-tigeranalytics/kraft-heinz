export default function Header() {
  return (
    <div className="h-32 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center">
        <img
          src="/kraftHeinz_logo.png"
          alt="kraft-heinz"
          className="h-8 mr-4"
        />
        <span className="text-sm text-gray-600">
          Research & Development Data Product Hub
        </span>
      </div>

      <div className="text-right">
        <h1 className="text-xl font-semibold text-gray-900">
          R&D Project Management
        </h1>
        <p className="text-sm text-gray-500">
          Discover and access data products for research and development
        </p>
      </div>
    </div>
  );
}
