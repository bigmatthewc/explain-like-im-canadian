"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import classNames from "classnames";

export default function ArticlePage({ params }) {
  const [mainArticle, setMainArticle] = useState(null);
  const [selectedPerspective, setSelectedPerspective] = useState("CBC");

  useEffect(() => {
    const fetchArticle = async () => {
      const response = await fetch(`http://localhost:5000/articles?slug=${params.slug}`);
      const data = await response.json();
      setMainArticle(data[0]); // Assuming the API response is an array of articles
    };

    fetchArticle();
  }, [params.slug]);

  // Function to handle perspective change
  const handlePerspectiveChange = (perspective) => {
    setSelectedPerspective(perspective);
  };

  if (!mainArticle) {
    return <div>Loading article...</div>;
  }

  // Find the related article based on the selected perspective
  const relatedArticle = mainArticle.related.find(
    (article) => article.source === selectedPerspective
  );

  // If no related article found for the perspective, fall back to the main article
  const articleToDisplay = relatedArticle || mainArticle;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white mt-6 rounded-xl shadow-md">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
        <ol className="list-reset flex items-center space-x-2">
          <li>
            <Link href="/" className="text-blue-600 hover:underline">Home</Link>
          </li>
          <li>/</li>
          <li className="text-gray-700 font-medium">{mainArticle.title}</li>
        </ol>
      </nav>

      {/* Perspective Toggle */}
      <div className="flex space-x-4 mb-6">
        <button
          className={classNames("px-4 py-2 rounded-lg", {
            "bg-blue-500 text-white": selectedPerspective === "CBC",
            "bg-gray-200 text-black": selectedPerspective !== "CBC"
          })}
          onClick={() => handlePerspectiveChange("CBC")}
        >
          CBC
        </button>
        <button
          className={classNames("px-4 py-2 rounded-lg", {
            "bg-blue-500 text-white": selectedPerspective === "National Post",
            "bg-gray-200 text-black": selectedPerspective !== "National Post"
          })}
          onClick={() => handlePerspectiveChange("National Post")}
        >
          National Post
        </button>
        <button
          className={classNames("px-4 py-2 rounded-lg", {
            "bg-blue-500 text-white": selectedPerspective === "BBC",
            "bg-gray-200 text-black": selectedPerspective !== "BBC"
          })}
          onClick={() => handlePerspectiveChange("BBC")}
        >
          BBC
        </button>
      </div>

      {/* Article content */}
      <h1 className="text-2xl font-bold mb-2">{articleToDisplay.title}</h1>
      <div className="text-gray-700 whitespace-pre-line mb-4">{articleToDisplay.content}</div>

      <div className="bg-blue-50 p-4 rounded-lg text-blue-900 italic">
        Explain Like I'm Canadian: {articleToDisplay.explainLikeCanadian}
      </div>
    </div>
  );
}
