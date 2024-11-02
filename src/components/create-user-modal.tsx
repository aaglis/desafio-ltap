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

function Modal() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const addUser = useTypedStoreActions((actions) => actions.addUser);

  function handleChange(e: any) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function submitForm(e: any) {
    e.preventDefault();
    try {
      await addUser(formData);
      setFormData({ name: "", email: "" });
      toast.success("Usuário criado com suceesso!");
    } catch (err) {
      console.log(err);
      toast.error("Erro ao criar um usuário.");
    }
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Adicionar Usuário</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Usuário</DialogTitle>
            <DialogDescription>
              Todos os campos são obrigatórios
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-3" onSubmit={submitForm}>
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
                <Button type="button" variant="ghost">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit">Adicionar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Modal;
