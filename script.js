// إظهار الأقسام
function showSection(id) {
  document.querySelectorAll("main section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// تبديل بين تسجيل الدخول والتسجيل
function showAuthForm(type) {
  document.getElementById("loginForm").style.display = (type === "login") ? "block" : "none";
  document.getElementById("registerForm").style.display = (type === "register") ? "block" : "none";
  document.getElementById("loginTab").classList.toggle("active", type === "login");
  document.getElementById("registerTab").classList.toggle("active", type === "register");
}

// تسجيل جديد
function registerUser(e) {
  e.preventDefault();
  let name = document.getElementById("regName").value;
  let email = document.getElementById("regEmail").value;
  let pass = document.getElementById("regPassword").value;

  localStorage.setItem("user", JSON.stringify({name,email,pass}));
  alert("تم التسجيل بنجاح!");
  showAuthForm("login");
}

// تسجيل دخول
function loginUser(e) {
  e.preventDefault();
  let email = document.getElementById("loginEmail").value;
  let pass = document.getElementById("loginPassword").value;

  let user = JSON.parse(localStorage.getItem("user"));
  if (user && user.email === email && user.pass === pass) {
    alert("مرحبًا " + user.name);
    showSection("packages");
  } else {
    alert("بيانات غير صحيحة!");
  }
}

// اختيار باقة
function selectPackage(name, price, currency) {
  localStorage.setItem("package", JSON.stringify({name, price, currency}));
  document.getElementById("selectedPackageDetails").innerText =
    `اخترت: ${name} - ${price} ${currency}`;
  showSection("payment");
}

// تأكيد الدفع
function confirmPayment(e) {
  e.preventDefault();
  let transferDate = document.getElementById("transferDate").value;
  let pkg = JSON.parse(localStorage.getItem("package"));

  localStorage.setItem("subscription", JSON.stringify({...pkg, date: transferDate}));
  alert("تم تأكيد الدفع!");
  showSection("subscription");
  showSubscriptionDetails();
}

// عرض تفاصيل الاشتراك
function showSubscriptionDetails() {
  let sub = JSON.parse(localStorage.getItem("subscription"));
  if (sub) {
    document.getElementById("subscriptionDetails").innerText =
      `الباقة: ${sub.name} - ${sub.price} ${sub.currency} - بتاريخ ${sub.date}`;
  }
}
