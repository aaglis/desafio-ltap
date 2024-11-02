import { useStoreActions } from "easy-peasy";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { UserModel } from "@/core/stores/users.store";
import { toast } from "react-toastify";

interface IModalProps {
  userId: number;
}

function AlertModal({ userId }: IModalProps) {
  const deleteUser = useStoreActions(
    (actions: UserModel) => actions.removeUser,
  );

  const handleDelete = async () => {
    try {
      await deleteUser(userId);
      toast.success("Usuário deletado com suceesso!");
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      toast.error("Erro ao deletar usuário");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Apagar</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Você está apagando um usário. Esta ação é irreversível.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600"
            onClick={() => handleDelete()}
          >
            Apagar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AlertModal;
