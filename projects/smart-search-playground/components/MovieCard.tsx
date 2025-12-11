import React from 'react'

type MovieCardProps = {
    title: string
    year?: number
    image?: string
    link?: string
    rank?: number
}

const MovieCard: React.FC<MovieCardProps> = ({ title, year, image, link, rank }) => {
    return (
        <article className="bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow flex flex-col h-full">
        {/* Image */}
        <div className="relative w-full h-48 overflow-hidden bg-slate-700">
            {image ? (
            <img src={image} alt={title} className="w-full h-full object-cover" />
            ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
                No Image
            </div>
            )}
            {rank && (
            <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                #{rank}
            </div>
            )}
        </div>
        {/* Content */}
        <div className="flex-1 p-4 flex flex-col justify-between">
            <div>
            <h3 className="text-sm font-semibold text-white line-clamp-2">{title}</h3>
            {year && <p className="text-xs text-slate-400 mt-2">{year}</p>}
            </div>
            {link && (
            <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded hover:bg-blue-700 transition-colors text-center"
            >
                View on IMDb
            </a>
            )}
        </div>
        </article>
    )
}

export default MovieCard