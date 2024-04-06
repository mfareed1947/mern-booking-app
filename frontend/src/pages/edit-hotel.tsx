import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";

import ManageHotelForm from "../components/forms/ManageHotelForm/manage-hotel-form";
import { useAppContext } from "../context/app-context";

import * as apiClient from "../api-client";

const EditHotel = () => {
  const { hotelId } = useParams();
  const { showToast } = useAppContext();
  
  const { data: hotel } = useQuery(
    "fetchMyHotelId",
    () => apiClient.fetchMyHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );

  const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
    onSuccess: () => {
      showToast({ message: "Hotel Saved!", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error Saving Hotel!", type: "ERROR" });
    },
  });

  const handleSave = (HotelFormData: FormData) => {
    mutate(HotelFormData);
  };

  return (
    <div>
      <ManageHotelForm
        hotel={hotel}
        onSave={handleSave}
        isLoading={isLoading}
      />
    </div>
  );
};

export default EditHotel;
