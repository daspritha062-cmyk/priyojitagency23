const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Product category filter
const tabButtons = document.querySelectorAll(".tab-btn");
const productCards = document.querySelectorAll(".product-card");

tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    tabButtons.forEach(tab => {
      tab.classList.remove("active");
      tab.setAttribute("aria-selected", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-selected", "true");

    productCards.forEach(card => {
      const show = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hide", !show);
    });
  });
});

// Product links preselect the matching enquiry option
document.querySelectorAll("[data-product]").forEach(link => {
  link.addEventListener("click", () => {
    const select = document.getElementById("productInterest");
    const product = link.dataset.product;
    const option = [...select.options].find(item => item.text.toLowerCase().includes(product.toLowerCase()));
    if (option) select.value = option.value || option.text;
  });
});

// Enquiry form opens WhatsApp with a prepared message.
// No form data is stored by this static website.
const WHATSAPP_NUMBER = "918609780403";
document.getElementById("enquiryForm").addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const customerType = document.getElementById("customerType").value;
  const product = document.getElementById("productInterest").value;
  const message = document.getElementById("message").value.trim();

  const text = [
    "Hello Priyojit Agency,",
    "",
    "I would like to make a product enquiry.",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Business type: ${customerType}`,
    `Interested product: ${product}`,
    message ? `Message: ${message}` : ""
  ].filter(Boolean).join("\n");

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
});

document.getElementById("year").textContent = new Date().getFullYear();
