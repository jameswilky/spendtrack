document.addEventListener('DOMContentLoaded', function () {
  // Init Date  picker
  var elems = document.querySelectorAll('.datepicker');
  var instances = M.Datepicker.init(elems, {});

  // Init Collapser
  var elems = document.querySelectorAll('.collapsible');
  var instances = M.Collapsible.init(elems, {});

  //Init Category dropdown menu
  var elems = document.querySelectorAll('.dropdown-trigger');
  var instances = M.Dropdown.init(elems, {});

  //Init Add Category modal
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems, {});

});
