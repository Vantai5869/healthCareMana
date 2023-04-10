import { formatPrice } from "../../helper/helper";

export const Columns = [
  { field: "id", headerName: "ID", width: 100 },

  {
    field: "name",
    headerName: "Tên Chi nhánh",
    width: 300,
  },

  {
    field: "phone",
    headerName: "Số điện thoại",
    width: 300,
  },
  {
    field: "address",
    headerName: "Địa chỉ",
    width: 300,
  },
 
];


export const healthBeautyServices = [
  {
    id: 1,
    image: "https://massageyoni247.com/wp-content/uploads/2018/10/su-can-thiet-cua-dich-vu-massage-yoni-trong-cuoc-song-hien-dai-1.jpg",
    name: "Dịch vụ massage",
    price: 200000,
    time: "60 phút",
    status: "sẵn sàng",
    code: "TD001",
  },
  {
    id:2,
    image: "https://spangochuong.com/upload/images/1-tuan-tay-te-bao-chet-may-lan-anh1.jpg",
    name: "Dịch vụ tẩy da chết",
    price: 150000,
    time: "30 phút",
    status: "sẵn sàng",
    code: "MS001",
  },
  {
    id:3,
    image: "https://trangha.com.vn/wp-content/uploads/2017/07/ch%C4%83m-s%C3%B3c-da-m%E1%BA%B7t-c%C6%A1-b%E1%BA%A3n-2.jpg",
    name: "Dịch vụ chăm sóc da",
    price: 300000,
    time: "90 phút",
    status: "sắp có",
    code: "CSD001",
  },
  // Các dịch vụ khác có thể được thêm vào đây
];