let items = [];

var modalCount = 0;
var total_bill = 0;
var cart_count = 0;

function updateCartCount() {
  $('#cart-count').attr('data-count', cart_count);
}

$('#cart-count').attr('data-count', cart_count);

// $('#total-bill').text('$' + total_bill);
checkItemsInCart();

if (window.localStorage.getItem('row')) {
  items = JSON.parse(window.localStorage.getItem('row'));
}

if (items.length != 0) {
  items.forEach(e => {
    let temp = $('<div class="col-md-6 col-xl-4">\
      <a data-target="#modal-' + modalCount + '" data-toggle="modal">\
        <img class=" pb-4" src=' + e.url + ' alt="" />\
      </a >\
      <div class="overlay">\
        <div class="row">\
          <div class="col-9">\
            <p class="lead ml-2 mb-0">' + e.name + '</p>\
            <p class="ml-2">$' + e.price + '</p>\
          </div>\
          <div class="col-3">\
            <button id="add-to-cart-from-view-' + modalCount + '" type="button" class="mt-2 btn btn-outline-success add-to-cart-from-view"><i class="mr-auto fas fa-cart-plus fa-lg "></i></button>\
          </div>\
        </div>\
      </div>\
    </div>');
    $('#list').append(temp);

    let temp2 = $('<div class="modal" id="modal-' + modalCount + '">\
      <div class= "modal-dialog view-modal-dialog">\
      <div class="modal-content view-modal-content">\
        <div class="modal-header">\
          <div class="row">\
            <h5 class="modal-title ml-3 pr-4">' + e.name + '</h5>\
          </div>\
          <div class="row">\
            <p class="modal-title muted pl-4">In Stock</p>\
          </div>\
          <button class="close" data-dismiss="modal">&times;</button>\
        </div>\
        <div class="modal-body">\
          <div class="row">\
            <div class="col-5">\
              <img class="modal-img img-fluid" src=' + e.url + ' alt="">\
                </div>\
              <div class="col-7">\
                <div class="col">\
                  <p class="modal-description lead">' + e.description + '</p>\
                </div>\
                <div class="col">\
                  <button class="btn btn-outline-success px-4" type="button">' + e.price + '</button>\
                </div>\
                <div class="col">\
                  <button id="add-to-cart-from-modal-view-' + modalCount + '" class="mt-3 btn btn-outline-success add-to-cart-from-modal-view" type="button">\
                    <i class="mr-auto fas fa-cart-plus fa-2x"></i>\
                  </button>\
                </div>\
              </div>\
            </div>\
          </div>\
          <div class="modal-footer">\
            <button class="btn btn-secondary" data-dismiss="modal">Close</button>\
          </div>\
        </div>\
      </div>\
      </div >');

    $('#modal-list').append(temp2);
    modalCount++;
  });
}

if (window.localStorage.getItem('count')) {
  modalCount = JSON.parse(window.localStorage.getItem('count'));
}

$(document).on('click', '.remove', function() {
  // console.log($(this));
  var btn_number = $(this).attr('id');
  btn_number = btn_number[btn_number.length - 1];
  // console.log(btn_number);
  $('#add-to-cart-from-modal-view-' + btn_number).attr('disabled', false);
  $('#add-to-cart-from-view-' + btn_number).attr('disabled', false);

  var x = $(this)
    .parent()
    .parent()
    .next('.spacer')
    .remove();
  // console.log(x);
  $(this)
    .parent()
    .parent()
    .remove();

  updateTotalBill();
  checkItemsInCart();
  cart_count--;
  updateCartCount();
});

$('.add-to-cart-from-view').click(function() {
  // console.log('clicked from view');

  $(this).attr('disabled', true);
  var parent_of_title = $(this)
    .parent()
    .siblings('.col-9');

  // var title = parent_of_title.children('.lead').text();
  var str = parent_of_title.children('.ml-2').text();
  str = str.split('$');
  // console.log(parent_of_title);
  title = str[0];
  price = parseFloat(str[1]);

  var img_src = $(this)
    .parent()
    .parent()
    .parent()
    .siblings('a')
    .children('img')
    .attr('src');

  // console.log(img_src);
  // console.log(title);
  // console.log(price);

  var btn_number = $(this).attr('id');
  btn_number = btn_number[btn_number.length - 1];

  let temp = $('<div class="row">\
      <div id="cart-item-image" class="col-5">\
        <img class="cart-item-image " src=' + img_src + ' alt="" />\
      </div>\
      <div id="cart-item-description" class="col-7">\
        <h4>' + title + '</h4>\
        <p class="text-muted mb-1 cart-item-price d-inline" >$' + price + '</p>\
        <p class="text-muted mb-1 ml-3 total-cart-item-price d-inline p-1" >Total: $' + price + '</p>\
        <form class="mt-3 form-inline quantity-form">\
          <label for="cart-quantity" class="quantity-label">Quantity: </label>\
          <input type="number" class="cart-quantity ml-2 form-control quantity" value="1" min="1" />\
        </form>\
        <button id="btn-remove-' + btn_number + '" type="button" class="remove btn btn-outline-danger btn-sm ml-0 quantity align-content-endcenter pb-4">X Remove</button>\
      </div>\
    </div>\
    <div class="spacer"><hr /></div>');

  $('#cart-item').append(temp);

  $('#add-to-cart-from-modal-view-' + btn_number).attr('disabled', true);

  // $('#add-to-cart-from-modal-view-' + 0).attr('disabled', true);
  // console.log(btn_number);
  total_bill += price;
  $('#total-bill').text('$' + total_bill);

  updateTotalBill();
  checkItemsInCart();
  cart_count++;
  updateCartCount();
});

$('.add-to-cart-from-modal-view').click(function() {
  // console.log('clicked from modal');

  $(this).attr('disabled', true);
  var price = $(this)
    .parent()
    .parent()
    .children('.col')
    .children('button', 0)
    .text();

  price = parseFloat(price);

  // console.log(price);
  var img_src = $(this)
    .parent()
    .parent()
    .parent()
    .parent()
    .children('.row', 0)
    .children('.col-5', 0)
    .children('img')
    .attr('src');
  // console.log(img_src);
  var title = $(this)
    .parent()
    .parent()
    .parent()
    .parent()
    .parent()
    .children('.modal-header', 0)
    .children('.row', 0)
    .children('h5', 0)
    .text();

  // console.log(title);

  var btn_number = $(this).attr('id');
  btn_number = btn_number[btn_number.length - 1];

  let temp = $('<div class="row">\
      <div id="cart-item-image" class="col-5">\
        <img class="cart-item-image " src=' + img_src + ' alt="" />\
      </div>\
      <div id="cart-item-description" class="col-7">\
        <h4>' + title + '</h4>\
        <p class="text-muted mb-1 cart-item-price d-inline" >$' + price + '</p>\
        <p class="text-muted mb-1 ml-3 total-cart-item-price d-inline p-1" >Total: $' + price + '</p>\
        <form class="mt-3 form-inline quantity-form">\
          <label for="cart-quantity" class="quantity-label">Quantity: </label>\
          <input type="number" class="cart-quantity ml-2 form-control quantity" value="1" min="1" />\
        </form>\
        <button id="btn-remove-' + btn_number + '" type="button" class="remove btn btn-outline-danger btn-sm ml-0 quantity align-content-endcenter pb-4">X Remove</button>\
      </div>\
    </div>\
    <div class="spacer"><hr /></div>');

  $('#cart-item').append(temp);

  $('#add-to-cart-from-view-' + btn_number).attr('disabled', true);

  total_bill += price;
  $('#total-bill').text('$' + total_bill);

  updateTotalBill();
  checkItemsInCart();
  cart_count++;
  updateCartCount();
});

$(document).on('input', '.cart-quantity', function() {
  var item_count = $(this).val();

  var item_price = parseFloat(
    $(this)
      .parent()
      .parent()
      .children('p', 0)
      .text()
      .substr(1)
  );

  var total_item_price = parseFloat(item_count) * item_price;
  $(this)
    .parent()
    .parent()
    .children('p')
    .eq(1)
    .text('Total: $' + total_item_price);
  // console.log(item_count);
  // console.log(total_item_price);
  // console.log(item_price);

  // total_bill += total_item_price;
  // $('#total-bill').text('$' + total_bill);
  // total_bill = 0;
  updateTotalBill();
  checkItemsInCart();
});

$('#add').click(e => {
  var name = $('#name').val();
  var description = $('#description').val();
  var url = $('#url').val();
  var quantity = $('#quantity').val();
  var price = $('#price').val();
  if (name && description && url && quantity && price) {
    // let item = $('<li>').text(title + ' - ' + author);
    // $('#list').append(item);
    // let temp = $('<div>', { class: 'col-md-6 col-xl-4' }).append();

    let temp = $('<div class="col-md-6 col-xl-4">\
      <a data-target="#modal-' + modalCount + '" data-toggle="modal">\
        <img class=" pb-4" src=' + url + ' alt="" />\
      </a >\
      <div class="overlay">\
        <div class="row">\
          <div class="col-9">\
            <p class="lead ml-2 mb-0">' + name + '</p>\
            <p class="ml-2">$' + price + '</p>\
          </div>\
          <div class="col-3">\
            <button id="add-to-cart-from-view-' + modalCount + '" type="button" class="mt-2 btn btn-outline-success add-to-cart-from-view"><i class="mr-auto fas fa-cart-plus fa-lg "></i></button>\
          </div>\
        </div>\
      </div>\
    </div>');

    $('#list').append(temp);

    items.push({ name: name, description: description, url: url, quantity: quantity, price: price });
    window.localStorage.setItem('row', JSON.stringify(items));

    $('#form')[0].reset();

    let temp2 = $('<div class="modal" id="modal-' + modalCount + '">\
      <div class= "modal-dialog view-modal-dialog">\
      <div class="modal-content view-modal-content">\
        <div class="modal-header">\
          <div class="row">\
            <h5 class="modal-title ml-3 pr-4">' + name + '</h5>\
          </div>\
          <div class="row">\
            <p class="modal-title muted pl-4">In Stock</p>\
          </div>\
          <button class="close" data-dismiss="modal">&times;</button>\
        </div>\
        <div class="modal-body">\
          <div class="row">\
            <div class="col-5">\
              <img class="modal-img img-fluid" src=' + url + ' alt="">\
                </div>\
              <div class="col-7">\
                <div class="col">\
                  <p class="modal-description lead">' + description + '</p>\
                </div>\
                <div class="col">\
                  <button class="btn btn-outline-success px-4" type="button">' + price + '</button>\
                </div>\
                <div class="col">\
                  <button id="add-to-cart-from-modal-view-' + modalCount + '" class="mt-3 btn btn-outline-success add-to-cart-from-modal-view" type="button">\
                    <i class="mr-auto fas fa-cart-plus fa-2x"></i>\
                  </button>\
                </div>\
              </div>\
            </div>\
          </div>\
          <div class="modal-footer">\
            <button class="btn btn-secondary" data-dismiss="modal">Close</button>\
          </div>\
        </div>\
      </div>\
      </div >');

    $('#modal-list').append(temp2);

    modalCount++;
    window.localStorage.setItem('count', JSON.stringify(modalCount));
  } else {
    alert('Fields Empty!!');
    console.log('Fields Empty!!');
  }
});

function updateTotalBill() {
  var cart_item = $('#cart-item').children('.row');
  var total = 0;
  // console.log(cart_item.length);
  for (var i = 1; i < cart_item.length; i++) {
    var item = cart_item.eq(i);
    var price = item
      .children('#cart-item-description')
      .children('p')
      .eq(0)
      .text();

    price = parseFloat(price.replace('$', ' '));
    // console.log(price);
    var quantity = item
      .children('#cart-item-description')
      .children('form')
      .eq(0)
      .children('input')
      .eq(0)
      .val();
    // console.log(quantity);
    total += price * quantity;
  }
  $('#total-bill').text('$' + total);
}

function checkItemsInCart() {
  var bill = $('#total-bill').text();

  if (bill !== '$0') {
    $('#cart-empty').hide();
  } else {
    $('#cart-empty').show();
  }
}
