// app/dapps/[id]/page.tsx
import { dapps, tagColors } from "@/utils/constants/dapps";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dapp = dapps.find((d) => d.id === params.id);

  if (!dapp) {
    return {
      title: "Tool Not Found",
      description: "The requested tool could not be found",
    };
  }

  return {
    title: `${dapp.name} - ${dapp.title}`,
    description: dapp.description,
    openGraph: {
      title: dapp.title,
      description: dapp.shortDescription,
      images: [
        {
          url: dapp.logo,
          width: 96,
          height: 96,
          alt: `${dapp.name} logo`,
        },
      ],
    },
    keywords: dapp.tags,
  };
}

export async function generateStaticParams() {
  return dapps.map((dapp) => ({
    id: dapp.id,
  }));
}

function getRelatedDapps(currentDapp: (typeof dapps)[0], count = 3) {
  return dapps
    .filter(
      (dapp) =>
        dapp.id !== currentDapp.id &&
        dapp.tags.some((tag) => currentDapp.tags.includes(tag))
    )
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
}

export default function DappPage({ params }: Props) {
  const dapp = dapps.find((d) => d.id === params.id);

  if (!dapp) {
    notFound();
  }

  const relatedDapps = getRelatedDapps(dapp);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Header Section */}
        <div className="flex items-center gap-6 mb-8">
          <img
            src={dapp.logo}
            alt={`${dapp.name} logo`}
            width={96}
            height={96}
            className="rounded-lg"
          />
          <div>
            <h1 className="text-3xl font-bold mb-2">{dapp.name}</h1>
            <h2 className="text-xl text-gray-600 mb-4">{dapp.title}</h2>
            <div className="flex flex-wrap gap-2">
              {dapp.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-3 py-1 rounded-full text-sm ${
                    tagColors[tag] || "bg-gray-100 text-gray-800"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">About {dapp.name}</h3>
          <p className="text-gray-700 leading-relaxed">{dapp.description}</p>
        </div>

        {/* Links Section */}
        <div className="flex flex-wrap gap-4">
          <Link
            href={dapp.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Visit Website
          </Link>
          {dapp.twitter && (
            <Link
              href={dapp.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
            >
              Twitter
            </Link>
          )}
          {dapp.github && (
            <Link
              href={dapp.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
            >
              GitHub
            </Link>
          )}
        </div>
      </div>

      {/* Related Projects Section */}
      <div className="bg-primary-foreground rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-6">Related Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedDapps.map((related) => (
            <Link
              key={related.id}
              href={`/tools/${related.id}`}
              className="block p-4 rounded-lg border border-gray-400 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 mb-3">
                <Image
                  src={related.logo}
                  alt={`${related.name} logo`}
                  width={48}
                  height={48}
                  className="rounded-lg"
                />
                <div>
                  <h4 className="font-semibold">{related.name}</h4>
                  <p className="text-sm text-gray-600">{related.title}</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 line-clamp-2">
                {related.shortDescription}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}