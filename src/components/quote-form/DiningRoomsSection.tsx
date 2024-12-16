import { DiningRoomFields } from "./DiningRoomFields";
import { UseFormReturn } from "react-hook-form";
import { QuoteFormData } from "./types";

interface DiningRoomsSectionProps {
  form: UseFormReturn<QuoteFormData>;
  diningRooms: QuoteFormData['diningRooms'];
}

export const DiningRoomsSection = ({ form, diningRooms }: DiningRoomsSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {diningRooms.map((_, index) => (
        <DiningRoomFields key={index} form={form} index={index} />
      ))}
    </div>
  );
};