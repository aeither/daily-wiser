"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { dapps, tagColors } from "@/utils/constants/dapps";
import { Github, Globe, Search, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ImprovedProjectList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 9;

  const filteredProjects = dapps.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const pageCount = Math.ceil(filteredProjects.length / projectsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">EDU Chain Directory</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore projects building on EDU Chain, a Layer 3 (L3) blockchain
          built specifically for the education industry. Browse digital
          credentials, decentralized courses, and other initiatives shaping the
          future of education on OpenCampus.
        </p>
      </header>

      <div className="relative mb-8">
        <Input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProjects.map((project) => (
          <Card
            key={project.id}
            className="flex flex-col group hover:shadow-lg transition-shadow duration-200"
          >
            <Link href={`/tools/${project.id}`} className="flex-grow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                    <Image
                      src={project.logo}
                      alt={`${project.name} logo`}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                      {project.name}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold mb-2">{project.title}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {project.shortDescription}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      className={tagColors[tag] || "bg-gray-100 text-gray-800"}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Link>
            <CardFooter className="flex justify-between items-center">
              <div className="flex gap-2">
                {project.twitter && (
                  <a
                    href={project.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.name} Twitter`}
                    className="hover:scale-110 transition-transform"
                  >
                    <Twitter className="w-5 h-5 text-gray-500 hover:text-blue-400" />
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.name} GitHub`}
                    className="hover:scale-110 transition-transform"
                  >
                    <Github className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                  </a>
                )}
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.name} Website`}
                  className="hover:scale-110 transition-transform"
                >
                  <Globe className="w-5 h-5 text-gray-500 hover:text-green-500" />
                </a>
              </div>
              <Button asChild>
                <Link href={`/tools/${project.id}`}>Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {pageCount > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((number) => (
            <Button
              key={number}
              variant={currentPage === number ? "default" : "outline"}
              onClick={() => handlePageChange(number)}
              className="min-w-[40px]"
            >
              {number}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
