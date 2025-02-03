import { DiningRoomFields } from "./DiningRoomFields";
import { UseFormReturn } from "react-hook-form";
import { QuoteFormData } from "./types";
import { useToast } from "@/hooks/use-toast";

interface DiningRoomsSectionProps {
  form: UseFormReturn<QuoteFormData>;
  diningRooms: QuoteFormData['diningRooms'];
}

export const DiningRoomsSection = ({ form, diningRooms }: DiningRoomsSectionProps) => {
  const { toast } = useToast();

  const handleRemoveDiningRoom = (index: number) => {
    if (diningRooms.length <= 1) {
      toast({
        title: "Cannot Remove",
        description: "You must have at least one dining room",
        variant: "destructive",
      });
      return;
    }

    const newDiningRooms = [...diningRooms];
    newDiningRooms.splice(index, 1);
    form.setValue("diningRooms", newDiningRooms);
    form.setValue("numberOfDiningRooms", newDiningRooms.length);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {diningRooms.map((_, index) => (
        <DiningRoomFields 
          key={index} 
          form={form} 
          index={index} 
          onRemove={handleRemoveDiningRoom}
        />
      ))}
    </div>
  );
};