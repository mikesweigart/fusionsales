import React from 'react';
import { ArrowUpRight, Clock } from 'lucide-react';
import AuthorAvatar from './AuthorAvatar';

export default function ArticleCard({ article, author, authorKey, featured = false }) {
  const isPublished = article.status === 'published';
  const Tag = isPublished ? 'a' : 'div';
  const interactiveClass = isPublished
    ? 'group cursor-pointer hover:border-gray-900 hover:-translate-y-0.5'
    : 'opacity-60 cursor-not-allowed';

  return (
    <Tag
      href={isPublished ? `/insights/${article.slug}` : undefined}
      className={[
        'block bg-white border border-gray-200 p-7 md:p-8 transition-all duration-300 h-full flex flex-col',
        interactiveClass,
        featured ? 'md:col-span-2 md:flex-row md:gap-10' : '',
      ].join(' ')}
      aria-disabled={!isPublished}
    >
      <div className={['flex-1', featured ? 'md:max-w-md' : ''].join(' ')}>
        <div className="flex items-center justify-between mb-5">
          <span className="text-[11px] uppercase tracking-[0.22em] text-gray-500">
            {article.category}
          </span>
          {isPublished ? (
            <ArrowUpRight
              className="w-4 h-4 text-gray-400 group-hover:text-brand-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
              strokeWidth={1.5}
            />
          ) : (
            <span className="text-[10px] uppercase tracking-[0.2em] text-brand-700 border border-brand-200 bg-brand-50 px-2 py-0.5 rounded-full">
              Coming soon
            </span>
          )}
        </div>

        <h3
          className={[
            'font-display font-light tracking-tight text-gray-900 leading-tight mb-3',
            featured ? 'text-2xl md:text-3xl' : 'text-xl md:text-[1.35rem]',
          ].join(' ')}
        >
          {article.title}
        </h3>

        <p className="text-sm text-gray-700 leading-relaxed mb-6 flex-1">{article.excerpt}</p>

        <div className="flex items-center justify-between gap-3 mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2.5 min-w-0">
            <AuthorAvatar author={author} authorKey={authorKey} size="xs" />
            <span className="text-xs text-gray-800 truncate">
              {author?.name}
              <span className="text-gray-500"> &middot; {author?.title}</span>
            </span>
          </div>
          {article.readTime && isPublished && (
            <span className="text-xs text-gray-600 inline-flex items-center gap-1 shrink-0">
              <Clock className="w-3 h-3" strokeWidth={1.5} />
              {article.readTime} min
            </span>
          )}
        </div>
      </div>
    </Tag>
  );
}
