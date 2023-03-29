import { Link } from "react-router-dom";
import "./datatable.scss";

const TableLayout = ({ children, linkAddNew='/users/new' }) => {
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Danh sách
        <Link to={linkAddNew} className="link">
          Thêm mới
        </Link>
      </div>
      {children}
    </div>
  );
};

export default TableLayout;
