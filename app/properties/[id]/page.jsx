"use client";

import { fetchProperty } from "@/utils/requests";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyDetails from "@/components/PropertyDetails";
import PropertyImages from "@/components/PropertyImages";
import { FaArrowLeft } from "react-icons/fa";
import Spinner from "@/components/Spinner";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButtons from "@/components/ShareButtons";
import PropertyContactForm from "@/components/PropertyContactForm";

const PropertyPage = () => {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchData = async () => {

      if (!id) { return; };
      //console.log("*** Fetching data ***", id);

      try {
        const _property = await fetchProperty(id);
        setProperty(_property);
      }
      catch (error) {
        console.error("Error fetching property", error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchData();

  }, [id])

  if (!loading && !property) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property not found
      </h1>
    )
  }

  if (!loading) {
    return (
      <>
        <PropertyHeaderImage image={property.images[0]} />
        <section>
          <div className="container m-auto py-6 px-6">
            <Link
              href="/properties"
              className="text-blue-500 hover:text-blue-600 flex items-center"
            >
              <FaArrowLeft className="mr-2" /> Back to Properties
            </Link>
          </div>
        </section>

        <section className="bg-blue-50">
          <div className="container m-auto py-10 px-6">
            <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
              <PropertyDetails property={property} />

              <aside className="space-y-4">
                <BookmarkButton property={property} />
                <ShareButtons property={property} />

                <PropertyContactForm property={property} />
              </aside>
            </div>
          </div>
        </section>
        <PropertyImages images={property.images} />
      </>
    )
  }

  if (loading) {
    return (
      <Spinner />
    )
  }
};

export default PropertyPage;
