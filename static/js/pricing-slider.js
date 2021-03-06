$('#pricing-slider').slider({
  tooltip: 'always',
  formatter: function(value) {
    if (value >= 1000) {
      return '1 Billion+ checks/mo';
    }
    return value + ' Million checks/mo';
  }
});

function updateEndpointsText() {
  $('#endpoints span').text(
    $('#endpoints-dropdown input[type=checkbox]:checked')
      .map(function() {
        return $(this.parentNode).text().trim();
      })
      .get()
      .join(', ')
      .replace(/, ([^,]+)$/, ' & $1')
      .replace(/(, .+) &/, '$1, &') || 'Select'
  );
}

function updateSecondsText() {
  $('#seconds span').text($(this).text());
}

function calculateChecks() {
  var endpointCount = parseInt($('#endpointCount').val());
  var endpoints = $('#endpoints-dropdown input[type=checkbox]:checked').length;
  var locationCount = parseInt($('#locationCount').val());
  var seconds = parseInt($('#seconds span').text());
  var totalChecks = endpointCount * endpoints * locationCount * 30.5 * 24 * (3600 / seconds);

  console.log([endpointCount, endpoints, locationCount, seconds, totalChecks]);

  $('#pricing-slider').slider('setValue', totalChecks / 1000000);
  updatePrice();
}

function updatePrice() {
  var millionChecks = $('#pricing-slider').slider('getValue');

  var monthlyCost = 0;

  if (millionChecks >= 1000) {
    $('#monthlyCost').html('<div class="please-call"><a href="mailto:hello@raintank.io">Contact us</a></div>');
    return;
  }

  if (millionChecks > 200) {
    monthlyCost += (millionChecks - 200) * 5;
    millionChecks = 200;
  }

  if (millionChecks > 5) {
    monthlyCost += (millionChecks - 3) * 7;
  }

  if (millionChecks <= 5) {
    $('#monthlyCost').html('<div class="checks-slider-emc">$<span>20</span><small> / month <em>minimum</em></small></div>');
    return;
  }

  $('#monthlyCost').html('<div class="checks-slider-emc">$<span>' + monthlyCost.toString().replace(/([0-9]+)([0-9]{3})$/, '$1,$2') + '</span><small> / month</small></div>');
}

$(function() {
  updateEndpointsText();
  updatePrice();
  $('#endpoints-dropdown').on('change', 'input[type=checkbox]', updateEndpointsText);
  $('#seconds-dropdown').on('click', '.dropdown-menu button', updateSecondsText);
  $('#calculate').click(calculateChecks);
  $('#pricing-slider').on('change', updatePrice);
});
