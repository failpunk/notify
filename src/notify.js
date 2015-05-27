/**
 * Dirt Simple Notifications
 * -------------------------
 *
 * Examples:
 *
 *    Notifier.success('Great Success!');
 *
 *    Notifier.error('Epic Failure!', Notifier.locations.topMiddle);
 *
 *    Notify.msg({
 *      type: 'success',
 *      title: "Attention",
 *      message: "Here is your message.",
 *      location: Notifier.locations.topRight,
 *    })
 *
 *    Notifier.msg({
 *      message: 'I will fade out after two seconds',
 *      timeout: 2000
 *    });
 */

Notifier = (function () {
  'use strict';

  var $body = $('body'),
    defaultMsg = 'Wow...A Notify Notification!',
    locations = Object.create(null);          // create a nice blank object

  // message display locations
  locations.topRight = 'top-right';
  locations.topleft = 'top-left';
  locations.topMiddle = 'top-middle';

  init();

  return {
    init: init,
    success: success,
    error: error,
    msg: notification,
    locations: locations
  };

  /////////////////

  function init() {
    listenForMessages();
  }

  function listenForMessages() {
    $('html').on('notify:msg', displayNotification);
  }

  function displayNotification(event, data) {
    var $notification = createNotification(data),
        $container = getContainer(data);

    $notification
      .hide()
      .appendTo($container)
      .fadeIn();

    // if timeout is set, fade out
    if (data.timeout) {
      $notification
        .delay(data.timeout)
        .fadeOut();
    }
  }

  function getContainer(data) {
    var $container = $('#notify-box');

    data.location = data.location || locations.topRight;

    // return container if already created
    if ($container.length > 0) {
      return $container.removeClass().addClass(data.location);
    }

    // create new container
    $container = $('<div id="notify-box">');
    $container.addClass(data.location);
    $container.appendTo($body);

    return $container;
  }

  function createNotification(data) {
    var $notification,
        $title,
        $message,
        $close;

    $notification = $('<div>').addClass('notify').addClass(data.type || 'success');

    if(data.title) {
      $title = $('<h2>').addClass('notify-title');
      $notification.append($title);
    }

    $message = $('<p></p>').addClass('notify-message').text(data.message || defaultMsg);
    $notification.append($message);

    if (!data.timeout) {
      $close = $('<a><span>×</span></a>').addClass('notify-close');
      $close.click(function () {
        $notification.remove();
      });
      $notification.append($close);
    }

    return $notification;
  }

  function success(msg, location) {
    notification({
      type: 'success',
      message: msg,
      location: location
    });
  }

  function error(msg, location) {
    notification({
      type: 'error',
      message: msg,
      location: location
    });
  }

  function notification(options) {
    $body.trigger('notify:msg', options);
  }

})();