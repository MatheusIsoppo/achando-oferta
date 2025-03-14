
import { Link } from "react-router-dom";

interface BlogCardProps {
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  categories: string[];
  slug: string;
}

const BlogCard = ({ title, excerpt, image, author, date, categories, slug }: BlogCardProps) => {
  return (
    <Link to={`/blog/${slug}`} className="group">
      <article className="bg-white rounded-md overflow-hidden border border-gray-100 transition-all duration-300 hover:border-gray-200">
        <div className="aspect-w-16 aspect-h-9 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <div className="flex gap-2 mb-2">
            {categories.slice(0, 1).map((category) => (
              <span
                key={category}
                className="text-xs font-normal px-2 py-0.5 bg-blue-50 text-primary rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
          <h3 className="text-base font-medium mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-gray-600 mb-3 line-clamp-2 text-xs">{excerpt}</p>
          <div className="flex items-center text-xs text-gray-400">
            <span>{author}</span>
            <span className="mx-2">•</span>
            <span>{date}</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
