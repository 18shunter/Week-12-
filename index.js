$(document).ready(function() {
  // Retrieve parts from the server and display them
  function getParts() {
    $.ajax({
      url: 'http://localhost:3000/parts',
      type: 'GET',
      dataType: 'json',
      success: function(parts) {
        displayParts(parts);
      },
      error: function() {
        console.log('Error: Failed to retrieve parts from the server.');
      }
    });
  }

  // Add a part
  $('#partForm').submit(function(e) {
    e.preventDefault();

    var partName = $('#partName').val();
    var partDescription = $('#partDescription').val();
    var partPriceDollars = $('#partPriceDollars').val();
    var partPriceCents = $('#partPriceCents').val();
    var partPrice = parseFloat(partPriceDollars + '.' + partPriceCents).toFixed(2);

    var part = {
      name: partName,
      description: partDescription,
      price: partPrice
    };

    $.ajax({
      url: 'http://localhost:3000/parts',
      type: 'POST',
      data: part,
      success: function() {
        getParts();
        $('#partForm')[0].reset();
      },
      error: function() {
        console.log('Error: Failed to add the part.');
      }
    });
  });

  // Display parts on the page
  function displayParts(parts) {
    var partList = $('#partList');
    partList.empty();

    for (var i = 0; i < parts.length; i++) {
      var part = parts[i];

      var partHTML = '<div class="part" data-id="' + part.id + '">' +
        '<h4>' + part.name + '</h4>' +
        '<p>Description: ' + part.description + '</p>' +
        '<p>Price: $' + part.price + '</p>' +
        '<div class="part-actions">' +
        '<button class="edit-part btn btn-primary">Edit</button> ' +
        '<button class="delete-part btn btn-danger">Delete</button>' +
        '</div>' +
        '</div>';

      partList.append(partHTML);
    }
  }

  // Delete a part
  $(document).on('click', '.delete-part', function() {
    var part = $(this).closest('.part');
    var partId = part.attr('data-id');

    $.ajax({
      url: 'http://localhost:3000/parts/' + partId,
      type: 'DELETE',
      success: function() {
        part.remove();
      },
      error: function() {
        console.log('Error: Failed to delete the part.');
      }
    });
  });

  // Fetch parts when the page loads
  getParts();
});
