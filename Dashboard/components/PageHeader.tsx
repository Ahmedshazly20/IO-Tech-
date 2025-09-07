import { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
  backLink?: string;
}

export function PageHeader({ title, description, action, backLink }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {backLink && (
            <Link
              href={backLink}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            {description && (
              <p className="mt-2 text-gray-600">{description}</p>
            )}
          </div>
        </div>
        {action && <div>{action}</div>}
      </div>
    </div>
  );
}