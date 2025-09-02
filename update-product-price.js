// Danh sách sản phẩm mẫu
const products = [
    { id: 1, name: "iPhone 14", price: 25000000 },
    { id: 2, name: "Samsung Galaxy S23", price: 20000000 },
    { id: 3, name: "Xiaomi Mi 13", price: 15000000 }
];

// Hàm hiển thị danh sách sản phẩm
function displayProducts() {
    console.log("Danh sách sản phẩm:");
    products.forEach(product => {
        console.log(`ID: ${product.id}, Tên: ${product.name}, Giá: ${product.price} VND`);
    });
}

// Hàm cập nhật giá sản phẩm
function updatePrice(productId, newPrice) {
    const product = products.find(p => p.id === productId);
    if (product) {
        product.price = newPrice;
        console.log(`Giá sản phẩm "${product.name}" đã được cập nhật thành ${newPrice} VND.`);
    } else {
        console.log(`Không tìm thấy sản phẩm với ID: ${productId}.`);
    }
}

// Sử dụng
displayProducts(); // Hiển thị danh sách sản phẩm ban đầu
updatePrice(2, 21000000); // Cập nhật giá sản phẩm có ID 2
displayProducts(); // Hiển thị danh sách sản phẩm sau khi cập nhật


//làm khá tốt!!!!