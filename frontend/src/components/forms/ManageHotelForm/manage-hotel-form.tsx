// import React from "react";
import { FormProvider, useForm } from "react-hook-form";

import FacilitiesSection from "./facilities-section";
import DetailsSection from "./details-section";
import GuestsSection from "./guests-section";
import TypeSection from "./type-section";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  imageUrls: string[];
  adultCount: number;
  childCount: number;
};

const ManageHotelForm = () => {
  const formMethods = useForm<HotelFormData>();
  return (
    <>
      <FormProvider {...formMethods}>
        <form action="">
          <DetailsSection />
          <TypeSection />
          <FacilitiesSection />
          <GuestsSection />
        </form>
      </FormProvider>
    </>
  );
};

export default ManageHotelForm;
