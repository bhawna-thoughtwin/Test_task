import DataTable from "../components/datatable/DataTable";


type User = {
  name: string;
  email: string;
  role: string;
};

const columns: { key: keyof User; label: string }[] = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
];

const data: User[] = [
  { name: "Alice", email: "alice@example.com", role: "Admin" },
  { name: "Bob", email: "bob@example.com", role: "User" },
  { name: "Charlie", email: "charlie@example.com", role: "Guest" },
];

export default function DemoTable() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Users</h2>
      <DataTable<User>
        columns={columns}
        data={data}
        onRowSelect={(row) => console.log(row)}
      />
    </div>
  );
}
