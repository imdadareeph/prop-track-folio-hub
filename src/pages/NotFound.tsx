
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-slate-900 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold mb-4 text-propertyBlue">404</h1>
        <p className="text-xl text-slate-700 dark:text-slate-300 mb-6">Oops! We couldn't find that page.</p>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Button asChild>
          <a href="/">Return to Dashboard</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
