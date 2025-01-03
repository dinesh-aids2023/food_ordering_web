document.addEventListener("DOMContentLoaded", () => {
    const cartBadge = document.getElementById("cart-badge");
    const cartContent = document.getElementById("cart-content");
    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

    let cartItems = [];
    let cartTotal = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener("click", event => {
            event.preventDefault();
            const foodMenuBox = button.closest(".food-menu-box");
            const name = foodMenuBox.querySelector("h4").innerText;
            const price = parseFloat(foodMenuBox.querySelector(".food-price").innerText.replace("$", ""));
            const quantityInput = foodMenuBox.querySelector('input[type="number"]');
            const quantity = parseInt(quantityInput.value);

            const existingItemIndex = cartItems.findIndex(item => item.name === name);
            if (existingItemIndex > -1) {
                cartItems[existingItemIndex].quantity += quantity;
                cartItems[existingItemIndex].totalPrice += price * quantity;
            } else {
                cartItems.push({
                    name,
                    price,
                    quantity,
                    totalPrice: price * quantity
                });
            }

            updateCartDisplay();
        });
    });

    function updateCartDisplay() {
        const tableBody = cartContent.querySelector(".cart-table tbody");
        tableBody.innerHTML = ""; 

        cartItems.forEach((item, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>$${item.totalPrice.toFixed(2)}</td>
                <td>
                    <button class="btn-delete" data-index="${index}">&times;</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        const totalRow = document.createElement("tr");
        totalRow.innerHTML = `
            <td colspan="3" class="text-right"><strong>Total</strong></td>
            <td colspan="2"><strong>$${calculateCartTotal().toFixed(2)}</strong></td>
        `;
        tableBody.appendChild(totalRow);

        cartBadge.textContent = cartItems.length; 
    }

    function calculateCartTotal() {
        return cartItems.reduce((total, item) => total + item.totalPrice, 0);
    }

    cartContent.addEventListener("click", event => {
        if (event.target.classList.contains("btn-delete")) {
            const itemIndex = parseInt(event.target.dataset.index, 10);
            cartItems.splice(itemIndex, 1);
            updateCartDisplay();
        }
    });
    const shoppingCartIcon = document.getElementById("shopping-cart");
    shoppingCartIcon.addEventListener("click", () => {
        cartContent.classList.toggle("visible");
    });
});
