import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./components/ui/button";
import { useStoreActions, useStoreState } from "easy-peasy";
import { UserModel } from "./core/stores/users.store";
import Modal from "./components/create-user-modal";
import EditUserModal from "./components/edit-user-modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AlertModal from "./components/alert-modal";

function App() {
  const users = useStoreState((state: UserModel) => state.users);
  const fetchUsers = useStoreActions(
    (actions: UserModel) => actions.fetchUsers,
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <>
      <ToastContainer />
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="font-bold text-xl text-center py-4">
          Desafio LTAP: CRUD de Usuários
        </h1>
        <div>
          <div className="flex justify-end pb-3">
            <Modal key="createUserModal" />
          </div>
          <Table className="border rounded mx-auto pl-2">
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users &&
                users.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell className="space-x-4">
                        <EditUserModal userData={item} />
                        {/* <Button
                          variant="destructive"
                          onClick={() => handleDelete(item.id)}
                        >
                          Apagar
                        </Button> */}
                        <AlertModal userId={item.id} />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default App;
