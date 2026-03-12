import { Link } from 'react-router-dom';

const CategoryCard = ({ title, image, link }) => {
  return (
    <Link to={link} className="group block overflow-hidden rounded-xl">
      <div className="relative h-72">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h3 className="font-serif text-white text-2xl">{title}</h3>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
