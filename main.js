const loadApi = () => {
    const url = 'https://fakestoreapi.com/products';
    fetch(url)
        .then(res => res.json())
        .then(data => displayTrandingProduct(data));

}

let count = 0;
const addToCarts = document.getElementById('addToCart');

const addToCart = (id) => {
    const url = `https://fakestoreapi.com/products/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(item => addToCartItem(item));
    count++;
    addToCarts.innerText = count;
}
const removeFromCart = (id) => {
    const ids = document.getElementById(`cart_item_${id}`);
    ids.remove();
    count = count - 1;
    addToCarts.innerText = count;
}


const showmodal = (id) => {
    const url = `https://fakestoreapi.com/products/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(items => modalData(items));
}


const modalData = (id) => {
    const modalss = document.getElementById('modal_content');
    modalss.innerHTML = "";
    const content = document.createElement('div');

    content.innerHTML = `
                    <div class="md:w-1/2 flex items-center justify-center bg-white rounded-xl p-8">
                        <img src="${id.image}" class="max-h-96 object-contain" />
                    </div>
                    <div class="md:w-1/2 flex flex-col">
                        <div class="badge badge-primary mb-4 capitalize">${id.category}</div>
                        <h2 class="text-3xl font-bold mb-4">${id.title}</h2>
                        <p class="text-base-content/70 leading-relaxed mb-8">${id.description}</p>
                        <div class="mt-auto">
                            <div class="text-4xl font-extrabold mb-6 text-primary">$${id.price}</div>
                            <button onclick="addToCart(${id.id})" class="btn btn-primary btn-lg w-full">Add to Cart</button>
                        </div>
                    </div>
                    <div class="modal-action">
                <form method="dialog"><button class="btn">Close</button></form>
            </div>
                `;

    content.className = 'flex';
    modalss.appendChild(content);
}

const addToCartItem = (item) => {
    console.log(item.id);

    const cardItem = document.getElementById('cardItem');
    const cardItemList = document.createElement('div');
    cardItemList.innerHTML = `
                <div id="cart_item_${item.id}" class="flex gap-4 items-center bg-base-200/50 p-3 rounded-xl">
                    <img src="${item.image}" class="w-16 h-16 object-contain bg-white rounded-lg p-1" />
                    <div class="flex-grow min-w-0">
                        <h4 class="font-semibold text-sm line-clamp-1">${item.title}</h4>
                        <p class="text-primary font-bold text-sm">$${item.price}</p>
                    </div>
                    <button onclick="removeFromCart(${item.id})" class="btn btn-ghost btn-xs btn-circle text-error">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
    `;
    cardItem.appendChild(cardItemList);
}



const displayTrandingProduct = (data) => {
    const trandingProduct = document.getElementById('trandingProduct');
    let threeProduct = 0;

    for (let datas of data) {
        const ratingdata = datas.rating.rate;
        const trandingProductCard = document.createElement('div');
        if (ratingdata >= 3.9) {
            threeProduct++;
            trandingProductCard.innerHTML = `
                <div class="card bg-base-100 shadow-sm overflow-hidden border border-base-200 group">
                <figure class="bg-gray-100 h-64 p-8 relative overflow-hidden">
                    <img src="${datas.image}" alt="T-Shirt"
                        class="object-contain h-full w-full group-hover:scale-110 transition-transform duration-300" />
                </figure>
                <div class="card-body p-5">
                    <div class="flex justify-between items-center mb-1">
                        <span
                            class="badge badge-primary bg-primary/10 text-primary border-none text-[10px] font-bold py-3">${datas.category}</span>
                        <div class="flex items-center gap-1 text-xs font-bold text-yellow-500">
                            <span>⭐</span> ${datas.rating.rate} (${datas.rating.count})
                        </div>
                    </div>
                    <h3 class="card-title text-sm line-clamp-1">${datas.title}</h3>
                    <p class="text-xl font-bold mt-1 text-primary">$${datas.price}</p>
                    <div class="card-actions grid grid-cols-2 gap-2 mt-4">
                        <button onclick="showmodal(${datas.id}); product_modal.showModal()" class="btn btn-outline btn-sm font-semibold capitalize">Details</button>
                        <button onClick="addToCart(${datas.id})" class="btn btn-primary btn-sm font-semibold capitalize">Add</button>
                    </div>
                </div>
            </div>
            `;
            trandingProduct.appendChild(trandingProductCard);
            if (threeProduct === 3) {
                break;
            }
        }

    };
}
loadApi();