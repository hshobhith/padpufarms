import React from "react";

// Automatically import images/videos from gallery folder
const importAll = (r) =>
  r.keys().map((key) => ({
    type: key.endsWith(".mp4") || key.endsWith(".mov") ? "video" : "image",
    src: r(key),
  }));

const mediaItems = importAll(
  require.context("../assets/gallery", false, /\.(png|jpe?g|mp4|mov)$/)
);

export default function Gallery() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Gallery</h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {mediaItems.map((item, index) => (
          <div key={index} className="rounded shadow overflow-hidden bg-white" data-aos="zoom-in">
            {item.type === "image" ? (
              <img
                src={item.src}
                alt={`media-${index}`}
                className="w-full h-64 object-cover"
              />
            ) : (
              <video controls className="w-full h-64 object-cover">
                <source src={item.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
