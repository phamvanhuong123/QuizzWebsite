import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ArrowRight } from "lucide-react";

interface SubmitQuizButtonProps {
  onSubmit: () => void;
}

function SubmitQuizButton({ onSubmit }: SubmitQuizButtonProps) {
  const [open, setOpen] = useState(false);

  const handleConfirmSubmit = () => {
    onSubmit();
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button className="cursor-pointer bg-[#ec5b13] hover:bg-[#ec5b13]/90 text-white font-bold rounded-xl shadow-lg shadow-[#ec5b13]/20">
            Submit
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        }
      />

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to submit?</AlertDialogTitle>
          <AlertDialogDescription>
            After submitting, you will not be able to change your answers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
          <Button
            onClick={handleConfirmSubmit}
            className="cursor-pointer bg-[#ec5b13] hover:bg-[#ec5b13]/90"
          >
            Confirm Submit
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default SubmitQuizButton;