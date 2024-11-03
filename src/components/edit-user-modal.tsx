import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { toast } from "react-toastify";
import { useTypedStoreActions } from "@/core/hooks";
import { IEditUserModalProps, IUser } from "@/core/interfaces/user.interface";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const editUserFormSchema = z.object({
  name: z.string().min(5, "Nome precisa ter no mínimo 5 caracteres."),
  email: z
    .string()
    .min(1, "O email é obrigatório.")
    .email("O email digitado é inválido."),
});

function EditUserModal({ userData }: IEditUserModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUser>({
    resolver: zodResolver(editUserFormSchema),
  });
  const updateUser = useTypedStoreActions((actions) => actions.updateUser);

  useEffect(() => {
    if (isOpen && userData) {
      reset(userData);
    }
  }, [isOpen, userData, reset]);

  async function editUser(data: IUser) {
    try {
      await updateUser({ ...data, id: userData.id });
      toast.success("Usuário atualizado com suceesso!");
      reset();
      setIsOpen(false);
    } catch (err) {
      console.log(err);
      toast.error("Erro ao atualizar um usuário.");
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setIsOpen(true)} variant="outline">
            Editar
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
            <DialogDescription>
              Não se preocupe, você sempre poderá editar.
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-3" onSubmit={handleSubmit(editUser)}>
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input type="text" id="name" {...register("name")} />
              {errors.name && (
                <span className="flex text-red-500 text-sm pt-2">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input type="text" id="email" {...register("email")} />
              {errors.email && (
                <span className="flex text-red-500 text-sm pt-2">
                  {errors.email.message}
                </span>
              )}
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsOpen(false)}
                >
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default EditUserModal;
