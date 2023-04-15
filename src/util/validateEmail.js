export default function validateEmail(email) {
    // Khai báo biến regex kiểm tra email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@fpt\.edu\.vn$/
    
    // Sử dụng method test để kiểm tra email
    if (emailRegex.test(email)) {
      return true;
    } else {
      return false;
    }
  }
  