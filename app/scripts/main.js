/**
 * Main app object
 */
var app = {};

/**
 * Iteration of the progress bar from 0 to 30
 */
app.progressValue = 0;

/**
 * Toggles menu items selected class
 * @param {object} item - menu option list element
 */
app.toggleMenuItems = function (item) {
  $(item).text() === 'All' ? app.selectAll() : app.deselectAll();

  var activeOptions = $('#menu-options li.active');
  if (activeOptions.length === 1 && activeOptions.first().text() === $(item).text()) {
    console.warn('Option "' + $(item).text() + '" cannot be deselected!');
  } else {
    $(item).toggleClass('active');
  }
};

/**
 * Removes active class for all menu options but the first
 */
app.selectAll = function () {
  $('#menu-options li').each(function (i) {
    if (i > 0) { // Element 0 is ALL
      $(this).removeClass('active');
    }
  });
};

/**
 * Removes active class for All menu option
 */
app.deselectAll = function () {
  $('#menu-options li').each(function (i) {
    if (i === 0) { // Element 0 is ALL
      $(this).removeClass('active');
    }
  });
};

/**
 * Restores progress bar initial values
 */
app.resetProgressBar = function () {
  app.progressValue = 0;
  $('.progress-bar').css('width', '0%');
  setTimeout('app.runProgressBar()', 100);
};


/**
 * Starts progress bar 3-second loading
 */
app.runProgressBar = function () {
  if (app.progressValue < 30) {
    app.progressValue +=1;
    $('.progress-bar').css('width', (app.progressValue * 10 / 3) + '%');

    // 3000 ms / 100 ms iteration = 30 iterations
    setTimeout('app.runProgressBar()', 100);
  } else if (app.progressValue >= 30) {
    app.updateContent();
  }
};

/**
 * Updates page content depending of the selected menu items
 */
app.updateContent = function () {
  $('#selected-options').text('');

  $('#menu-options li.active').each(function () {
    var so = $('#selected-options').text();
    so += so === '' ? $(this).text() : ' + ' + $(this).text()
    $('#selected-options').text(so);
  });
};


/**
 * Generates menu items depending of the options list
 * @param {list} options - list of menu options
 */
app.createMenuOptions = function (options) {
  var option;

  $('#menu-options').append('<li class="col-sm-3 active"><a>All</a></li>');

  for (option in options) {
    $('#menu-options').append('<li class="col-sm-3"><a>' + options[option] + '</a></li>');
  }

  // Handles click event for menu items
  $('#menu-options li').click(function (i) {
    app.toggleMenuItems(this);
    app.resetProgressBar();
  });

  app.updateContent();
};


/**
 * Reads URL hash value and parses it to generate the list of menu options
 */
app.parseURLHash = function () {
  var hash = window.location.hash,
    options = ['Opt1', 'Opt2', 'Opt3'];

  if (hash !== '') {
    options = hash.substring(1).split('|');

    if (options.length < 3) {
      console.error('A minimum of 3 menu options are required. Reseting menu options to default values Opt1|Opt2|Opt3');
      options = ['Opt1', 'Opt2', 'Opt3'];
    }
  }

  app.createMenuOptions(options);
};

app.parseURLHash();
