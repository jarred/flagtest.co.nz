var FlagTest = window.FlagTest || (window.FlagTest = {});
var $                   = require('jquery');
global.jQuery           = $;
window.$                = $;
var _                   = require('underscore');
var Backbone            = require('backbone');
Backbone.$ = $;
//
// var Flag3D = require('./flag3d.js');
// var FlagPhysics = require('./vendor/flag-physics.js');
// var THREE = require('./vendor/three50dev2.js');
// var attachFastClick     = require('fastclick');
// attachFastClick(document.body);

var API                 = require('./api.js');

var Models = {}

var Views = {
  Intro:                require('./views/intro.js'),
  Flag:                 require('./views/flag.js'),
  Upload:               require('./views/upload.js')
};

var AppModel = new Backbone.Model();

FlagTest.Main = {
  init: function(){
    _.bindAll(this, 'newFlag', 'newFlagFromUpload');
    AppModel.on('new-flag', this.newFlag);
    AppModel.on('new-flag-from-upload', this.newFlagFromUpload);
    this.extendViews();
  },
  extendViews: function (){
    _.each($('.js-view'), function(el){
      var $el = $(el);
      var view = Views[($el.data('view'))];
      var v = new view({
        el: el,
        appModel: AppModel
      });
      $el.removeClass('js-view');
    });
  },
  newFlag: function(){
    API.getFlag('', function(data){
      data.fromUpload = false;
      var flagModel = new Backbone.Model(data);
      var flag = new Views.Flag({
        model: flagModel
      });
      $('.js-skyline').html(flag.el);
    })
  },
  newFlagFromUpload: function(uploadEvent){
    var flagModel = new Backbone.Model({
      uploadEvent: uploadEvent,
      fromUpload: true
    });
    var flag = new Views.Flag({
      model: flagModel
    });
    $('.js-skyline').html(flag.el);
  }
};
FlagTest.Main.init();
