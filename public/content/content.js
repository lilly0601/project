// // // content.js
// // console.log("Wishlist content script активен ✨");
// // debugger
// // // Пример: автоматически достаём название страницы
// // const title = document.title;

// // chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
// //   if (msg.action === "getTitle") {
// //     sendResponse({ title });
// //   }
// // });

// // const container = document.createElement("div");
// // container.id = "my-vue-button-container";
// // document.body.appendChild(container);

// // Находим ul с id catalog-grid
// const catalog = document.querySelector("#catalog-grid");

// if (catalog) {
//   const items = catalog.querySelectorAll("li");

//   items.forEach((li) => {
//     const button = document.createElement("button");
//     button.textContent = "Добавить в вишлист";

//     button.style.marginLeft = "10px";
//     button.style.padding = "5px 10px";
//     button.style.backgroundColor = "#ff4081";
//     button.style.color = "white";
//     button.style.border = "none";
//     button.style.borderRadius = "4px";
//     button.style.cursor = "pointer";

//     button.addEventListener("click", () => {
//       // Запрос к бэкенду
//       fetch("http://localhost:3000/api/products/all")
//         .then((response) => response.json())
//         .then((data) => {
//           // Ставим точку останова для дебага
//           debugger;
//           console.log(data); // Можно посмотреть данные в консоли
//         });
//     });

//     li.appendChild(button);
//   });
// }

function getUserId() {
  let userId = localStorage.getItem("wishlist_user_id");
  if (!userId) {
    // Генерируем случайный идентификатор
    userId = crypto.randomUUID();
    localStorage.setItem("wishlist_user_id", userId);
  }
  return userId;
}

// check user GUID деген запрос жібересіз бэкендке ылғи парақшаны ашқанда
// егер базада жоқ болса, саламыз, болса, жауап 200

const userId = getUserId();


// Находим контейнер с товарами
const catalog = document.querySelector("#catalog-grid");

if (catalog) {
  const items = catalog.querySelectorAll("li");

  items.forEach((li) => {
    const title = li.querySelector(".product-title")?.innerText || li.querySelector("h2")?.innerText;
    const url = li.querySelector("a")?.href;
    const image_url = li.querySelector("img")?.src;
    const price = li.querySelector(".product-price")?.innerText || "";

    if (!url) return;

    const button = document.createElement("button");
    button.textContent = " Вишлист";

    // Красивый стиль
    button.style.margin = "10px";
    button.style.padding = "8px 12px";
    button.style.backgroundColor = "#e83e8c";
    button.style.color = "white";
    button.style.border = "none";
    button.style.borderRadius = "6px";
    button.style.cursor = "pointer";
    button.style.fontWeight = "bold";
    button.style.transition = "all 0.2s";
    button.onmouseover = () => button.style.backgroundColor = "#c2185b";
    button.onmouseout = () => button.style.backgroundColor = "#e83e8c";

    button.addEventListener("click", async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            {
              name: "1PUMA Speedcat OG 'Black / Mauve Mist' Sneakers",
              price: 112,
              currency: "USD",
              url: "https://www.farfetch.com/kz/shopping/women/b-sides--item-19969826.aspx?storeid=9902",
              image_url: "https://cdn-images.farfetch-contents.com/15/23/45/67/15234567_34567890_1000.jpg",
              description: "Женские кроссовки PUMA Speedcat OG в черном цвете с Mauve Mist, стильные и комфортные для повседневной носки"
            }
          )
        });
        const data = await response.json();
        if (response.ok) {
          button.textContent = "✅ Добавлено";
          button.disabled = true;
        } else {
          alert(data.message || "Ошибка при добавлении");
        }
      } catch (err) {
        console.error(err);
        alert("Ошибка сети");
      }
    });

    li.appendChild(button);
  });
}
