// A $( document ).ready() block.
$(document).ready(function () {
  console.log('ready!');

  const deleteBook = (id) => {
    $.ajax({
      url: 'api/v1/book/',
      data: {
        id: id,
      },
      type: 'DELETE',
      dataType: 'json',
      success: function (data) {
        console.log('data', data);
      },
      error: function (error) {
        console.log('error', error);
      },
    });
  };

  $('#test').click(function () {
    $.ajax({
      type: 'POST',
      url: 'api/v1/book/search',
      data: {
        arr: ['123', '123', '123', 'abc'],
      },
      dataType: 'json',
      success: function (data) {
        console.log('data', data);
      },
      error: function (error) {
        console.log('error', error);
      },
    });
  });

  $('#create').click(function () {
    $.ajax({
      url: 'api/v1/book/',
      data: {
        name: 'akıllarda kalanlar',
        author: 'heyhey',
        date: '18-06-1992',
      },
      type: 'POST',
      dataType: 'json',
      success: function (data) {
        console.log('data', data);
      },
      error: function (error) {
        console.log('error', error);
      },
    });
  });

  $('#get').click(function () {});

  $('#authorCreate').click(function () {
    $.ajax({
      url: 'api/v1/author',
      data: {
        name: $('#author').val(),
      },
      type: 'POST',
      dataType: 'json',
      success: function (data) {
        console.log('data', data);
      },
      error: function (error) {
        console.log('error', error);
      },
    });
  });

  $.ajax({
    url: 'api/v1/book/search',
    data: {
      //id: '60abd838c22491e34391da43',
    },
    type: 'POST',
    dataType: 'json',
    success: function (data) {
      console.log('data', data);

      let s = '';
      data.forEach((el) => {
        s += '<tr>';
        s += '<td>' + el.name + '</td>';
        s += '<td>' + el.author + '</td>';
        s += '<td>' + el.publishDate + '</td>';
        s += '<td><button type="button" class="btn btn-danger" onclick=deleteBook("' + el._id + '")>Del</button></td>';
        //s += '<td>' + el.publishDate + '</td>';
        s += '</tr>';
      });

      $('#tableBody').html(s);
    },
    error: function (error) {
      console.log('error', error);
    },
  });
});
