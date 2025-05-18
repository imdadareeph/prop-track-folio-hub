
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface MediaCardProps {
  title: string;
  url: string;
  type: "image" | "document";
  date?: string;
}

const MediaCard = ({ title, url, type, date }: MediaCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString();
  };

  const renderThumbnail = () => {
    if (type === "image") {
      return (
        <div className="h-32 bg-slate-100 overflow-hidden">
          <img src={url} alt={title} className="w-full h-full object-cover" />
        </div>
      );
    } else {
      // Document thumbnail
      return (
        <div className="h-32 bg-slate-100 flex items-center justify-center">
          <div className="p-4 flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 text-propertyBlue"
            >
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            <span className="mt-2 text-xs text-slate-600">.PDF</span>
          </div>
        </div>
      );
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div
        className="rounded-lg overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 cursor-pointer hover:shadow-md transition-shadow duration-200"
        onClick={handleOpen}
      >
        {renderThumbnail()}
        <div className="p-3">
          <h4 className="text-sm font-medium truncate">{title}</h4>
          {date && <p className="text-xs text-slate-500 mt-1">{formatDate(date)}</p>}
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl">
          <div className="py-4">
            <h3 className="text-lg font-semibold mb-4">{title}</h3>
            {type === "image" ? (
              <img
                src={url}
                alt={title}
                className="max-h-[70vh] w-auto mx-auto object-contain"
              />
            ) : (
              <iframe
                src={url}
                title={title}
                className="w-full h-[70vh]"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MediaCard;
