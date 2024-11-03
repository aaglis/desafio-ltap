import { useState } from "react";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IUser } from "@/core/interfaces/user.interface";

const createUserFormSchema = z.object({
  name: z.string().min(5, "Nome precisa ter no mínimo 5 caracteres."),
  email: z
    .string()
    .min(1, "O email é obrigatório.")
    .email("O email digitado é inválido."),
});

function Modal() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUser>({
    resolver: zodResolver(createUserFormSchema),
  });
  const addUser = useTypedStoreActions((actions) => actions.addUser);

  async function createUser(data: IUser) {
    try {
      await addUser(data);
      toast.success("Usuário criado com sucesso!");
      reset();
      setIsOpen(false);
    } catch (err) {
      console.log(err);
      toast.error("Erro ao criar um usuário.");
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Adicionar Usuário</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Usuário</DialogTitle>
          <DialogDescription>
            Todos os campos são obrigatórios
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-3" onSubmit={handleSubmit(createUser)}>
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
            <Button type="submit">Adicionar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
