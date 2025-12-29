import styles from "./Navbar.module.css";
import type { NavbarProps } from "./Navbar.types";
const Navbar = ({ searchText, onSearch, totalUsers }: NavbarProps) => {
 return (
    <nav className={styles.navbar}>
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => onSearch(e.target.value)}
        className={styles.searchInput}
      />

      {/* <div className={styles.sortWrapper}>
        <label className={styles.sortLabel}>Sort By:</label>
        <select
          value={sortDirection}
          onChange={(e) =>
            onSortChange(e.target.value as "asc" | "desc")
          }
          className={styles.sortSelect}
        >
          <option  disabled value="asc">Ascending</option>
          <option disabled value="desc">Descending</option>
        </select>
      </div> */}
      <span className={styles.userCount}>Total User: {totalUsers}</span>
    </nav>
  );
};
export default Navbar;
