import { Link } from "react-router-dom";
import "./datatable.scss";

const TableLayout = ({
  children,
  linkAddNew = "/users/new",
  onClickAddNew = () => {},
}) => {
  const handleAddNew = () => {
    onClickAddNew();
  };
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Danh sách
        <div className="link" onClick={handleAddNew}>
          Thêm mới
        </div>
      </div>
      {children}
    </div>
  );
};

export default TableLayout;
