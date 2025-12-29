import { useEffect, useMemo, useState } from "react";
import DataTable from "../components/datatable/DataTable";
import axios from "axios";
import Navbar from "../Layout/Navbar";
type User = {
    id: number;
    name: string;
    email: string;
    role: string;
};
type ApiUser = {
  id: number;
  name: string;
  email: string;
  username: string;
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
    const [searchText, setSearchText] = useState("");
    const [sortDirection, setSortDirection] =
    useState<"asc" | "desc">("asc");


    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const res = await axios(
                    "https://jsonplaceholder.typicode.com/users"
                );
                const data: ApiUser[] = res.data;
                const mappedUsers: User[] = data.map((item) => ({
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
  const filteredCount = useMemo(() => {
    if (!searchText) return users.length;

    const lowerSearch = searchText.toLowerCase();
    return users.filter((row) =>
      columns.some((col) =>
        String(row[col.key]).toLowerCase().includes(lowerSearch)
      )
    ).length;
  }, [users, searchText, columns]);
return (
    <div style={{ padding: 20 }}>
        <Navbar
        searchText={searchText}
        onSearch={setSearchText}
        sortDirection={sortDirection}
        onSortChange={setSortDirection}
        totalUsers={filteredCount}
      />
        {loading ? (
            <p>Loading...</p>
        ) : (
            <DataTable<User>
                columns={columns}
                data={users}
                searchText={searchText}
                onRowSelect={(row) => console.log("Selected:", row)}
                sortDirection={sortDirection}
            />
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
);
}


