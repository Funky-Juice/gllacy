'use strict';

function sendFormToAlert(form) {
  var method = form.method.toUpperCase();
  var url = form.action;
  var options = { method: method };

  if (method === 'GET') {
    var params = new URLSearchParams(new FormData(form));
    url += (url.indexOf('?') === -1 ? '?' : '&') + params.toString();
  } else {
    options.body = new FormData(form);
  }

  fetch(url, options)
    .then(function(response) {
      return response.text();
    })
    .then(function(text) {
      alert(text);
    });
}

(function() {
  var link = document.querySelector('.contacts-info-button');
  var popup = document.querySelector('.feedback-form');
  var overlay = document.querySelector('.feedback-form-overlay');

  if (!link || !popup || !overlay) {
    return;
  }

  var close = popup.querySelector('.feedback-form-close');
  var form = popup.querySelector('form');
  var username = popup.querySelector('[name=username]');
  var email = popup.querySelector('[name=email]');
  var comment = popup.querySelector('[name=comment]');
  var storage_user = localStorage.getItem('username');
  var storage_email = localStorage.getItem('email');

  link.addEventListener('click', function(evt){
    evt.preventDefault();
    popup.classList.add('feedback-form-show');
    overlay.classList.add('feedback-form-overlay-show');

    if(storage_user && storage_email) {
      username.value = storage_user;
      email.value = storage_email;
      comment.focus();
      } else {
        username.focus();
      }
  });

  close.addEventListener('click', function(evt){
    evt.preventDefault();
    popup.classList.remove('feedback-form-show');
    popup.classList.remove('feedback-form-error');
    overlay.classList.remove('feedback-form-overlay-show');
  });

  form.addEventListener('submit', function(evt){
    if (!username.value || !email.value || !comment.value) {
        evt.preventDefault();
        popup.classList.remove('feedback-form-error');
        popup.offsetWidth;
        popup.classList.add('feedback-form-error');
    } else {
      evt.preventDefault();
      localStorage.setItem('username', username.value);
      localStorage.setItem('email', email.value);
      sendFormToAlert(form);
    }
  });

  window.addEventListener('keydown', function(evt) {
    if (evt.keyCode === 27) {
      if (popup.classList.contains('feedback-form-show')) {
          popup.classList.remove('feedback-form-show');
          popup.classList.remove('feedback-form-error');
          overlay.classList.remove('feedback-form-overlay-show');
        }
    }
  });

  overlay.addEventListener('click', function() {
    if (popup.classList.contains('feedback-form-show')) {
        popup.classList.remove('feedback-form-show');
        popup.classList.remove('feedback-form-error');
        overlay.classList.remove('feedback-form-overlay-show');
    }
  });
}());

(function() {
  var forms = [
    document.querySelector('.header-search form'),
    document.querySelector('.login-field form'),
    document.querySelector('.subscribe-form form'),
    document.querySelector('.filter-form')
  ];

  forms.forEach(function(form) {
    if (!form) {
      return;
    }

    form.addEventListener('submit', function(evt) {
      evt.preventDefault();
      sendFormToAlert(form);
    });
  });
}());