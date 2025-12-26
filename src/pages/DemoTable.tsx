import { useEffect, useState } from "react";
import DataTable from "../components/datatable/DataTable";
type User = {
    id: number;
    name: string;
    email: string;
    role: string;
};

const columns: { key: keyof User; label: string }[] = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
];
export default function DemoTable() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    "https://jsonplaceholder.typicode.com/users"
                );
                const data = await res.json();

                const mappedUsers: User[] = data.map((item: any) => ({
                    id: item.id,
                    name: item.name,
                    email: item.email,
                    role: item.username, // dummy role
                }));

                setUsers(mappedUsers);
            } catch {
                setError("Failed to load data");
            }
        finally {
            setLoading(false);
        }
    };
    fetchUsers();
}, []);

return (
    <div style={{ padding: 20 }}>
        <h2>Users Data</h2>

        {loading ? (
            <p>Loading...</p>
        ) : (
            <DataTable<User>
                columns={columns}
                data={users}
                onRowSelect={(row) => console.log("Selected:", row)}
            />
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}

    </div>
);
}


