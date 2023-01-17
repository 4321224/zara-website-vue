// const baseUrl = "http://localhost:3000";
const baseUrl = "https://secret-inlet-82197.herokuapp.com";
console.log("test");
$(document).ready(() => {
  console.log("jalan ------");
  isLogin();
  $("#register-form").on("submit", (event) => {
    event.preventDefault();
    register();
  });
  login();
  $("#nav-dashboard").on("click", (event) => {
    event.preventDefault();
    changePage("#dashboard-section");
  });

  $("#nav-product").on("click", (event) => {
    event.preventDefault();
    // console.log("hai");
    changePage("#product-section");
    product();
  });

  $("#nav-category").on("click", (event) => {
    event.preventDefault();
    changePage("#category-section");
    categories();
  });

  $("#new-product").on("click", (event) => {
    event.preventDefault();
    changePage("#new-product-section");
    product();
  });

  $("#product-form").on("submit", (event) => {
    event.preventDefault();
    newproduct();
  });

  $("#new-category").on("click", (event) => {
    event.preventDefault();
    changePage("#new-category-section");
  });

  $("#category-form").on("submit", (event) => {
    event.preventDefault();
    newCategory();
  });

  $("#cancel-product").on("click", (event) => {
    event.preventDefault();
    product();
  });

  $("#cancel-category").on("click", (event) => {
    event.preventDefault();
    categories();
  });

  $("#nav-logout").on("click", (event) => {
    event.preventDefault();
    localStorage.clear();
    $("#login-section").show();
    $("#home-section").hide();
  });
});

function isLogin() {
  console.log("isLogin jalan");
  if (localStorage.getItem("access_token")) {
    changePage("#home-section");
    dashboard();
    $("#nav-username").empty();
    $("#nav-username").text(`${localStorage.username}`);

    // $("#nav-username").append(`${localStorage.getItem("username")}`);
  } else {
    $("#login-section").show();
    $("#home-section").hide();
  }
}

function register() {
  let object = {
    username: $("#register-username").val(),
    email: $("#register-email").val(),
    password: $("#register-password").val(),
    phoneNumber: $("#register-phone").val(),
    address: $("#register-address").val(),
  };
  // console.log(baseUrl, "<<<<");
  $.ajax({
    url: `${baseUrl}/register`,
    method: "POST",
    data: object,
  })
    .done((res) => {
      // console.log(res, "ini register");
      isLogin();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Success created account",
        showConfirmButton: false,
        timer: 1500,
      });
      $("#register-username").val("");
      $("#register-email").val("");
      $("#register-password").val("");
      $("#register-phone").val("");
      $("#register-address").val("");
    })
    .fail((error) => {
      // console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.responseJSON.error.message}`,
        footer: '<a href="">Why do I have this issue?</a>',
      });
    });
}

function login() {
  $("#login-form").on("submit", (event) => {
    event.preventDefault();
    console.log("test");
    $.ajax({
      url: `${baseUrl}/login`,
      method: "POST",
      data: {
        email: $("#login-email").val(),
        password: $("#login-password").val(),
      },
    })
      .done((res) => {
        // console.log(res, "ini login");
        $("#login-email").val();
        $("#login-password").val();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Success login",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(res, "<<< ni res");
        localStorage.setItem("access_token", res.access_token);
        localStorage.setItem("username", res.username);
        $("#nav-username").text(`${localStorage.username}`);

        $("#sidebar-menu").show();
        $("#home-section").show();
        $("#dashboard-section").show();
        $("#login-section").hide();
        $("#product-section").hide();
        $("#new-product-section").hide();
        $("#category-section").hide();
        $("#new-category-section").hide();
      })
      .fail((error) => {
        console.log(error, "<<<< ini error login");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.responseJSON.error.message}`,
          footer: '<a href="">Why do I have this issue?</a>',
        });
      });
  });
}

window.onload = function () {
  google.accounts.id.initialize({
    client_id:
      "905910788791-uv56a008snkjr087jm7ml62ii5ljck2i.apps.googleusercontent.com",
    callback: handleCredentialResponse,
  });
  google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
    theme: "outline",
    size: "large",
  });
  google.accounts.id.prompt();
};
function handleCredentialResponse(response) {
  // console.log("Encoded JWT ID token: " + response.credential);
  $.ajax(`${baseUrl}/login-google`, {
    method: "POST",
    headers: {
      google_token: response.credential,
    },
  })

    .done((res) => {
      console.log(res, "ini dari google");
      // console.log(res.username, "<< res.username");
      changePage("#dashboard-section");
      console.log("google login jalan");
      localStorage.setItem("access_token", res.access_token);
      // $("#nav-username").text(`${localStorage.username}`);
      localStorage.setItem("username", res.username);
      localStorage.setItem("role", res.role);
      $("#sidebar-menu").show();
      $("#home-section").show();
      $("#dashboard-section").show();
      $("#login-section").hide();
      $("#product-section").hide();
      $("#new-product-section").hide();
      $("#category-section").hide();
      $("#new-category-section").hide();
      product();
      dashboard();
    })
    .fail((error) => {
      console.log(error, "<< error google login");
      // console.log(error.responseJSON);
    });
}

const changePage = (showPage) => {
  $("#login-section").hide();
  $("#product-section").hide();
  $("#new-product-section").hide();
  $("#category-section").hide();
  $("#new-category-section").hide();
  $("#dashboard-section").hide();
  console.log(showPage, "<< show");
  $(showPage).show();
  if (showPage === "#login-section") {
    $("#sidebar-menu").hide();
  } else $("#sidebar-menu").show();
};

function dashboard() {
  // console.log("dashboard jalan");
  let data = {};
  $.ajax({
    url: `${baseUrl}/products`,
    method: "GET",
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  })
    .done((res) => {
      // console.log(res);
      data.product = res;
      // console.log(data, "<<<<");
      $.ajax({
        url: `${baseUrl}/categories`,
        method: "GET",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .done((res) => {
          data.category = res;
          // console.log(data, "<<<");
          $("#total-product").empty();
          $("#total-category").empty();
          $("#total-product").append(`${data.product.length}`);
          $("#total-category").append(`${data.category.length}`);
          changePage("#dashboard-section");
        })
        .fail((err) => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${error.responseJSON.error.message}`,
            footer: '<a href="">Why do I have this issue?</a>',
          });
        });
    })
    .fail((err) => {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.responseJSON.error.message}`,
        footer: '<a href="">Why do I have this issue?</a>',
      });
    });
}

function deleteproduct(event, id) {
  event.preventDefault();
  console.log("hai");
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: `${baseUrl}/products/${id}`,
        method: "DELETE",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .done((res) => {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          product();
        })
        .fail((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${err.responseJSON.error.message}`,
            footer: '<a href="">Why do I have this issue?</a>',
          });
          // console.log(err.responseJSON.message);
        });
    }
  });
}

function product() {
  $.ajax({
    url: `${baseUrl}/products`,
    method: "GET",
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  })
    .done((res) => {
      console.log(res, "data product");
      // console.log(hei());
      $("#table-product").empty();
      $("#total-product").html(`${res.length}`);
      res.forEach((el, index) => {
        // console.log(el);
        let product = `
                      <tr>
                      <td scope="row">${index + 1}</td>
                      <td class="fw-bold">${el.name}</td>
                      <td>
                        <img src="${el.imgUrl}" class="img-fluid" />
                      </td>
                      <td>${el.description}</td>
                      <td>${el.stock}</td>
                      <td class="fw-bold">${formatRupiah(el.price)}</td>
                      <td>${el.User.username}</td>
                      <td>${el.Category.name}</td>
                      <td>
                        <a href="" class="ms-3" onclick="deleteproduct(event, ${
                          el.id
                        })">
                            <span
                            class="icon material-symbols-outlined text-danger"
                            >
                            delete

                            </span>
                        </a>
                        
                      </td>
                    </tr>
    `;
        $("#table-product").append(product);
      });
    })
    .fail((err) => {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${err.responseJSON.error.message}`,
        footer: '<a href="">Why do I have this issue?</a>',
      });
    });
}

function formatRupiah(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);
}

function newproduct() {
  $.ajax({
    url: `${baseUrl}/categories`,
    method: "GET",
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  })
    .done((res) => {
      console.log(res, " ini res category tabel");
      res.forEach((el) => {
        let categoryProduct = `
                     <label for="product-category">Category <span class="text-danger fw-bold">*</span></label>
                  <select id="product-category" class="form-select" required>
                    <option value="" selected disabled>-- Select Category --</option>
                    <option value="${el.categoryId}">${el.name}</option>
    `;
        $("#product-category").append(categoryProduct);
      });
    })
    .fail((err) => {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${err.responseJSON.error.message}`,
        footer: '<a href="">Why do I have this issue?</a>',
      });
    });

  let name = $("#product-name").val();
  let imgUrl = $("#product-image").val();
  let categoryId = $("#product-category").val();
  let description = $("#product-desc").val();
  let stock = $("#product-stock").val();
  let price = $("#product-price").val();

  // console.log(name, categoryId, description, price, imgUrl);

  $.ajax({
    url: `${baseUrl}/products`,
    method: "POST",
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
    data: {
      name,
      imgUrl,
      categoryId,
      description,
      stock,
      price,
    },
  })
    .done((res) => {
      console.log(res, "ini res");
      product();
      $("#product-name").val();
      $("#product-image").val();
      $("#product-category").val("");
      $("#product-desc").val();
      $("#product-stock").val();
      $("#product-price").val();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "success add product, yeay!",
        showConfirmButton: false,
        timer: 700,
      });

      $("#sidebar-menu").show();
      $("#home-section").show();
      $("#dashboard-section").hide();
      $("#login-section").hide();
      $("#product-section").show();
      $("#new-product-section").hide();
      $("#category-section").hide();
      $("#new-category-section").hide();
    })
    .fail((error) => {
      // console.log(error.responseJSON);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.responseJSON.error.message}`,
        footer: '<a href="">Why do I have this issue?</a>',
      });
    });
}

function deletecategory(event, id) {
  event.preventDefault();
  console.log("hai");
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: `${baseUrl}/categories/${id}`,
        method: "DELETE",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .done((res) => {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          categories();
        })
        .fail((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${err.responseJSON.error.message}`,
            footer: '<a href="">Why do I have this issue?</a>',
          });
          // console.log(err.responseJSON.message);
        });
    }
  });
}

function categories() {
  $.ajax({
    url: `${baseUrl}/categories`,
    method: "GET",
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  })
    .done((res) => {
      console.log(res, "ini category");
      $("#table-category").empty();

      $("#total-category").empty();
      $("#total-category").html(`${res.length}`);

      $("#product-category").empty();
      $("#product-category").append(`
        <option value="" selected disabled>-- Select Categories --</option>
        `);

      res.forEach((el, index) => {
        $("#table-category").append(`
        <tr>
          <td scope="row">${index + 1}</td>
          <td class="fw-bold">${el.name}</td>
          <td>
                        <a href="" class="ms-3" onclick="deletecategory(event, ${
                          el.id
                        })">
                            <span
                            class="icon material-symbols-outlined text-danger"
                            >
                            delete

                            </span>
                        </a>
                        
                      </td>
        </tr>
        `);

        $("#product-category").append(`
            <option value="${el.id}">${el.name}</option>
        `);
      });
    })
    .fail((err) => {
      // console.log(err.responseJSON.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${err.responseJSON.error.message}`,
        footer: '<a href="">Why do I have this issue?</a>',
      });
    });
}

function newCategory() {
  let name = $("#category-name").val();
  // console.log(name);
  $.ajax({
    url: `${baseUrl}/categories`,
    method: "POST",
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
    data: {
      name,
    },
  })
    .done((res) => {
      // console.log(res);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Success add category, yeay!",
        showConfirmButton: false,
        timer: 1500,
      });
      categories();
      $("#sidebar-menu").show();
      $("#home-section").show();
      $("#dashboard-section").hide();
      $("#login-section").hide();
      $("#product-section").hide();
      $("#new-product-section").hide();
      $("#category-section").show();
      $("#new-category-section").hide();
    })
    .fail((error) => {
      // console.log(error.responseJSON);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${err.responseJSON.error.message}`,
        footer: '<a href="">Why do I have this issue?</a>',
      });
    });
}
