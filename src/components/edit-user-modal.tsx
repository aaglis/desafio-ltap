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
import { IEditUserModalProps } from "@/core/interfaces/user.interface";

function EditUserModal({ userData }: IEditUserModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
  });
  const updateUser = useTypedStoreActions((actions) => actions.updateUser);

  function handleChange(e: any) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function editUser(e: any) {
    e.preventDefault();

    try {
      await updateUser({ ...formData, id: userData.id });
      toast.success("Usuário atualizado com suceesso!");
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
          <Button onClick={() => setIsOpen(true)}>Editar</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
            <DialogDescription>
              Não se preocupe, você sempre poderá editar.
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-3" onSubmit={editUser}>
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
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
