import { useState } from "react";
import { Plus, Trash2, UserPlus } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { User } from "@/components/quote-form/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, deleteUser, getAllUsers } from "@/services/userService";


export default function UsersPage() {
    const [newUser, setNewUser] = useState({ name: "", email: "", role: "" });
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const queryClient = useQueryClient();

    const { data: users = [], isLoading, error } = useQuery({
        queryKey: ['users'],
        queryFn: getAllUsers,
    });

    const createUserMutation = useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            setNewUser({ name: "", email: "", role: "" });
            setIsDialogOpen(false);
            toast.success("User added successfully");
        },
        onError: (error) => {
            toast.error("Failed to add user: " + error.message);
        },
    });
    const deleteUserMutation = useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast.success("User deleted successfully");
        },
        onError: (error) => {
            toast.error("Failed to delete user: " + error.message);
        },
    });

    const handleAddUser = () => {
        if (!newUser.name || !newUser.email || !newUser.role) {
            toast.error("Please fill in all fields");
            return;
        }

        createUserMutation.mutate(newUser as User);
    };
    return (
        <SidebarProvider defaultOpen={true}>
            <div className="min-h-screen flex w-full bg-gradient-to-br from-[#F6F6F7] to-[#F2FCE2]">
                <AppSidebar />
                <main className="flex-1 p-8">
                    <div className="flex justify-between items-center mb-8">
                        <SidebarTrigger />
                    </div>
                    {isLoading ? (
                        <div className="flex items-center justify-center h-32">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700"></div>
                        </div>
                    ) : (
                        <div className="container mx-auto py-4 md:py-8 px-2 md:px-4 animate-fade-in">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-8 gap-4">
                                <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
                                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button className="w-full md:w-auto flex items-center gap-2 bg-slate-600 hover:bg-slate-500">
                                            <UserPlus className="w-4 h-4" />
                                            Add User
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="w-[95vw] max-w-md mx-auto">
                                        <DialogHeader>
                                            <DialogTitle>Add New User</DialogTitle>
                                        </DialogHeader>
                                        <div className="space-y-4 py-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">Name</Label>
                                                <Input
                                                    id="name"
                                                    value={newUser.name}
                                                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={newUser.email}
                                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="role">Role</Label>
                                                <Input
                                                    id="role"
                                                    value={newUser.role}
                                                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                                />
                                            </div>
                                            <Button
                                                className={createUserMutation.isPending ? "w-full bg-green-600 hover:bg-green-500" : "w-full bg-purple-500 hover:bg-purple-600"}
                                                onClick={handleAddUser}
                                                disabled={createUserMutation.isPending}
                                            >
                                                {createUserMutation.isPending ? "Adding..." : "Add User"}
                                            </Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>

                            <div className="overflow-x-auto bg-white rounded-lg shadow -mx-4 sm:mx-0">
                                <Table className="min-w-full divide-y divide-gray-200">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Name
                                            </TableHead>
                                            <TableHead className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Email
                                            </TableHead>
                                            <TableHead className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Role
                                            </TableHead>
                                            <TableHead className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {users.map((user) => (
                                            <TableRow key={user.id} className="hover:bg-gray-50">
                                                <TableCell className="px-4 py-4 whitespace-normal">
                                                    <div className="flex flex-col md:flex-row">
                                                        <div className="font-medium text-gray-900">{user.name}</div>
                                                        <div className="md:hidden mt-1 text-sm text-gray-500">
                                                            {user.email}<br />
                                                            {user.role}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell px-4 py-4 whitespace-normal">
                                                    {user.email}
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell px-4 py-4 whitespace-normal">
                                                    {user.role}
                                                </TableCell>
                                                <TableCell className="px-4 py-4 text-right">
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() => deleteUserMutation.mutate(user.id)}
                                                        disabled={deleteUserMutation.isPending}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    )}

                </main>
            </div >
        </SidebarProvider >
    );
}