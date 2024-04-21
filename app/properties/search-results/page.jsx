"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";


const SearchResultsPage = () => {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = searchParams.get("location");
  const propertyType = searchParams.get("propertyType");

  useEffect(() => {
    const fetchSearchResult = async () => {
      try {
        const res = await fetch(`/api/properties/search?location=${location}&propertyType=${propertyType}`);

        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        }
        else {
          setProperties([]);
        }
      }
      catch (error) {
        console.log(error);
      }
      finally {
        setLoading(false);
      }
    };
    
    fetchSearchResult();

  }, [location, propertyType])

  console.log(properties);

  return (
    <div>
      Search Results Page
    </div>
  )
};

export default SearchResultsPage;
