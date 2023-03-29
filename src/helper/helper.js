export function formatPrice(price) {
    // Chuyển đổi số sang chuỗi
    let priceString = price.toString();
    
    // Tìm vị trí của ký tự "."
    let decimalIndex = priceString.indexOf(".");
    
    // Nếu không có ký tự ".", chèn vào cuối chuỗi
    if (decimalIndex === -1) {
      decimalIndex = priceString.length;
      priceString += ".";
    }
    
    // Duyệt từ phải sang trái và chèn dấu "," vào mỗi hàng nghìn
    for (let i = decimalIndex - 3; i > 0; i -= 3) {
      priceString = priceString.slice(0, i) + "." + priceString.slice(i);
    }
    
    // Trả về chuỗi giá đã được định dạng
    return priceString;
  }
  

  export function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }
  